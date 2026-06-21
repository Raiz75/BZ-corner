import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80",
    label: "Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    label: "Coffee Bar",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    label: "Seating",
  },
  {
    src: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    label: "Latte Art",
  },
  {
    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80",
    label: "Corner View",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    label: "Street View",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-light-gray" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            The Space
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-muted-purple sm:text-4xl">
          See the corner.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((item) => (
            <div
              key={item.label}
              className="group relative h-64 overflow-hidden rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-muted-purple/60 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-muted-purple">
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
