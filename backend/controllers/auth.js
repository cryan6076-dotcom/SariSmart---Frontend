import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, FRONTEND_URL } from '../src/config.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create and save the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Generate the JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. Send token back to the frontend
        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Google OAuth callback — generates JWT and redirects to frontend
export const googleCallback = (req, res) => {
    try {
        const user = req.user;

        // Generate the same JWT as email/password login
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Encode user info for the frontend
        const userInfo = encodeURIComponent(
            JSON.stringify({ id: user._id, name: user.name, role: user.role })
        );

        // Redirect to frontend with token and user info
        res.redirect(`${FRONTEND_URL}/?token=${token}&user=${userInfo}`);

    } catch (error) {
        res.redirect(`${FRONTEND_URL}/?error=auth_failed`);
    }
};