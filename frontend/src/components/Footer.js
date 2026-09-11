import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Navbar";
import { COMPANY, SERVICES, CITIES } from "../data/site";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-deep text-cream/75" data-testid="footer">
      <div className="palm-dots absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">{COMPANY.promise}</p>
            <p className="mt-4 font-script text-2xl text-mint">
              Same properties. A brighter tomorrow...
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-all duration-300 hover:-translate-y-1 hover:border-coral hover:bg-coral hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-mint">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["/", "Home"],
                ["/about", "About"],
                ["/services", "Services"],
                ["/gallery", "Gallery"],
                ["/testimonials", "Testimonials"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    data-testid={`footer-link-${label.toLowerCase()}`}
                    className="transition-colors hover:text-coral"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-mint">Services</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services#${s.slug}`}
                    data-testid={`footer-link-service-${s.slug}`}
                    className="transition-colors hover:text-coral"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-mint">Talk to us</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={COMPANY.phoneHref}
                  data-testid="footer-phone"
                  className="flex items-center gap-3 transition-colors hover:text-coral"
                >
                  <Phone className="h-4 w-4 text-coral" /> {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  data-testid="footer-email"
                  className="flex items-center gap-3 transition-colors hover:text-coral"
                >
                  <Mail className="h-4 w-4 text-coral" /> {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                <span>
                  {COMPANY.area}
                  <span className="mt-2 block text-xs leading-relaxed text-cream/50">
                    {CITIES.slice(0, 5).join(" · ")} and beyond
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs md:flex-row">
          <p data-testid="footer-copyright">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-cream/50">
            Build <span className="text-coral">•</span> Maintain <span className="text-coral">•</span> Renew
          </p>
        </div>
      </div>
    </footer>
  );
}
