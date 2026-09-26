# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of workouts, lock lifts into today's plan, save others for later, and watch your week's work add up — all backed by a live API and persisted locally so your progress survives a page reload.

## 🔗 Links

- **Live Site:  b14-fitlog-2tj0og4nc-moriam-projects.vercel.app
- **GitHub Repository:  https://github.com/MoriamChowdhury/b14-fitlog

## 🛠️ Technologies Used

- **Next.js** (App Router) — routing, server & client components
- **TypeScript** — type-safe components and data models
- **Tailwind CSS** — styling and full responsiveness
- **react-toastify** — toast notifications
- **FitLog API** (`https://api.abcz.workers.dev/api/fitlog`) — workout data source

## ✨ Key Features

1. **Dynamic workout library** — 12 lifts fetched live from the FitLog API and rendered as a responsive 3×4 card grid, each with category tags, equipment, and a stats row (duration, calories, rating).
2. **Detailed workout pages** — a two-column details view (`/workout/[id]`) with specs table, step-by-step instructions, and "Add to today's plan" / "Save for later" actions.
3. **My Plan dashboard** (`/my-plan`) — live Exercises/Minutes/Calories summary, Today's Plan vs. Saved tabs, a Sort By dropdown (Duration/Calories/Rating), and Mark as Done / Remove controls per card.
4. **Global state with localStorage persistence** — plan, saved items, and completed status are kept in a shared React context and survive page reloads.
5. **Live navbar badges & toasts** — the Plan/Saved counters in the navbar update instantly on every add/remove action, paired with toast notifications for clear feedback.
6. **Fully responsive design** — a mobile hamburger menu, stacking hero section, and adaptive grids ensure the app works cleanly on mobile, tablet, and desktop.
7. **Custom 404 page** — any unknown route or invalid workout ID gracefully falls back to a branded not-found page.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
  app/            → routes (home, /my-plan, /workout/[id], not-found)
  components/      → Navbar, Hero, Library, WorkoutCard, PlanWorkoutCard, WorkoutActions, Footer
  context/         → PlanContext (global plan/saved/done state)
  lib/             → API helpers and TypeScript types
```
