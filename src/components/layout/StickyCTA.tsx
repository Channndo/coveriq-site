import { motion, useScroll, useTransform } from "framer-motion";
import { NavHashLink } from "./NavHashLink";

export function StickyCTA() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [400, 600], [0, 1]);
  const y = useTransform(scrollY, [400, 600], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-cyan-500/20 bg-[#030712]/90 p-3 backdrop-blur-2xl md:hidden"
    >
      <NavHashLink hash="#quote" className="btn-primary block w-full text-center">
        Get My Quote
      </NavHashLink>
    </motion.div>
  );
}
