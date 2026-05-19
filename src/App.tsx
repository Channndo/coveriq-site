import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ConsumerAuthProvider } from "./context/ConsumerAuthContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { StickyCTA } from "./components/layout/StickyCTA";
import { HomePage } from "./pages/HomePage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { AgentPage } from "./pages/AgentPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ConsumerOnboardingPage } from "./pages/ConsumerOnboardingPage";
import { MiraWidget } from "./components/mira/MiraWidget";
import { SyntrixGuard } from "./components/layout/SyntrixGuard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isThankYou = location.pathname === "/thank-you";

  const hideChrome =
    isThankYou ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding";

  return (
    <ConsumerAuthProvider>
      <ScrollToTop />
      {!hideChrome && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<ConsumerOnboardingPage />} />
        </Routes>
      </main>
      {!hideChrome && (
        <>
          <Footer />
          <StickyCTA />
          <MiraWidget />
          <SyntrixGuard />
        </>
      )}
    </ConsumerAuthProvider>
  );
}
