import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Solutions", href: "#" },
  { label: "Industries", href: "#" },
  { label: "Case Studies", href: "#" },
  { label: "Insights", href: "#" },
  { label: "About Us", href: "/about" },
];

const isInternal = (href: string) => href.startsWith("/");

const Nav = () => {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header
      className="surface-inverted sticky top-0 z-50 w-full shadow-none"
      style={{
        backgroundColor: "hsl(var(--bg-secondary))",
        borderBottom: "1px solid hsl(var(--line-default))",
      }}
    >
      <nav
        aria-label="Primary"
        className="page-container flex items-center justify-between"
        style={{ paddingTop: 18, paddingBottom: 18 }}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="Dreamz Automation home"
          className="flex items-center shrink-0"
          style={{ gap: 12 }}
        >
          <img
            src="/logos/Company/Icon.png"
            alt=""
            aria-hidden="true"
            style={{ height: 44, width: "auto", display: "block" }}
          />
          <img
            src="/logos/Company/Logo.png"
            alt="Dreamz Automation Systems"
            style={{ height: 48, width: "auto", display: "block" }}
          />
        </Link>

        {/* Center nav (desktop) */}
        <ul className="hidden md:flex items-center" style={{ gap: 32 }}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              {isInternal(item.href) ? (
                <Link
                  to={item.href}
                  className="text-text-muted hover:text-text-primary transition-colors duration-150"
                  style={{ fontWeight: 500, fontSize: 13 }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="text-text-muted hover:text-text-primary transition-colors duration-150"
                  style={{ fontWeight: 500, fontSize: 13 }}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right cluster: hamburger (mobile) + CTA (always) */}
        <div className="flex items-center" style={{ gap: 12 }}>
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center justify-center text-text-primary"
            style={{
              width: 44,
              height: 44,
              background: "transparent",
              border: "1px solid hsl(var(--line-default))",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="square"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>

          <a
            href="#"
            className="bg-accent-blue hover:bg-accent-blue-hover text-white uppercase transition-colors duration-150 shrink-0 inline-block"
            style={{
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.02em",
              padding: "10px 20px",
            }}
          >
            Request an Assessment
          </a>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            ref={panelRef}
            role="region"
            aria-label="Mobile navigation"
            className="md:hidden surface-inverted"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              backgroundColor: "hsl(var(--bg-secondary))",
              borderTop: "1px solid hsl(var(--line-default))",
            }}
          >
            <ul
              className="page-container flex flex-col"
              style={{ paddingTop: 8, paddingBottom: 16 }}
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {isInternal(item.href) ? (
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="block text-text-primary hover:text-accent-blue transition-colors duration-150"
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        letterSpacing: "-0.005em",
                        padding: "16px 0",
                        borderBottom: "1px solid hsl(var(--line-default))",
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block text-text-primary hover:text-accent-blue transition-colors duration-150"
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        letterSpacing: "-0.005em",
                        padding: "16px 0",
                        borderBottom: "1px solid hsl(var(--line-default))",
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
