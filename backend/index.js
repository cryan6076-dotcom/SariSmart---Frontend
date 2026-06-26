import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT, MONGO_URI, FRONTEND_URL, ALLOWED_ORIGINS } from './src/config.js';
import { registerUser, loginUser, googleCallback } from './controllers/auth.js';
import passport from './src/passport.js';
import { getProducts, createProduct, updateStock, getProductById, updateProduct, getProductHistory } from './controllers/product.js';
import { getTransactions, createTransaction } from './controllers/transaction.js';
import { getDashboardSummary } from './controllers/dashboard.js';
import { getInsights } from './controllers/insights.js';
import serverless from 'serverless-http'; //for serverless deployment
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"; //for using bedrock ai
import Product from "./models/product.js";

const app = express();
const bedrockClient = new BedrockRuntimeClient({ region: "ap-southeast-1" }); //initialized bedrock client

//test for merging, can be removed afterwards

// Middleware
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }));
}

app.use(express.json());
app.use(passport.initialize());

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes — Email/Password Auth
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

// Routes — Products API
app.get('/api/products', getProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);
app.patch('/api/products/:id/stock', updateStock);
app.get('/api/products/:id/history', getProductHistory);

// Routes — Transactions API
app.get('/api/transactions', getTransactions);
app.post('/api/transactions', createTransaction);

// Routes — Dashboard & Insights API
app.get('/api/dashboard', getDashboardSummary);
app.get('/api/insights', getInsights);

// Routes — Google OAuth
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/?error=auth_failed`, session: false }),
  googleCallback
);

app.get('/', (req, res) => {
  res.send('SariSmart Backend API');
});


app.get('/', (req, res) => {
  res.send('SariSmart Backend API');
});

//ai integration
app.post("/api/ai/process", async (req, res) => {
  try {
    const { text, imageBase64 } = req.body;

    const systemPrompt = `
      You are an elite, warm, and friendly AI assistant for a Filipino Sari-Sari store inventory system named SariSmart.
      
      CRITICAL FIRST-LOAD RULE: If the user's input is completely empty, is a general greeting (like "hi", "hello", "halo"), or asks who you are, you MUST respond exactly with this JSON:
      {
        "action": "CHAT",
        "productName": null,
        "quantity": null,
        "aiMessage": "Hello! I'm your SariSmart AI Assistant. I can help you monitor stock levels, calculate metrics, and suggest item markups. Try asking me what items need restocking!"
      }

      Otherwise, analyze the user's input text or image. The user will talk to you in conversational English, Tagalog, or Bisaya/Cebuano (e.g., "Nakahalin ko og tulo ka sabon" or "Bumili sila ng limang mantika").
      
      Determine if they are selling items (reducing inventory), restocking (adding inventory), or just asking a general storefront question.
      Translate local dialect product names to a simple lowercase singular English word (e.g., 'sabon' -> 'soap', 'mantika' -> 'oil', 'itlog' -> 'egg').

      You MUST respond ONLY with a raw JSON object matching this exact schema shape:
      {
        "action": "SELL" or "RESTOCK" or "CHAT" or "UNKNOWN",
        "productName": "string representing the cleaned English name in lowercase, or null",
        "quantity": number or null,
        "aiMessage": "A natural, conversational confirmation phrase written back to the shopkeeper in the matching dialect they used (Tagalog or Bisaya), acknowledging what they did."
      }
      Rule: Do not output any markdown formatting, no "\`\`\`json", and no conversational text outside the JSON structure.
    `;

    const userMessageContent = [];
    if (imageBase64) {
      userMessageContent.push({
        type: "image",
        source: { type: "base64", media_type: "image/jpeg", data: imageBase64 },
      });
    }
    userMessageContent.push({
      type: "text",
      text: text || "Hello", // Default to Hello if empty to trigger the greeting rule
    });

    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessageContent }],
    };

    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-haiku-20240307-v1:0", 
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await bedrockClient.send(command);
    const responseText = new TextDecoder().decode(response.body);
    const bedrockData = JSON.parse(responseText);
    
    const rawOutput = bedrockData.content[0].text.trim();
    const parsedData = JSON.parse(rawOutput);

    // If it's just a general greeting chat, return the friendly message immediately
    if (parsedData.action === "CHAT") {
      return res.json({
        success: true,
        displayMessage: parsedData.aiMessage,
        aiData: parsedData
      });
    }

    if (parsedData.action === "UNKNOWN" || !parsedData.productName) {
      return res.json({ 
        success: false, 
        displayMessage: "Pasensya na, hindi ko sigurado ang transaksyon na iyon. Paki-ulit po.", 
        aiData: parsedData 
      });
    }

    // --- MONGOOSE INTEGRATION & ACCURATE FINANCIAL CALCULATIONS ---
    // Look up the product using the curly bracket structure if your import requires it
    const product = await Product.findOne({ 
      name: { $regex: parsedData.productName, $options: "i" } 
    });

    if (!product) {
      return res.json({ 
        success: false, 
        displayMessage: `Hala, wala nakit-an ang '${parsedData.productName}' sa atong inventory database records.`, 
        aiData: parsedData 
      });
    }

    let computationSnippet = "";

    if (parsedData.action === "SELL") {
      product.stock -= parsedData.quantity;
      // Pull pricing data straight from your database schema dynamically!
      const totalEarned = parsedData.quantity * product.price;
      computationSnippet = ` Inventory updated! You sold ${parsedData.quantity} units. Gross revenue earned: ₱${totalEarned.toFixed(2)}. Remaining stock: ${product.stock}.`;
    } else if (parsedData.action === "RESTOCK") {
      product.stock += parsedData.quantity;
      computationSnippet = ` Inventory replenished! Added ${parsedData.quantity} units. New stock total: ${product.stock}.`;
    }

    await product.save();

    // Combine the AI's dialect acknowledgement with your backend's exact financial values
    const finalDisplayMessage = `${parsedData.aiMessage}${computationSnippet}`;

    return res.json({
      success: true,
      displayMessage: finalDisplayMessage,
      aiData: parsedData,
      updatedProduct: product
    });

  } catch (error) {
    console.error("AWS Bedrock Processing Error:", error);
    return res.status(500).json({ error: "Internal Server Error during operational cycle." });
  }
});

// hybrid server deployment

let lambdaHandler;

if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
  // If running live on AWS Lambda, wrap Express
  lambdaHandler = serverless(app);
} else {
  // If running locally on your laptop, start the port listener
  app.listen(PORT, () => {
    console.log(`Local server listening at http://localhost:${PORT}`);
  });
}
// Export the handler for AWS Lambda to find
export const handler = lambdaHandler;

//can be fully replaced by module.exports.handler = serverless(app); 
//so that there is no chance of it crashing