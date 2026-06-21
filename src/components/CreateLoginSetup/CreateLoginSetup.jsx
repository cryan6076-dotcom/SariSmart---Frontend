import React, {use, useState} from 'react';
import './CreateLoginSetup.css';

import brand_logo from '../Assets/SariLogo.png';
import brand_name from '../Assets/SariSmart.png';
import tagline from '../Assets/Track.png';
import eyeIcon from '../Assets/eye.png';
import googleIcon from '../Assets/google.png';
import fbIcon from '../Assets/facebook.png';
import appleIcon from '../Assets/apple.png';


export const CreateLoginSetup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState("Sign Up");
  const isLogin = action === "Login"
  
  return (
    <div className="page">
      <div className="container">
        <div className="header">

          <div className="brand-row">
            <img className="logo" src={brand_logo} alt="logo" />

            <div className="brand-text">
              <img className="brand-name" src={brand_name} alt="SariSmart" />
              <img className="tagline" src={tagline} alt="tagline" />
            </div>
          </div>

          <div className="underline"></div>

          <h1 className="text" >{isLogin ? "Login to your account" : "Create an account"}</h1>

          <p className="subtext">
            {isLogin ? "Welcome back! Please enter your details." : "Join us and explore new possibilities!"}
          </p>
        </div>

        <div className="inputs">

          <div className="input">
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />

            <img
              src={eyeIcon}
              alt="toggle password"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        
        <div className="forgot-password">
          Forgot Password
        </div>

        <button className="submit">
          {isLogin ? "Log In" : "Create Account"}
        </button>

        {isLogin && (
        <button className="continue">
          <img src={googleIcon} alt="Google" />
          Continue with Google
        </button>         
        )}
        
        {!isLogin && (
        <div className="agreement">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I agree to the
            <span> Privacy Policy </span>
            and
            <span> Terms of Service</span>
          </label>
        </div>
        )}

        {!isLogin && (
        <div className="divider">
          <div className="divider-line"></div>
          <span>OR</span>
          <div className="divider-line"></div>
        </div>
        )}

        {!isLogin && (
        <div className="social-container">
          <div className="social-btn">
            <img src={googleIcon} alt="Google" />
          </div>

          <div className="social-btn">
            <img src={fbIcon} alt="Facebook" />
          </div>

          <div className="social-btn">
            <img src={appleIcon} alt="Apple" />
          </div>
        </div>
        )}

        <div className="login-link">
          {isLogin ? (
          <>
          <span className="login-text">
            Don't have an account ?
          </span>
          <span className="login-now" onClick={() => setAction("Sign Up")}>
            Sign Up
          </span>
          </>
          ) : (
          <>
          <span className="login-text">
            Already have an account ?
          </span>
          <span className="login-now" onClick={() => setAction("Login")}>
            Log in
          </span>
          </>
          )}
        </div>

      </div>
    </div>
  );
};

export default CreateLoginSetup;
