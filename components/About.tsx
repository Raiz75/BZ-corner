export default function About() {
  return (
    <section id="story" className="relative overflow-hidden bg-white px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full border border-muted-purple/10 bg-muted-purple/5" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-light-purple/10" />

      <div className="relative mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            Our Story
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-muted-purple sm:text-4xl">
          Born from a simple belief.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-purple/70 sm:text-lg">
          BZ Corner was born from a simple belief: that a great cup of coffee can turn an
          ordinary day into something special. Nestled in the heart of the neighborhood, we
          source our beans from sustainable farms and roast them with care.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-purple/70 sm:text-lg">
          Whether you are catching up with friends, diving into a good book, or stealing a
          quiet moment for yourself — there is always a seat waiting at BZ Corner.
        </p>
      </div>
    </section>
  );
}
