import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchWorkout } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;

  let workout;
  try {
    workout = await fetchWorkout(id);
  } catch {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left — media */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-surface-border bg-surface md:aspect-auto md:min-h-[480px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right — details */}
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-4 text-muted">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-surface-border bg-surface p-6 sm:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  {spec.label}
                </dt>
                <dd className="mt-1 font-display text-sm font-semibold">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </div>
  );
}