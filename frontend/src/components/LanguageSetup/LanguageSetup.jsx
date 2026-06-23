import React, { useState } from "react";
import "./LanguageSetup.css";

import logo from "../Assets/SariLogo.png";

const LanguageSetup = ({ onFinish }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [storeName, setStoreName] = useState("");

  const languages = [
    "Bisaya",
    "English",
    "Filipino/Tagalog",
  ];

  return (
    <div className="language-page">
      <div className="language-container">

        {/* Top awning */}
        <div className="awning">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="awning-item"></div>
          ))}
        </div>

        <div className="welcome-content">

          <img src={logo} alt="logo" className="welcome-logo" />

          <h1>
            Welcome to <br />
            SariSmart!
          </h1>

          <div className="section">
            <label>Choose Your Language</label>

            {languages.map((language) => (
              <div
                key={language}
                className={`language-card ${
                  selectedLanguage === language ? "selected" : ""
                }`}
                onClick={() => setSelectedLanguage(language)}
              >
                <span>{language}</span>

                {selectedLanguage === language && (
                  <div className="checkmark">✓</div>
                )}
              </div>
            ))}
          </div>

          <div className="section">
            <label>Store Name</label>

            <input
              type="text"
              placeholder="Enter store name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>

          <button className="get-started-btn" onClick={onFinish}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSetup;