export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-dark-charcoal px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 pt-24 md:grid-cols-2 md:pt-0">
        <div className="z-10">
          <h1 className="text-5xl font-black tracking-tighter text-muted-purple sm:text-6xl lg:text-7xl">
            BZ
            <span className="block text-mustard-yellow">CORNER</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-off-white sm:text-lg">
            Your daily ritual starts here. Great coffee, warm conversations, and a corner
            that feels like yours.
          </p>
          <a
            href="#menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-mustard-yellow px-8 py-3 text-sm font-bold text-dark-charcoal transition-all hover:scale-105 hover:shadow-xl hover:shadow-mustard-yellow/25"
          >
            Explore Our Menu
            <span className="text-lg">&rarr;</span>
          </a>
        </div>

        <div className="relative hidden h-80 w-full md:block lg:h-96">
          <div className="absolute inset-0 rounded-2xl border border-muted-purple/20 bg-gradient-to-br from-muted-purple/10 to-mustard-yellow/10" />
          <div className="absolute -inset-4 rounded-2xl border border-mustard-yellow/10 bg-gradient-to-tl from-muted-purple/5 to-mustard-yellow/5 blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-6 gap-2 opacity-20">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-4 rounded-sm ${
                    i % 3 === 0 ? "bg-muted-purple" : i % 3 === 1 ? "bg-mustard-yellow" : "bg-off-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-warm-beige/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
