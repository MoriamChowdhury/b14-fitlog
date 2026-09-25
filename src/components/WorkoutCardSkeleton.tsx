export default function WorkoutCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-surface-border bg-surface">
      <div className="aspect-[4/3] w-full bg-surface-border/60" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-surface-border/60" />
        <div className="h-3 w-1/2 rounded bg-surface-border/60" />
        <div className="flex gap-4 pt-1">
          <div className="h-3 w-12 rounded bg-surface-border/60" />
          <div className="h-3 w-12 rounded bg-surface-border/60" />
          <div className="h-3 w-10 rounded bg-surface-border/60" />
        </div>
      </div>
    </div>
  );
}