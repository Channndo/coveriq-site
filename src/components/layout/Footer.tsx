import { Link } from "react-router-dom";
import { LogoMark } from "../ui/LogoMark";
import {
  EXCHANGE_LOGIN_URL,
  GLOBAL_DISCLAIMER,
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
          </div>

          <div>
            <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#coverage" className="hover:text-cyan-400">Coverage Hub</a></li>
              <li><a href="#how-it-works" className="hover:text-cyan-400">How It Works</a></li>
              <li><a href="#faq" className="hover:text-cyan-400">FAQ</a></li>
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
