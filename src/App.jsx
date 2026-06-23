import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LaunchScreen from "./pages/0_LaunchScreen";
import Onboarding from "./pages/1_onboarding";
import HomePage from "./pages/2_Homepage";
import InventoryPage from "./pages/3_InventoryPage";

import CreateLoginSetup from './components/CreateLoginSetup/CreateLoginSetup';
import LanguageSetup from './components/LanguageSetup/LanguageSetup';
import SariChat from './components/SariChat/SariChat';
import PhoneFrame from './components/PhoneFrame/PhoneFrame';
import InsightsPage from './components/InsightsPage/InsightsPage'; 
import ProductPerformance from './components/ProductPerformance/ProductPerformance'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route shows the launch screen */}
        <Route path="/" element={<LaunchScreen />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Auth */}
        <Route path="/auth" element={<CreateLoginSetup />} />
        <Route path="/language" element={<LanguageSetup />} />

        {/* Main App Pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/chat" element={<SariChat />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/product-performance" element={<ProductPerformance />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
