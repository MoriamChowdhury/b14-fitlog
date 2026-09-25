"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
    const [tab, setTab] = useState<Tab>("plan");
    const { plan, saved, hydrated } = usePlan();
    const [sortBy, setSortBy] = useState<"duration" | "caloriesBurned" | "rating">(
        "duration"
    );

    const list = useMemo(() => {
        const source = tab === "plan" ? plan : saved;
        return [...source].sort((a, b) => a[sortBy] - b[sortBy]);
    }, [tab, plan, saved, sortBy]);

    const exercises = plan.length;
    const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
    const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

    return (
        <div className="mx-auto max-w-[1280px] px-6 py-12">
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
                My Plan
            </h1>
            <p className="mt-2 text-muted">
                Cap of five lifts for today. Finish them, then load more.
            </p>

            {/* Metrics */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                    { label: "Exercises", value: exercises },
                    { label: "Minutes", value: minutes },
                    { label: "Calories", value: calories },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl border border-surface-border bg-surface p-5 text-center"
                    >
                        <p className="font-display text-3xl font-bold text-accent">
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-muted">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Tabs + Sort */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setTab("plan")}
                        className={
                            tab === "plan"
                                ? "rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
                                : "rounded-full px-5 py-2 text-sm font-semibold text-muted hover:text-foreground"
                        }
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setTab("saved")}
                        className={
                            tab === "saved"
                                ? "rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
                                : "rounded-full px-5 py-2 text-sm font-semibold text-muted hover:text-foreground"
                        }
                    >
                        Saved
                    </button>
                </div>

               <label className="flex items-center gap-2 text-sm text-muted">
  Sort By
  <div className="relative">
    <select
      value={sortBy}
      onChange={(e) =>
        setSortBy(e.target.value as "duration" | "caloriesBurned" | "rating")
      }
      className="appearance-none rounded-full border border-surface-border bg-surface py-1.5 pl-3 pr-8 text-sm text-foreground outline-none"
    >
      <option value="duration">Duration</option>
      <option value="caloriesBurned">Calories</option>
      <option value="rating">Rating</option>
    </select>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
</label>
            </div>

            {/* List */}
            <div className="mt-6">
                {!hydrated && (
                    <p className="py-16 text-center text-sm text-muted">
                        Loading workouts…
                    </p>
                )}

                {hydrated && list.length === 0 && (
                    <div className="flex flex-col items-center rounded-2xl border border-surface-border bg-surface py-16 text-center">
                        <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                            Nothing here yet
                        </h2>
                        <p className="mt-2 max-w-sm text-sm text-muted">
                            Browse the library and add a lift to get today moving.
                        </p>
                        <Link
                            href="/"
                            className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                        >
                            Go to workouts
                        </Link>
                    </div>
                )}

                {hydrated && list.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {list.map((workout) => (
                            <PlanWorkoutCard key={workout.id} workout={workout} variant={tab} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}