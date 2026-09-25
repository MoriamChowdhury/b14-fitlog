import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1280px] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-7xl font-bold text-accent sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
      >
        Go to workouts
      </Link>
    </div>
  );
}