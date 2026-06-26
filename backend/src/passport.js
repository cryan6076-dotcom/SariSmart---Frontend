import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT } from './config.js';

// Serialize/deserialize (required by Passport, even with JWT-based auth)
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google OAuth 2.0 Strategy

// Determine if we are on AWS or Local
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const name = profile.displayName;
                const googleId = profile.id;

                // 1. Try to find user by googleId
                let user = await User.findOne({ googleId });

                if (user) {
                    return done(null, user);
                }

                // 2. Try to find user by email (link existing account)
                user = await User.findOne({ email });

                if (user) {
                    // Link the Google account to the existing user
                    user.googleId = googleId;
                    await user.save();
                    return done(null, user);
                }

                // 3. Create a brand new user
                user = new User({
                    name,
                    email,
                    googleId,
                    // No password — this is a Google-only account
                });

                await user.save();
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;
