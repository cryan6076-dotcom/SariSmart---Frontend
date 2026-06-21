import { useState } from "react";

import CreateLoginSetup from './components/CreateLoginSetup/CreateLoginSetup';
import LanguageSetup from './components/LanguageSetup/LanguageSetup';
import SariChat from './components/SariChat/SariChat';
import PhoneFrame from './components/PhoneFrame/PhoneFrame';
import InsightsPage from './components/InsightsPage/InsightsPage'; 
import ProductPerformance from './components/ProductPerformance/ProductPerformance'; 

export default function App() {
  const [screen, setScreen] = useState("auth");

  // 1. LOGIN / SIGNUP SCREEN
  if (screen === "auth")
    return (
      <PhoneFrame>
      <CreateLoginSetup
        onFinish={(isLogin) => {
          if (isLogin) {
            setScreen("chat"); // login skips setup
          } else {
            setScreen("language"); // signup goes onboarding
          }
        }}
      />
      </PhoneFrame>
    );

  // 2. LANGUAGE SETUP
  if (screen === "language")
    return (
      <PhoneFrame>
      <LanguageSetup
        onFinish={() => setScreen("chat")}
      />
      </PhoneFrame>
    );

  // 3. MAIN APP (CHAT)
  if (screen === "chat")
    return (
      <PhoneFrame>
        {/* Make sure SariChat accepts onNavigate if you want bottom nav to work there too */}
        <SariChat onNavigate={setScreen} /> 
      </PhoneFrame>
    );

  // 4. INSIGHTS SCREEN
  if (screen === "insights")
    return (
      <PhoneFrame>
        <InsightsPage onNavigate={setScreen} />
      </PhoneFrame>
    );

   // 5. PRODUCT PERFORMANCE SCREEN
   if (screen === "product-performance")
    return (
      <PhoneFrame>
        <ProductPerformance 
          onNavigate={setScreen} 
          onBack={() => setScreen("insights")} 
        />
      </PhoneFrame>
    );
    
  return null;
}
