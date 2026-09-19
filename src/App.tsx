import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { hashToSectionId, scrollToSectionId } from "./lib/scrollToSection";
import { ConsumerAuthProvider } from "./context/ConsumerAuthContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { StickyCTA } from "./components/layout/StickyCTA";
import { HomePage } from "./pages/HomePage";
import { QuotePage } from "./pages/QuotePage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { FactsPage } from "./pages/FactsPage";
import { FactsQuizPage } from "./pages/FactsQuizPage";
import { FactsCelebrationPage } from "./pages/FactsCelebrationPage";
import { AgentPage } from "./pages/AgentPage";
import { LoginPage } from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ForgotEmailPage } from "./pages/ForgotEmailPage";
import { AccountPage } from "./pages/AccountPage";
import { SignupPage } from "./pages/SignupPage";
import { ConsumerOnboardingPage } from "./pages/ConsumerOnboardingPage";
import { ArcadePage } from "./pages/ArcadePage";
import { ComicsPage } from "./pages/ComicsPage";
import { MiraWidget } from "./components/mira/MiraWidget";
import { SyntrixGuard } from "./components/layout/SyntrixGuard";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const sectionId = hashToSectionId(hash);
    // Legacy homepage #quote → dedicated quote page
    if (pathname === "/" && sectionId === "quote") {
      navigate("/quote", { replace: true });
      return;
    }
    if (pathname === "/" && sectionId) {
      const timer = window.setTimeout(() => scrollToSectionId(sectionId), 50);
      return () => window.clearTimeout(timer);
    }
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navigate]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isThankYou = location.pathname === "/thank-you";

  const hideChrome =
    isThankYou ||
    location.pathname === "/login" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/forgot-email" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding" ||
    location.pathname === "/account" ||
    location.pathname.startsWith("/facts/celebration") ||
    location.pathname === "/arcade" ||
    location.pathname.startsWith("/arcade/");

  return (
    <ConsumerAuthProvider>
      <ScrollToTop />
      {!hideChrome && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/facts" element={<FactsPage />} />
          <Route path="/facts/quiz" element={<FactsQuizPage />} />
          <Route path="/facts/celebration/:milestone" element={<FactsCelebrationPage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/forgot-email" element={<ForgotEmailPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<ConsumerOnboardingPage />} />
          <Route path="/arcade/*" element={<ArcadePage />} />
          <Route path="/comics" element={<ComicsPage />} />
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
