import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"


const baseModernBtn =
  "px-5 py-2.5 rounded-xl border-none font-medium text-sm flex items-center gap-2 transition-all active:scale-95";

// Base para botones estilo Hero (más grandes y con sombra prominente)
const baseHeroBtn =
  "px-8 py-4 rounded-2xl flex items-center gap-2 transition-all active:scale-95";

// ══════════════════════════════════════════════════════════════
// 🧩 VARIANTES
// ══════════════════════════════════════════════════════════════

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "p-3 bg-secondary  dark:bg-secondary rounded-2xl border border-slate-200 dark:border-none px-5 hover:dark:text-slate-50 hover:text-slate-900 shadow-sm",

        indigo: `
          ${baseModernBtn}
          bg-indigo-500 hover:bg-indigo-600 text-white
          dark:shadow-lg dark:shadow-indigo-500/20
        `,
        primary: `
          ${baseModernBtn}
          bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600
          dark:shadow-lg dark:shadow-blue-500/20
        `,

        success: `
          ${baseModernBtn}
          bg-emerald-500 hover:bg-emerald-600 text-white
          dark:shadow-lg dark:shadow-emerald-500/20
        `,

        warning: `
          ${baseModernBtn}
          bg-yellow-500 hover:bg-yellow-600 text-white
          dark:shadow-lg dark:shadow-yellow-500/20
        `,

        danger: `
          ${baseModernBtn}
          bg-red-500 hover:bg-red-600 text-white
          dark:shadow-lg dark:shadow-red-500/20
        `,

        secondary: `
          ${baseModernBtn}
          bg-secondary text-secondary-foreground hover:bg-secondary/80
          dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600
        `,

        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",

        unstyled: "hover:none px-6",

        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        link:
          "text-primary underline-offset-4 hover:underline",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90",

        // ── 🌟 Variante Brand (estilo Hero) ──────────────────
        // Botón primario con gradiente amarillo-naranja
        brand: `
          ${baseHeroBtn}
  bg-gradient-to-r from-orange-500 to-orange-500
  border border-orange-400/20
  text-white
  font-semibold
  shadow-lg shadow-orange-500/10
  
  active:scale-95
  px-6 py-2 cursor-pointer
        `,

        // Botón secundario estilo Hero (fondo translúcido)
        "brand-outline": `
          ${baseHeroBtn}
          bg-white/10
          backdrop-blur-sm
          border border-white/20
          text-white
          hover:bg-white/20
          hover:scale-105
        `,

        // Versión compacta del brand (para usar fuera del Hero)
        "brand-sm": `
          ${baseModernBtn}
          bg-linear-to-r from-yellow-400 to-orange-500
          text-white
          shadow-lg shadow-yellow-500/20
          hover:shadow-yellow-500/40
          hover:scale-105
          hover:brightness-110
        `,
        "shop-primary": `

          bg-shoprimary text-white hover:bg-shoprimary/90 border-none rounded-2xl px-4 py-2 font-medium shadow-sm
          dark:shadow-lg dark:shadow-orange-500/20 cursor-pointer
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
