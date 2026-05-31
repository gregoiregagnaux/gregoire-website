import Link from 'next/link'
import { ArrowUpRight, Folder } from 'lucide-react'
import { getAllProjects } from '@/lib/projects'

export default async function Home() {
  const projects = await getAllProjects()

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
          <Link
            href="/projets"
            className="text-sm text-lux-fg-muted transition-colors hover:text-lux-fg"
          >
            Tout voir
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projets/${project.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-lux-border bg-lux-card p-6 transition-colors hover:border-lux-violet/40"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lux-violet to-lux-emerald text-lux-canvas shadow-lg shadow-lux-violet/20">
                  <Folder className="h-5 w-5" strokeWidth={2} />
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-lux-fg-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lux-violet"
                  strokeWidth={2}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-lux-fg-muted">
                  {[project.period, ...project.tags].filter(Boolean).join(' · ')}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-lux-fg group-hover:text-lux-violet">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-lux-fg-muted">{project.excerpt}</p>
              </div>
            </Link>
          ))}
          {projects.length === 0 && (
            <article className="rounded-2xl border border-lux-border bg-lux-card p-6">
              <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-lux-border/80 text-sm text-lux-fg-muted">
                Projet à venir
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  )
}
