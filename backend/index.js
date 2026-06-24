import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT, MONGO_URI, FRONTEND_URL } from './src/config.js';
import { registerUser, loginUser, googleCallback } from './controllers/auth.js';
import passport from './src/passport.js';
import serverless from 'serverless-http'; //for serverless deployment

const app = express();

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes — Email/Password Auth
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

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