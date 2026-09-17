import { Link } from "react-router-dom";
import { NavHashLink } from "./NavHashLink";
import { LogoMark } from "../ui/LogoMark";
import {
  EXCHANGE_LOGIN_URL,
  FACEBOOK_URL,
  GLOBAL_DISCLAIMER,
  INSTAGRAM_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
} from "../../lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#020617]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <LogoMark />
              <span className="font-display text-lg font-bold text-white">CoverIQ</span>
            </div>
            <p className="mb-4 max-w-md text-sm text-slate-500">
              Education-first insurance intelligence. Understand coverage before you buy.
            </p>
            <p className="font-mono text-sm">
              <a href={SUPPORT_PHONE_HREF} className="text-cyan-400 hover:text-cyan-300">
                {SUPPORT_PHONE}
              </a>
              <span className="text-slate-700"> · </span>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:text-cyan-300">
                {SUPPORT_EMAIL}
              </a>
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-300"
                aria-label="CoverIQ on Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
                </svg>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-300"
                aria-label="CoverIQ on Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><NavHashLink hash="#coverage" className="hover:text-cyan-400">Coverage Hub</NavHashLink></li>
              <li><NavHashLink hash="#how-it-works" className="hover:text-cyan-400">How It Works</NavHashLink></li>
              <li><Link to="/quote" className="hover:text-cyan-400">Get a Quote</Link></li>
              <li><Link to="/facts" className="hover:text-cyan-400">Insurance Facts</Link></li>
              <li><NavHashLink hash="#faq" className="hover:text-cyan-400">FAQ</NavHashLink></li>
              <li><Link to="/glossary" className="hover:text-cyan-400">Glossary</Link></li>
              <li><Link to="/agent" className="hover:text-cyan-400">CoverIQ Exchange</Link></li>
              <li>
                <a href={EXCHANGE_LOGIN_URL} className="hover:text-cyan-400">
                  Exchange login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Not an insurer</li>
              <li>Educational content only</li>
              <li>Licensed agent required</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="prose-disclaimer text-slate-600">{GLOBAL_DISCLAIMER}</p>
          <p className="mt-4 text-center font-mono text-[10px] text-slate-700">
            © {new Date().getFullYear()} CoverIQ — An Omnistrata Company
          </p>
        </div>
      </div>
    </footer>
  );
}
