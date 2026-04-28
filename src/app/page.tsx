import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <Container className="py-16 sm:py-24">
      <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            ZFC foundation
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
            A clean Next.js workspace ready for product work.
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            This starter keeps routing, layout, configuration, shared UI, and
            utilities separated from day one so new features have a clear home.
          </p>
        </div>

        <div
          id="stack"
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-6"
        >
          <h2 className="text-base font-semibold text-zinc-950">Stack</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-zinc-500">Framework</dt>
              <dd className="font-medium text-zinc-950">Next.js App Router</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-zinc-500">Language</dt>
              <dd className="font-medium text-zinc-950">TypeScript</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-zinc-500">Styling</dt>
              <dd className="font-medium text-zinc-950">Tailwind CSS v4</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-zinc-500">Tooling</dt>
              <dd className="font-medium text-zinc-950">ESLint + Turbopack</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="workflow" className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          ["Plan", "Capture routes, data contracts, and user journeys first."],
          ["Build", "Add features inside focused folders with shared UI reused."],
          ["Verify", "Run lint, type checks, and builds before handoff."],
        ].map(([title, description]) => (
          <article
            key={title}
            className="rounded-lg border border-zinc-200 bg-white p-5"
          >
            <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {description}
            </p>
          </article>
        ))}
      </section>
    </Container>
  );
}
