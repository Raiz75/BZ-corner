const placeholders = [
  { label: "Interior", gradient: "from-muted-purple/40 to-dark-charcoal" },
  { label: "Coffee Bar", gradient: "from-mustard-yellow/30 to-muted-purple/30" },
  { label: "Seating", gradient: "from-dark-charcoal to-muted-purple/40" },
  { label: "Latte Art", gradient: "from-mustard-yellow/20 to-muted-purple/20" },
  { label: "Corner View", gradient: "from-muted-purple/30 to-mustard-yellow/20" },
  { label: "Street View", gradient: "from-dark-charcoal to-mustard-yellow/10" },
];

export default function Gallery() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-mustard-yellow" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            The Space
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-charcoal sm:text-4xl">
          See the corner.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((item) => (
            <div
              key={item.label}
              className={`group relative h-64 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} transition-all hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="rounded-full bg-dark-charcoal/60 px-4 py-2 text-sm font-medium text-off-white backdrop-blur-sm">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
