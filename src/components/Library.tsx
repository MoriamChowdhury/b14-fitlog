"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/lib/types";
import { fetchWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <section id="library" className="mx-auto max-w-[1280px] px-6 py-16">
      <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        The Library
      </h2>
      <p className="mt-2 text-muted">
        Twelve lifts covering every major muscle group.
      </p>

      {loading && (
        <p className="mt-12 text-center text-sm text-muted">
          Loading workouts…
        </p>
      )}

      {error && !loading && (
        <p className="mt-12 text-center text-sm text-muted">
          Couldn&apos;t load workouts. Please try again later.
        </p>
      )}

      {!loading && !error && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}