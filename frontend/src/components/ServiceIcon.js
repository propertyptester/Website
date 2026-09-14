import {
  TreePine,
  ClipboardList,
  Shovel,
  Wrench,
  Leaf,
  Hammer,
  Droplets,
  CloudLightning,
  Sprout,
  Sparkles,
  PaintBucket,
  Truck,
  Building2,
  Users,
  Home,
  Landmark,
  HeartHandshake,
} from "lucide-react";

const ICONS = {
  TreePine,
  ClipboardList,
  Shovel,
  Wrench,
  Leaf,
  Hammer,
  Droplets,
  CloudLightning,
  Sprout,
  Sparkles,
  PaintBucket,
  Truck,
  Building2,
  Users,
  Home,
  Landmark,
  HeartHandshake,
};

const CHIPS = {
  coral: "bg-mint text-pine",
  teal: "bg-[#DCF2F6] text-lagoon",
  mint: "bg-mint text-pine",
};

const SIZES = {
  sm: ["h-10 w-10", "h-5 w-5"],
  md: ["h-14 w-14", "h-7 w-7"],
  lg: ["h-16 w-16", "h-8 w-8"],
};

export default function ServiceIcon({ name, chip = "coral", size = "md", className = "" }) {
  const Icon = ICONS[name] || Leaf;
  const [box, ic] = SIZES[size] || SIZES.md;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${CHIPS[chip] || CHIPS.coral} ${box} ${className}`}
    >
      <Icon className={ic} />
    </span>
  );
}
