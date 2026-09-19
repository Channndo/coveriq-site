import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useConsumerAuth } from "../../context/ConsumerAuthContext";
import { NavHashLink } from "./NavHashLink";
import { LogoMark } from "../ui/LogoMark";

const NAV = [
  { label: "How It Works", href: "#coverage" },
  { label: "Quote", href: "/quote" },
  { label: "Exchange", href: "/agent" },
  { label: "Arcade", href: "/arcade" },
  { label: "Comics", href: "/comics" },
  { label: "Facts", href: "/facts" },
  { label: "FAQ", href: "#faq" },
  { label: "Glossary", href: "/glossary" },
];

/** Compact bar links — full list stays in the hamburger menu */
const DESKTOP_NAV = [
  { label: "How It Works", href: "#coverage" },
  { label: "Quote", href: "/quote" },
  { label: "Arcade", href: "/arcade" },
  { label: "Comics", href: "/comics" },
  { label: "Facts", href: "/facts" },
  { label: "Exchange", href: "/agent" },
  { label: "FAQ", href: "#faq" },
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <LogoMark className="transition group-hover:opacity-90" />
          <span className="font-display text-lg font-bold text-white">CoverIQ</span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2">
          <nav className="hidden items-center gap-0.5 xl:flex">
            {DESKTOP_NAV.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-lg px-2.5 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
                >
                  {item.label}
                </Link>
              ) : (
                <NavHashLink
                  key={item.href}
                  hash={item.href}
                  className="rounded-lg px-2.5 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
                >
                  {item.label}
                </NavHashLink>
              )
            )}
          </nav>

          <Link
            to={user ? "/account" : "/login"}
            className="hidden items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-500/40 hover:text-white sm:inline-flex"
          >
            {user ? (isAdmin ? "Admin" : "Account") : "Login"}
            {isAdmin && (
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
                Admin
              </span>
            )}
          </Link>

          <Link
            to="/quote"
            className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex"
          >
            Get Quote
          </Link>

          {/* Always visible — was lg:hidden, so fullscreen desktop had no menu control */}
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 p-2 text-slate-300 transition hover:border-cyan-500/30 hover:text-cyan-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
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
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-[#030712]/95 backdrop-blur-2xl"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 lg:px-8">
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
                className="mt-2 rounded-lg border border-white/15 px-3 py-2.5 text-center text-slate-300 hover:bg-white/5 sm:hidden"
                onClick={() => setOpen(false)}
              >
                {user ? (isAdmin ? "Admin account" : "Account") : "Login"}
              </Link>
              <Link
                to="/quote"
                className="btn-primary mt-2 text-center sm:hidden"
                onClick={() => setOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
