import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M12 3c1 3-3 4-3 7a3 3 0 0 0 6 0c1.5 1 2 2.5 2 4a5 5 0 1 1-10 0c0-4 3-6 5-11Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17l-5.9 3.5 1.3-6.6-4.9-4.6 6.6-.7L12 2.5Z" />
    </svg>
  );
}

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-surface-border bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-base font-semibold uppercase tracking-wide">
          {workout.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{workout.equipment}</p>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <ClockIcon />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FlameIcon />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-accent">
            <StarIcon />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}