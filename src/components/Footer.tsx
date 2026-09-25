import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-background">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-foreground">
          <Image src="/logo.png" alt="FitLog" width={18} height={18} />
          <span className="font-display text-sm font-semibold tracking-wide">
            FITLOG
          </span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}