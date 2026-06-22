import React, { useState } from "react";
import "./SariChat.css";

import logo from "../Assets/SariLogo.png";
import homeIcon from "../Assets/homeIcon.png"
import invenIcon from "../Assets/invenIcon.png"
import profileIcon from "../Assets/profileIcon.png"
import statsIcon from "../Assets/statsIcon.png"
import statsIcon2 from "../Assets/statsIcon2.png"
import whiteSari from "../Assets/transparentSari.png"
import SariAI from "../Assets/SariAIchat.png"

const SariSmartAI = ({ onNavigate }) => {
  const [message, setMessage] = useState("");

  const suggestions = [
    "What should I restock?",
    "Suggest Markup",
    "Which product sells best?",
    "Estimate Today's Profit",
    "Summarize my inventory",
    "Add Transaction",
  ];

  return (
    <div className="ai-page">
      <div className="ai-container">
        <div className="ai-header">

          <div>
            <h2>SariSmart AI</h2>
            <p>Your Smart Store Assistant!</p>
          </div>

          <img className="chatbot" src={SariAI} alt="chatbot"></img>
        </div>

        {/* Suggested Prompts */}
        <h4>SUGGESTED PROMPTS</h4>

        <div className="prompt-grid">
          {suggestions.map((item) => (
            <button key={item}>{item}</button>
          ))}
        </div>

        <hr />

        <h4>CHAT WITH SARISMART</h4>

        <div className="chat-container">

          <div className="message ai-message">
            <img src={logo} alt="" />

            <div className="bubble">
              Based on your inventory and usual goods,
              here's what I recommend:
              <br />
              <br />
              • Coffee x 20
              <br />
              • Pancit Canton x 10
              <br />
              • Eggs x 40
              <br />
              • Sardine x 15
            </div>
          </div>

          <div className="message user-message">
            <div className="user-bubble">
              Someone bought 2 eggs,
              1 pancit canton and 2 coke.
            </div>
          </div>

        </div>

        {/* Input */}
        <div className="chat-input">

          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button>➤</button>

        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <div>
            <img src={homeIcon} alt="home"/>
            <span>Home</span>
          </div>

          <div>
            <img src={invenIcon} alt="inventory"/>
            <span>Inventory</span>
          </div>

          <div className="center-btn" onClick={() => onNavigate("chat")}>
          <img src={whiteSari} alt="chat"/>
          </div>

          <div onClick={() => onNavigate("insights") }>
            <img src={statsIcon2} alt="insights"/>
            <span>Insights</span>
          </div>
          
          <div onClick={() => onNavigate("profile") }>
            <img src={profileIcon} alt="profile"/>
            <span>Profile</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SariSmartAI;