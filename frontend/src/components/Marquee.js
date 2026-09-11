import { Sparkle } from "lucide-react";

export default function Marquee({ items, dark = true, className = "" }) {
  return (
    <div
      className={`marquee overflow-hidden ${dark ? "bg-deep text-cream" : "bg-mint text-pine"} ${className}`}
      data-testid="marquee"
    >
      <div className="marquee-track items-center">
        {[0, 1].map((half) => (
          <div key={half} aria-hidden={half === 1} className="flex items-center">
            {items.map((it, idx) => (
              <span
                key={idx}
                className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12"
              >
                <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.22em] md:text-base">
                  {it}
                </span>
                <Sparkle className="h-4 w-4 shrink-0 text-coral" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
