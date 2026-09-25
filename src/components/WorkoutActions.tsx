"use client";

import { toast } from "react-toastify";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M6 4h12v16l-6-4-6 4V4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isInSaved, plan } = usePlan();

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const planFull = plan.length >= 5;

  const handleAddToPlan = () => {
    const added = addToPlan(workout);
    if (added) {
      toast.success("Added to today's plan");
    } else if (planFull) {
      toast.error("Today's plan is full (5 lifts max)");
    }
  };

  const handleSave = () => {
    const added = addToSaved(workout);
    if (added) {
      toast.success("Saved for later");
    }
  };

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={handleAddToPlan}
        disabled={inPlan || planFull}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <PlusIcon />
        {inPlan ? "In Today's Plan" : "Add to today's plan"}
      </button>

      <button
        onClick={handleSave}
        disabled={inSaved}
        className="inline-flex items-center gap-2 rounded-full border border-surface-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <BookmarkIcon />
        {inSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}