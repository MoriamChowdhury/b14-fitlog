import Hero from "@/components/Hero";
import Library from "@/components/Library";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="library" className="mx-auto max-w-[1280px] px-6 py-16">
        <p className="text-sm text-muted">Library grid comes next.</p>
      </section>
       <Library />
    </>
  );
}