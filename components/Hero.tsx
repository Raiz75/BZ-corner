import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-muted-purple px-6">
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 16px 16px, white 2px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="pointer-events-none absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full border border-white/15 bg-white/5" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-80 w-80 rounded-full border-2 border-mustard-yellow/20" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-mustard-yellow/15" />
      <div className="pointer-events-none absolute top-1/2 right-12 h-24 w-24 rounded-full bg-white/15" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 pt-24 md:grid-cols-2 md:pt-0">
        <div className="relative z-10">
          <h1 className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl">
            <span className="text-mustard-yellow">BZ</span>
            <span className="block text-white">CORNER</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            Your daily ritual starts here. Great coffee, warm conversations, and a corner
            that feels like yours.
          </p>
          <a
            href="#menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-muted-purple transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/25"
          >
            Explore Our Menu
            <span className="text-lg">&rarr;</span>
          </a>
        </div>

        <div className="relative hidden h-96 w-full md:block">
          <div className="pointer-events-none absolute -inset-8 rounded-[2rem] border border-mustard-yellow/20" />
          <Image
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80"
            alt="Cozy coffee shop interior"
            fill
            className="rounded-2xl object-cover shadow-2xl"
            sizes="(max-width: 768px) 0px, 50vw"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
