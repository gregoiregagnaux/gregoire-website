import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Folder } from 'lucide-react'
import { getAllProjects } from '@/lib/projects'

export default async function ProjetsIndexPage() {
  const projects = await getAllProjects()
  const listImage = (project: (typeof projects)[number]) => project.thumbnail ?? project.cover

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-8 py-24 md:px-12 md:py-32">
      <header className="flex flex-col gap-4">
        <span className="text-xs uppercase tracking-[0.2em] text-lux-fg-muted">Projets</span>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-lux-fg md:text-5xl">
          Ce que je{' '}
          <span className="bg-gradient-to-r from-lux-violet to-lux-emerald bg-clip-text text-transparent">
            construis
          </span>
        </h1>
        <p className="max-w-xl text-base text-lux-fg-muted">
          Des projets concrets, de la donnée brute à l'outil de décision — pensés pour servir une
          question, pas pour faire joli.
        </p>
      </header>

      <ul className="flex flex-col gap-4">
        {projects.map((project) => {
          const img = listImage(project)
          return (
            <li key={project.slug}>
              <Link
                href={`/projets/${project.slug}`}
                className="group block rounded-2xl border border-lux-border bg-lux-card p-6 transition-colors hover:border-lux-violet/40"
              >
                <div className="flex items-start gap-5">
                  <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-lux-border bg-lux-canvas sm:flex sm:items-center sm:justify-center">
                    {img ? (
                      <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                    ) : (
                      <Folder className="h-7 w-7 text-lux-violet" strokeWidth={1.75} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex items-center gap-3 text-xs text-lux-fg-muted">
                      {project.period && <span>{project.period}</span>}
                      {project.tags.length > 0 && (
                        <>
                          <span aria-hidden>·</span>
                          <span>{project.tags.join(' · ')}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight text-lux-fg group-hover:text-lux-violet">
                      {project.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-lux-fg-muted">{project.excerpt}</p>
                    {project.stack.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-lux-border bg-lux-canvas px-2.5 py-0.5 text-[0.7rem] text-lux-fg-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-lux-fg-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lux-violet"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            </li>
          )
        })}
        {projects.length === 0 && (
          <li className="rounded-2xl border border-dashed border-lux-border p-12 text-center text-sm text-lux-fg-muted">
            Aucun projet pour le moment.
          </li>
        )}
      </ul>
    </div>
  )
}
