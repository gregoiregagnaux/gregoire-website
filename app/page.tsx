export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-32 px-8 py-24 md:px-12 md:py-32">
      <section className="flex flex-col gap-8">
        <span className="text-xs uppercase tracking-[0.2em] text-lux-fg-muted">Portfolio</span>
        <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-lux-fg md:text-6xl">
          Je construis et j'optimise les{' '}
          <span className="bg-gradient-to-r from-lux-violet to-lux-emerald bg-clip-text text-transparent">
            opérations
          </span>{' '}
          des{' '}
          <span className="bg-gradient-to-r from-lux-violet to-lux-emerald bg-clip-text text-transparent">
            startups
          </span>
          .
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-lux-fg-muted">
          COO's Founder Associate. J'aide les fondateurs à transformer leur vision en une machine
          opérationnelle qui scale — process, équipes, métriques.
        </p>
        <div className="mt-2">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-lux-violet to-lux-emerald px-6 py-3 text-sm font-medium text-lux-canvas shadow-lg shadow-lux-violet/20 transition-transform hover:scale-[1.02]"
          >
            Prendre un café virtuel
          </a>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-lux-fg">Projets récents</h2>
          <span className="text-sm text-lux-fg-muted">Bientôt disponible</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-lux-border bg-lux-card p-6">
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-lux-border/80 text-sm text-lux-fg-muted">
              Projet à venir
            </div>
          </article>
          <article className="rounded-2xl border border-lux-border bg-lux-card p-6">
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-lux-border/80 text-sm text-lux-fg-muted">
              Projet à venir
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
