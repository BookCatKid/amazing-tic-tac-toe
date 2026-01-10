import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <img
        src="logo.svg"
        alt="Amazing Tic Tac Toe"
        className="w-full h-auto drop-shadow-2xl"
      />
    </div>
  );
}
