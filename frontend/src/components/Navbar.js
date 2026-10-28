import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, LockKeyhole } from "lucide-react";
import { EASE } from "./anim";
import { COMPANY } from "../data/site";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export function Logo({ light = false }) {
  return (
    <Link to="/" data-testid="logo-link" className="group inline-flex shrink-0 items-center">
      {light ? (
        <span className="inline-flex items-center rounded-2xl bg-cream p-2 shadow-sm transition-transform duration-300 group-hover:-rotate-1">
          <img
            src="/logo-full.png"
            alt="Property Perfect — Build. Maintain. Renew."
            data-testid="logo-image"
            className="h-12 w-auto"
            loading="eager"
          />
        </span>
      ) : (
        <img
          src="/logo.png"
          alt="Property Perfect — Build. Maintain. Renew."
          data-testid="logo-image"
          className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03] md:h-14"
          loading="eager"
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-cream/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_rgba(14,36,31,0.08),0_12px_32px_-16px_rgba(27,74,92,0.35)]" : ""
      }`}
      data-testid="navbar"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `relative text-[15px] font-bold transition-colors hover:text-pine ${
                  isActive ? "text-pine" : "text-moss"
                } after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:rounded-full after:bg-coral after:transition-all ${
                  isActive ? "after:w-full" : "after:w-0"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={COMPANY.backOfficeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-link-back-office"
            className="inline-flex items-center gap-1.5 rounded-full border border-pine/20 px-4 py-2 text-[13px] font-bold text-pine transition-colors hover:border-pine/50 hover:bg-mintsoft"
          >
            <LockKeyhole className="h-3.5 w-3.5" />
            Back Office
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            data-testid="nav-cta-button"
            className="group hidden items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_-8px_rgba(244,80,58,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral-dark sm:inline-flex"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-ink/5 bg-cream lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6 pt-3">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: EASE }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 font-display text-2xl font-bold ${
                        isActive ? "bg-mintsoft text-pine" : "text-ink"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <a
                href={COMPANY.backOfficeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="nav-mobile-back-office"
                className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 font-display text-2xl font-bold text-pine"
              >
                <LockKeyhole className="h-5 w-5" />
                Back Office
              </a>
              <Link
                to="/contact"
                data-testid="nav-mobile-cta"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-4 text-base font-extrabold text-white"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
