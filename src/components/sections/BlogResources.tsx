import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ARTICLES } from "../../lib/articles";
import { SectionHeading } from "../ui/SectionHeading";

export function BlogResources() {
  return (
    <section id="resources" className="section-elevated section-padding border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Knowledge Base"
          title="Educational Resources"
          description="Build insurance literacy at your own pace."
          light
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card group flex flex-col p-6 transition hover:border-cyan-400/20"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-500">
                {article.category}
              </span>
              <h3 className="font-display mt-3 text-lg font-semibold text-white group-hover:text-cyan-300 transition">
                {article.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-500">{article.excerpt}</p>
              <p className="mt-4 font-mono text-[10px] text-slate-600">{article.readMinutes} min read</p>
              <Link
                to="/glossary"
                className="mt-3 font-mono text-xs text-cyan-400 hover:text-cyan-300"
              >
                Read in glossary →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
