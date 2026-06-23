import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sarismart';
export const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_SECRET_KEY';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';