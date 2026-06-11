import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
}: ButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: "bg-blue-700 text-white shadow-sm hover:bg-blue-800",
    secondary:
      "border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-blue-200 hover:text-blue-700",
    ghost: "text-slate-700 hover:bg-slate-100",
  };

  const classes = cn(baseClass, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}