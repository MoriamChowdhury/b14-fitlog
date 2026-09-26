import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-6">
      <div className="rounded-2xl border border-surface-border bg-surface p-14">
       <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="max-w-lg">
  <p className="font-display text-sm font-semibold tracking-widest text-accent">
              WORKOUT LIBRARY
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
              Train with intent.
              <br />
              Log every set.
            </h1>
            <p className="mt-6 max-w-sm text-muted">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add
              up.
            </p>
            <a
             
  href="#library"
  className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M4 9v6M2.5 10.5v3M7 7v10M17 7v10M20 9v6M21.5 10.5v3M7 12h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Browse Workouts
            </a>
          </div>

          <div className="relative aspect-[3/4] w-full max-w-sm shrink-0 md:aspect-auto md:ml-auto md:h-[336px] md:w-[252px] md:max-w-none">
            <Image
              src="/banner.png"
              alt="Workout illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}