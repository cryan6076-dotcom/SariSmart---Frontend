import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT, MONGO_URI, FRONTEND_URL } from './src/config.js';
import { registerUser, loginUser, googleCallback } from './controllers/auth.js';
import passport from './src/passport.js';
import { getProducts, createProduct, updateStock } from './controllers/product.js';

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

// Routes — Products API
app.get('/api/products', getProducts);
app.post('/api/products', createProduct);
app.patch('/api/products/:id/stock', updateStock);

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});