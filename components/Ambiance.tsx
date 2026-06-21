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
    <section id="vibe" className="bg-dark-charcoal px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-mustard-yellow">
            The Vibe
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-off-white sm:text-4xl">
          More than just coffee.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-warm-beige sm:text-lg">
          Warm lighting, curated playlists, and a space that invites you to stay a little
          longer. Every corner of BZ is made for slow mornings and good company.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-warm-beige/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-mustard-yellow/30 hover:bg-white/10"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 text-base font-semibold text-off-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-beige/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
