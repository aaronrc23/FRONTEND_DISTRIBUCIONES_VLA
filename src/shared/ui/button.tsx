import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"



const baseModernBtn =
  "px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all active:scale-95";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "p-3 bg-white dark:bg-secondary rounded-2xl border border-slate-200 dark:border-none px-5 hover:dark:text-slate-50 hover:text-slate-900 shadow-sm",

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
          bg-slate-200 text-slate-800 hover:bg-slate-300
          dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600
        `,

        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",

        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        link: "text-primary underline-offset-4 hover:underline",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
      },

      size: {
        default: "gap-1.5 px-3 py-2.5",
        xs: "h-6 gap-1 px-2 text-xs",
        sm: "h-8 gap-1 px-2.5",
        lg: "h-10 gap-1.5 px-2.5",
        xl: "py-4 px-6 text-base",
        icon: "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

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
  )
}

export { Button, buttonVariants }
