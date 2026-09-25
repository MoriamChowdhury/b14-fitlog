"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_LINKS = [
    { label: "Workouts", href: "/" },
    { label: "My Plan", href: "/my-plan" },
];

interface NavbarProps {
    planCount?: number;
    savedCount?: number;
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
    const pathname = usePathname();

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
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);
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

                <Link
                    href="/my-plan"
                    className="flex items-center justify-end gap-4 text-sm text-muted"
                >
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
            </div>
        </header>
    );
}