import { Link } from "react-router-dom";

type NavHashLinkProps = {
  hash: string;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
};

/** Link to a home-page anchor (e.g. /#faq) from any route. */
export function NavHashLink({ hash, className, onNavigate, children }: NavHashLinkProps) {
  const normalized = hash.startsWith("#") ? hash : `#${hash}`;
  return (
    <Link to={`/${normalized}`} className={className} onClick={() => onNavigate?.()}>
      {children}
    </Link>
  );
}
