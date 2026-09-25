"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";

const NAV_LINKS = [
  { label: "Workouts", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const planCount = plan.length;
  const savedCount = saved.length;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Image src="/logo.png" alt="FitLog" width={24} height={24} />
          <span className="font-display text-lg font-semibold tracking-wide">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground"
                    : "rounded-full px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/my-plan" className="hidden items-center gap-4 text-sm text-muted sm:flex">
            <span className="flex items-center gap-2">
              Plan
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {planCount}
              </span>
            </span>
            <span className="flex items-center gap-2">
              Saved
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-surface-border text-xs font-semibold text-foreground">
                {savedCount}
              </span>
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border text-foreground md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-surface-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    isActive
                      ? "rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
                      : "rounded-full px-4 py-2 text-sm font-medium text-muted hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 flex items-center gap-4 border-t border-surface-border pt-4 text-sm text-muted sm:hidden">
            <span className="flex items-center gap-2">
              Plan
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {planCount}
              </span>
            </span>
            <span className="flex items-center gap-2">
              Saved
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-surface-border text-xs font-semibold text-foreground">
                {savedCount}
              </span>
            </span>
          </div>
        </div>
      )}
    </header>
  );
}