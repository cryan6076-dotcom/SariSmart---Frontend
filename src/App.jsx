import { useState } from "react"

import LaunchScreen from "./pages/0_LaunchScreen"
import Onboarding from "./pages/1_onboarding"

import CreateLoginSetup from './components/CreateLoginSetup/CreateLoginSetup';
import LanguageSetup from './components/LanguageSetup/LanguageSetup';
import SariChat from './components/SariChat/SariChat';
import PhoneFrame from './components/PhoneFrame/PhoneFrame';
import InsightsPage from './components/InsightsPage/InsightsPage'; 
import ProductPerformance from './components/ProductPerformance/ProductPerformance'; 
import ProfilePage from './components/ProfilePage/ProfilePage';

export default function App() {
  const [screen, setScreen] = useState("launch")

  // 1. LAUNCH SCREEN
  if (screen === "launch") return <LaunchScreen onFinish={() => setScreen("onboarding")} />

  // 2. ONBOARDING
  if (screen === "onboarding") return <Onboarding onFinish={() => setScreen("auth")} />
  
  // 3. LOGIN / SIGNUP SCREEN
  if (screen === "auth") {
    return (
      <PhoneFrame>
        <CreateLoginSetup
          onFinish={(isLogin) => {
            if (isLogin) {
              setScreen("chat"); // login skips setup
            } else {
              setScreen("language"); // signup goes to language setup
            }
          }}
        />
      </PhoneFrame>
    );
  }

  // 4. LANGUAGE SETUP
  if (screen === "language") {
    return (
      <PhoneFrame>
        <LanguageSetup onFinish={() => setScreen("chat")} />
      </PhoneFrame>
    );
  }

  // 5. MAIN APP (CHAT)
  if (screen === "chat") {
    return (
      <PhoneFrame>
        <SariChat onNavigate={setScreen} /> 
      </PhoneFrame>
    );
  }

  // 6. INSIGHTS SCREEN
  if (screen === "insights") {
    return (
      <PhoneFrame>
        <InsightsPage onNavigate={setScreen} />
      </PhoneFrame>
    );
  }

  // 7. PROFILE SCREEN
  if (screen === "profile") {
    return (
      <PhoneFrame>
        <ProfilePage onNavigate={setScreen} />
      </PhoneFrame>
    );
  }

  // 8. PRODUCT PERFORMANCE SCREEN
  if (screen === "product-performance") {
    return (
      <PhoneFrame>
        <ProductPerformance 
          onNavigate={setScreen} 
          onBack={() => setScreen("insights")} 
        />
      </PhoneFrame>
    );
  }
    
  return null;
}