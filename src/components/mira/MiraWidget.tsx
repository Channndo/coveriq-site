import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MIRA_DISCLAIMER_AVAILABLE,
  MIRA_QUICK_PROMPTS,
  MIRA_WELCOME,
} from "../../lib/miraConfig";
import { fetchMiraStatus, sendMiraChat, type MiraMessage } from "../../lib/miraApi";
import "./mira-widget.css";

export function MiraWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<MiraMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("Connecting to MIRA…");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const st = await fetchMiraStatus();
      if (cancelled) return;
      if (st.responded && st.httpOk && st.enabled) {
        setReady(true);
        setStatusMsg(MIRA_DISCLAIMER_AVAILABLE);
        setMessages([{ role: "assistant", content: MIRA_WELCOME }]);
      } else if (!st.responded) {
        setStatusMsg("MIRA is offline — could not reach the assistant API. Try again in a moment.");
      } else {
        setStatusMsg("MIRA is temporarily unavailable on this site.");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendText = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading || !ready) return;
      setShowSuggestions(false);
      const nextMessages: MiraMessage[] = [...messages, { role: "user", content: trimmed }];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);
      const res = await sendMiraChat(nextMessages);
      setLoading(false);
      if (!res.ok || !res.data?.message) {
        setMessages([...nextMessages, { role: "assistant", content: res.error || "Sorry, I could not respond right now." }]);
        return;
      }
      setMessages([...nextMessages, { role: "assistant", content: res.data.message }]);
    },
    [loading, messages, ready]
  );

  const toggle = () => {
    setOpen((o) => !o);
    if (!open) setTimeout(() => textareaRef.current?.focus(), 150);
  };

  return (
    <>
      <div className="mira-dock">
        {!open && (
          <button type="button" className="mira-launcher" aria-label="Open MIRA" onClick={toggle}>
            <span className="mira-launcher-inner">
              <span className="mira-launcher-copy">
                <strong>MIRA</strong>
                <span className="mira-launcher-desc">Insurance education · plain language</span>
              </span>
              <span className="mira-launcher-icon-wrap">
                <img src="/mira-logo.svg" alt="" width={36} height={36} />
              </span>
            </span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mira-panel"
            role="dialog"
            aria-modal="true"
            aria-label="MIRA chat"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mira-panel-header">
              <div className="mira-panel-brand">
                <img src="/mira-logo.svg" alt="" width={36} height={36} />
                <div className="mira-panel-titles">
                  <div className="mira-panel-name-row">
                    <span className="mira-panel-name">MIRA</span>
                    <span className="mira-badge">AI</span>
                  </div>
                  <span className="mira-panel-sub">Machine Intelligence &amp; Risk Advisor · Mindroot · CoverIQ</span>
                </div>
              </div>
              <button type="button" className="mira-panel-close" aria-label="Close" onClick={toggle}>×</button>
            </div>

            <p className={`mira-disclaimer${ready ? "" : " mira-disclaimer--warn"}`}>{statusMsg}</p>

            {showSuggestions && ready && (
              <div className="mira-suggestions">
                <span className="mira-suggestions-label">Try asking</span>
                <div className="mira-chip-row">
                  {MIRA_QUICK_PROMPTS.map((q) => (
                    <button key={q.label} type="button" className="mira-chip" disabled={loading} onClick={() => sendText(q.prompt)}>
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mira-messages" role="log" aria-live="polite">
              {messages.map((m, i) => (
                <div key={`${i}-${m.role}`} className={`mira-msg mira-msg-${m.role}`}>{m.content}</div>
              ))}
              {loading && <div className="mira-msg mira-msg-assistant">…</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="mira-typing">{loading ? "MIRA is thinking…" : ""}</div>

            <div className="mira-composer">
              <div className="mira-composer-row">
                <label className="mira-sr-only" htmlFor="mira-composer-input">Message MIRA</label>
                <textarea
                  id="mira-composer-input"
                  ref={textareaRef}
                  rows={3}
                  maxLength={12000}
                  disabled={!ready || loading}
                  placeholder={ready ? "Ask MIRA about coverage concepts…" : "MIRA unavailable…"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendText(input); } }}
                />
                <button type="button" className="mira-send" disabled={!ready || loading} onClick={() => sendText(input)} aria-label="Send">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
