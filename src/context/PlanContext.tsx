"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Workout } from "@/lib/types";

interface PlanContextValue {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);
const PLAN_LIMIT = 5;

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog:plan");
      const storedSaved = localStorage.getItem("fitlog:saved");
      const storedDone = localStorage.getItem("fitlog:done");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedDone) setDoneIds(JSON.parse(storedDone));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog:plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog:saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog:done", JSON.stringify(doneIds));
  }, [doneIds, hydrated]);

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);
  const isDone = (id: number) => doneIds.includes(id);

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id) || plan.length >= PLAN_LIMIT) return false;
    setPlan((prev) => [...prev, workout]);
    return true;
  };

  const addToSaved = (workout: Workout) => {
    if (isInSaved(workout.id)) return false;
    setSaved((prev) => [...prev, workout]);
    return true;
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDoneIds((prev) => prev.filter((d) => d !== id));
  };

  const removeFromSaved = (id: number) =>
    setSaved((prev) => prev.filter((w) => w.id !== id));

  const toggleDone = (id: number) =>
    setDoneIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        hydrated,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
        isInPlan,
        isInSaved,
        isDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}