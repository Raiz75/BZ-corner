const features = [
  {
    icon: "\u{1F9F6}",
    title: "Cozy Seating",
    description: "Sink into our armchairs with a book and let the hours melt away.",
  },
  {
    icon: "\u{1F4F6}",
    title: "Free WiFi",
    description: "Blazing-fast internet for remote work, study sessions, or scrolling.",
  },
  {
    icon: "\u{1F3B5}",
    title: "Quiet Music",
    description: "Curated lo-fi and jazz playlists that set the perfect mood.",
  },
  {
    icon: "\u{1F393}",
    title: "Student Friendly",
    description: "Discounts for students and plenty of outlets for your devices.",
  },
];

export default function Ambiance() {
  return (
    <section id="vibe" className="relative overflow-hidden bg-light-purple px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full border border-white/15 bg-white/5" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-32 w-32 rounded-full bg-muted-purple/15" />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-white/30" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            The Vibe
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          More than just coffee.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Warm lighting, curated playlists, and a space that invites you to stay a little
          longer. Every corner of BZ is made for slow mornings and good company.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
