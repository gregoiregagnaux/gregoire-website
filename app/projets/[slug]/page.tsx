import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Bookmark, Flag } from 'lucide-react'
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/projects'

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-8 py-24 md:px-12 md:py-32">
      <Link
        href="/projets"
        className="inline-flex w-fit items-center gap-2 text-sm text-lux-fg-muted transition-colors hover:text-lux-fg"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Retour aux projets
      </Link>

      <header className="flex flex-col gap-6 border-b border-lux-border pb-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-lux-fg-muted">
            {project.period && <span>{project.period}</span>}
            {project.tags.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <span>{project.tags.join(' · ')}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-lux-fg md:text-4xl">
            {project.title}
          </h1>
          {project.role && <p className="text-sm text-lux-fg-muted">{project.role}</p>}
          {project.excerpt && (
            <p className="text-base leading-relaxed text-lux-fg-muted">{project.excerpt}</p>
          )}
        </div>

        {project.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-lux-border bg-lux-card">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-lux-border bg-lux-card px-3 py-1 text-xs text-lux-fg-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-lux-violet to-lux-emerald px-5 py-2.5 text-sm font-medium text-lux-canvas shadow-lg shadow-lux-violet/20 transition-transform hover:scale-[1.02]"
          >
            {project.linkLabel ?? 'Voir le projet'}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
          </a>
        )}
      </header>

      {project.highlights.length > 0 && (
        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-lux-border bg-lux-border md:grid-cols-4">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex flex-col gap-1 bg-lux-card p-5">
              <span className="bg-gradient-to-r from-lux-violet to-lux-emerald bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                {h.value}
              </span>
              <span className="text-xs leading-snug text-lux-fg-muted">{h.label}</span>
            </div>
          ))}
        </section>
      )}

      <article className="prose-lux" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />

      {project.keyTakeawaysHtml && project.keyTakeawaysHtml.length > 0 && (
        <aside
          aria-labelledby="project-key-takeaways"
          className="relative rounded-2xl border border-lux-violet/25 bg-[color-mix(in_srgb,var(--color-lux-violet)_6%,var(--color-lux-card))] p-6 md:p-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-lux-violet/30 bg-lux-violet/10 text-lux-violet">
              <Bookmark className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <span
              id="project-key-takeaways"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-lux-violet"
            >
              À retenir
            </span>
          </div>
          <ul className="flex flex-col gap-3.5">
            {project.keyTakeawaysHtml.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-lux-fg"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-lux-violet"
                />
                <span className="callout-inline" dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </aside>
      )}

      {project.conclusionHtml && (
        <aside
          aria-labelledby="project-conclusion"
          className="relative rounded-2xl border border-lux-border bg-lux-card/60 p-6 md:p-8"
        >
          <div className="mb-4 flex items-center gap-3 border-b border-lux-border pb-4">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-lux-emerald/30 bg-lux-emerald/10 text-lux-emerald">
              <Flag className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <span
              id="project-conclusion"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-lux-emerald"
            >
              Conclusion
            </span>
          </div>
          <div className="prose-lux" dangerouslySetInnerHTML={{ __html: project.conclusionHtml }} />
        </aside>
      )}
    </div>
  )
}
