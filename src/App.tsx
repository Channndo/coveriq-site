import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { StickyCTA } from "./components/layout/StickyCTA";
import { HomePage } from "./pages/HomePage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { GlossaryPage } from "./pages/GlossaryPage";

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

  return (
    <>
      <ScrollToTop />
      {!isThankYou && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
        </Routes>
      </main>
      {!isThankYou && (
        <>
          <Footer />
          <StickyCTA />
        </>
      )}
    </>
  );
}
