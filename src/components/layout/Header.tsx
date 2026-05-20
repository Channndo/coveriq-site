import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useConsumerAuth } from "../../context/ConsumerAuthContext";
import { NavHashLink } from "./NavHashLink";
import { LogoMark } from "../ui/LogoMark";

const NAV = [
  { label: "Coverage", href: "#coverage" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI", href: "#ai-guidance" },
  { label: "Exchange", href: "/agent" },
  { label: "Facts", href: "/facts" },
  { label: "FAQ", href: "#faq" },
  { label: "Glossary", href: "/glossary" },
];

export function Header() {
  const { user, isAdmin } = useConsumerAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--coveriq-header-height",
        `${el.offsetHeight}px`
      );
    };
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open, scrolled]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-[#030712]/80 backdrop-blur-2xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <LogoMark className="transition group-hover:opacity-90" />
          <span className="font-display text-lg font-bold text-white">CoverIQ</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
              >
                {item.label}
              </Link>
            ) : (
              <NavHashLink
                key={item.href}
                hash={item.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
              >
                {item.label}
              </NavHashLink>
            )
          )}
          <Link
            to={user ? "/account" : "/login"}
            className="ml-2 flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-slate-300 transition hover:border-cyan-500/40 hover:text-white"
          >
            {user ? (isAdmin ? "Admin" : "Account") : "Login"}
            {isAdmin && (
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
                Admin
              </span>
            )}
          </Link>
          <NavHashLink hash="#quote" className="btn-primary ml-2 !py-2.5 !px-5 text-sm">
            Get Quote
          </NavHashLink>
        </nav>

        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-[#030712]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <NavHashLink
                    key={item.href}
                    hash={item.href}
                    className="rounded-lg px-3 py-2.5 text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
                    onNavigate={() => setOpen(false)}
                  >
                    {item.label}
                  </NavHashLink>
                )
              )}
              <Link
                to={user ? "/account" : "/login"}
                className="mt-2 rounded-lg border border-white/15 px-3 py-2.5 text-center text-slate-300 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {user ? (isAdmin ? "Admin account" : "Account") : "Login"}
              </Link>
              <NavHashLink
                hash="#quote"
                className="btn-primary mt-2 text-center"
                onNavigate={() => setOpen(false)}
              >
                Get Quote
              </NavHashLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
