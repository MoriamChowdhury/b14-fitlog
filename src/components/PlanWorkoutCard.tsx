"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

interface PlanWorkoutCardProps {
  workout: Workout;
  variant: "plan" | "saved";
}

export default function PlanWorkoutCard({ workout, variant }: PlanWorkoutCardProps) {
  const { toggleDone, isDone, removeFromPlan, removeFromSaved } = usePlan();
  const done = variant === "plan" && isDone(workout.id);

  const handleRemove = () => {
    if (variant === "plan") {
      removeFromPlan(workout.id);
      toast.info("Removed from today's plan");
    } else {
      removeFromSaved(workout.id);
      toast.info("Removed from saved");
    }
  };

  const handleMarkDone = () => {
    toggleDone(workout.id);
    toast.success(done ? "Marked as not done" : "Marked as done");
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-surface-border bg-surface p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl sm:w-28">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h3
          className={`font-display text-base font-semibold uppercase tracking-wide ${
            done ? "text-muted line-through" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="mt-0.5 text-sm text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <ClockIcon /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FlameIcon /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-accent">
            <StarIcon /> {workout.rating}
          </span>
        </div>
      </div>

     <div className="flex shrink-0 items-center gap-3">
  <Link
    href={`/workout/${workout.id}`}
    className="rounded-full border border-surface-border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-accent/60"
  >
    View Details
  </Link>

  {variant === "plan" && (
    <button
      onClick={handleMarkDone}
      className={
        done
          ? "inline-flex items-center gap-1.5 rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent"
          : "inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent-foreground hover:opacity-90"
      }
    >
      <CheckIcon />
      {done ? "Done" : "Mark as Done"}
    </button>
  )}

  <button
    onClick={handleRemove}
    aria-label="Remove"
    className="px-1 text-lg leading-none text-muted transition-colors hover:text-red-400"
  >
    ×
  </button>
</div>
    </div>
  );
}