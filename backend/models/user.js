import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['buyer', 'runner', 'admin'],
        default: 'buyer'
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);