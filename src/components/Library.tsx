"use client";

import { useEffect, useMemo, useState } from "react";
import { Workout } from "@/lib/types";
import { fetchWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import WorkoutCardSkeleton from "@/components/WorkoutCardSkeleton";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchWorkouts()
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [workouts, query]);

  return (
    <section id="library" className="mx-auto max-w-[1280px] px-6 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or tag…"
          className="w-full rounded-full border border-surface-border bg-surface px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted sm:w-64"
        />
      </div>

      {loading && (
        <>
          <p className="mt-8 text-center text-sm text-muted">
            Loading workouts…
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <WorkoutCardSkeleton key={i} />
            ))}
          </div>
        </>
      )}

      {error && !loading && (
        <p className="mt-12 text-center text-sm text-muted">
          Couldn&apos;t load workouts. Please try again later.
        </p>
      )}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className="mt-12 text-center text-sm text-muted">
              No workouts match &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}