import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LaunchScreen from "./pages/0_LaunchScreen";
import Onboarding from "./pages/1_onboarding";
import HomePage from "./pages/2_Homepage";
import InventoryPage from "./pages/3_InventoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

// Cleaned up imports pointing directly to your new pages folder
import CreateLoginSetup from "./pages/CreateLoginSetup";
import LanguageSetup from "./pages/LanguageSetup";
import SariChat from "./pages/SariChat.jsx";
import InsightsPage from "./pages/InsightsPage"; 
import ProductPerformance from "./pages/ProductPerformance"; 
import ProfilePage from "./pages/ProfilePage";
import AddTransactionPage from "./pages/AddTransactionPage"; 
import AddProductPage from "./pages/AddProductPage"; 
import TransactionsPage from "./pages/TransactionsPage";
import TopSellingProductsPage from "./pages/TopSellingProductsPage"; // Import TopSellingProductsPage

// Reusable shell layout stays in the components folder
import PhoneFrame from "./components/PhoneFrame/PhoneFrame";

// A small sub-wrapper component to easily expose the navigate hook to your page props
function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Default route shows the launch screen */}
      <Route path="/" element={<LaunchScreen />} />

      {/* Onboarding - Option B: Passing navigation callback */}
      <Route 
        path="/onboarding" 
        element={<Onboarding onGetStarted={() => navigate("/auth")} />} 
      />

      {/* Auth & Setup Flow */}
      <Route 
        path="/auth" 
        element={<CreateLoginSetup onFinish={() => navigate("/language")} />} 
      />
      <Route 
        path="/language" 
        element={<LanguageSetup onFinish={() => navigate("/home")} />} 
      />

      {/* Main App Pages */}
      <Route path="/home" element={<HomePage onNavigate={(page) => navigate(`/${page}`)} />} />
      <Route path="/inventory" element={<InventoryPage onNavigate={(page) => navigate(`/${page}`)} />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/chat" element={<SariChat onNavigate={(page) => navigate(`/${page}`)} />} />
      <Route path="/insights" element={<InsightsPage onNavigate={(page) => navigate(`/${page}`)} />} />
      <Route 
        path="/product-performance" 
        element={<ProductPerformance onBack={() => navigate("/insights")} />} 
      />
      
      {/* Profile screen */}
      <Route path="/profile" element={<ProfilePage onNavigate={(page) => navigate(`/${page}`)} />} />

      {/* Live Transaction Checkout Route for Pitching Demo */}
      <Route path="/add-transaction" element={<AddTransactionPage onNavigate={(page) => navigate(`/${page}`)} />} />

      {/* Transactions History Route */}
      <Route path="/transactions" element={<TransactionsPage onNavigate={(page) => navigate(`/${page}`)} />} />

      {/* Ranked Performance Route */}
      <Route path="/top-selling" element={<TopSellingProductsPage onNavigate={(page) => navigate(`/${page}`)} />} />

      {/* Add New Product View screen route configuration */}
      <Route path="/add-product" element={<AddProductPage onNavigate={(page) => navigate(`/${page}`)} />} />

      {/* Catch-all redirection */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}