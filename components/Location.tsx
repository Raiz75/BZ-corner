export default function Location() {
  return (
    <section id="visit" className="bg-light-gray/50 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="h-1 w-16 rounded-full bg-light-gray" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-purple">
            Visit Us
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-muted-purple sm:text-4xl">
          Find your corner.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-purple">
              Location
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-purple/70">
              123 Banawe Street
              <br />
              Brgy. St. Peter, Quezon City
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-purple">
              Hours
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-purple/70">
              Mon — Fri: 7:00 AM — 9:00 PM
              <br />
              Sat — Sun: 8:00 AM — 10:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
