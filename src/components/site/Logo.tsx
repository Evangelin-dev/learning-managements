import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex h-10 items-center rounded-lg bg-brand-gradient px-4 font-script text-2xl font-bold leading-none text-primary-foreground shadow-soft",
        className,
      )}
    >
      Vilaiyosai
    </Link>
  );
}
