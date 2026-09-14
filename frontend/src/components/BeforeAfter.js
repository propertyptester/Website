import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

export default function BeforeAfter({ before, after, title, slug }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const update = (clientX) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(94, Math.max(6, pct)));
  };

  return (
    <figure
      ref={ref}
      data-testid={`before-after-${slug}`}
      style={{ touchAction: "none" }}
      className="group relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl bg-deep shadow-[0_24px_48px_-24px_rgba(5,55,44,0.4)]"
      onPointerDown={(e) => {
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging && update(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img
        src={after}
        alt={`${title} — after`}
        data-testid={`after-image-${slug}`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before}
          alt={`${title} — before`}
          data-testid={`before-image-${slug}`}
          className="h-full w-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-deep/70 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-cream backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-coral px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
        <span className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-pine shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-transform duration-200 group-active:scale-95">
          <ChevronsLeftRight className="h-5 w-5" />
        </span>
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 via-deep/50 to-transparent p-5 pt-12">
        <span className="font-display text-base font-extrabold text-cream">{title}</span>
      </figcaption>
    </figure>
  );
}
