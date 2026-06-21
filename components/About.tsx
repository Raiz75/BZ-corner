export default function About() {
  return (
    <section id="story" className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            Our Story
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-charcoal sm:text-4xl">
          Born from a simple belief.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-warm-gray sm:text-lg">
          BZ Corner was born from a simple belief: that a great cup of coffee can turn an
          ordinary day into something special. Nestled in the heart of the neighborhood, we
          source our beans from sustainable farms and roast them with care.
        </p>
        <p className="mt-4 text-base leading-relaxed text-warm-gray sm:text-lg">
          Whether you are catching up with friends, diving into a good book, or stealing a
          quiet moment for yourself — there is always a seat waiting at BZ Corner.
        </p>
      </div>
    </section>
  );
}
