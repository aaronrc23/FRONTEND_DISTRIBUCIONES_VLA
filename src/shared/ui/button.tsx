import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"


const baseModernBtn =
  "px-5 py-2.5 rounded-xl border-none font-medium text-sm flex items-center gap-2 transition-all duration-200 active:scale-[0.97] cursor-pointer";

// Base para botones estilo Hero (más grandes y con sombra prominente)
const baseHeroBtn =
  "px-8 py-4 rounded-2xl flex items-center gap-2 transition-all duration-200 active:scale-[0.97] cursor-pointer";

// ══════════════════════════════════════════════════════════════
// 🧩 VARIANTES
// ══════════════════════════════════════════════════════════════

const buttonVariants = cva(
  "group/btn inline-flex shrink-0 items-center justify-center border border-transparent text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl px-5 py-2.5 font-medium text-sm active:scale-[0.97]",

        primary: `
          ${baseModernBtn}
          bg-primary text-primary-foreground
          hover:bg-primary/90
          shadow-lg shadow-primary/25
        `,

        indigo: `
          ${baseModernBtn}
          bg-primary text-primary-foreground
          hover:bg-primary/90
          shadow-lg shadow-primary/25
        `,

        success: `
          ${baseModernBtn}
          bg-emerald-500 hover:bg-emerald-600 text-white
          shadow-lg shadow-emerald-500/25
        `,

        warning: `
          ${baseModernBtn}
          bg-amber-500 hover:bg-amber-600 text-white
          shadow-lg shadow-amber-500/25
        `,

        danger: `
          ${baseModernBtn}
          bg-red-500 hover:bg-red-600 text-white
          shadow-lg shadow-red-500/25
        `,

        secondary: `
          ${baseModernBtn}
          bg-secondary text-secondary-foreground
          hover:bg-secondary/80
        `,

        ghost: `
          ${baseModernBtn}
          bg-transparent hover:bg-accent
          text-foreground hover:text-accent-foreground
          shadow-none
        `,

        unstyled: "hover:none px-6",

        outline: `
          ${baseModernBtn}
          border border-border bg-transparent
          text-foreground hover:bg-accent hover:text-accent-foreground
        `,

        link:
          "bg-transparent text-primary underline-offset-4 hover:underline cursor-pointer inline-flex items-center gap-1.5 transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50",

        destructive: `
          ${baseModernBtn}
          bg-destructive text-white
          hover:bg-destructive/90
          shadow-lg shadow-destructive/25
        `,

        // ── 🌟 Variante Brand (estilo Hero) ──────────────────
        brand: `
          ${baseHeroBtn}
          bg-linear-to-r from-amber-400 to-orange-500
          text-white font-semibold
          shadow-lg shadow-orange-500/25
          hover:shadow-orange-500/45 hover:scale-[1.02]
          border border-white/10
        `,

        "brand-outline": `
          ${baseHeroBtn}
          bg-white/10 backdrop-blur-sm
          border border-white/20
          text-white
          hover:bg-white/20 hover:scale-[1.02]
        `,

        "brand-sm": `
          ${baseModernBtn}
          bg-linear-to-r from-amber-400 to-orange-500
          text-white font-semibold
          shadow-lg shadow-orange-500/25
          hover:shadow-orange-500/45 hover:scale-[1.02]
          border border-white/10
        `,

        "shop-primary": `
          ${baseModernBtn}
          bg-shoprimary text-white
          hover:bg-shoprimary/90
          shadow-lg
          rounded-2xl
        `,
      },


      size: {
        default: "gap-1.5 px-4 py-2.5",
        xs: "h-6 gap-1 px-2 text-xs",
        sm: "h-8 gap-1 px-2.5",
        lg: "gap-1.5 px-4 text-base",
        xl: "py-4 px-6 text-base",
        icon_sm: "size-6",
        icon: "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ══════════════════════════════════════════════════════════════
// 🔘 COMPONENTE
// ══════════════════════════════════════════════════════════════

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
