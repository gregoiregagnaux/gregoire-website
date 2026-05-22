import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'

function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()
  const listImage = (post: (typeof posts)[number]) => post.thumbnail ?? post.cover

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-8 py-24 md:px-12 md:py-32">
      <header className="flex flex-col gap-4">
        <span className="text-xs uppercase tracking-[0.2em] text-lux-fg-muted">Blog</span>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-lux-fg md:text-5xl">
          Notes sur les{' '}
          <span className="bg-gradient-to-r from-lux-violet to-lux-emerald bg-clip-text text-transparent">
            opérations
          </span>{' '}
          des startups
        </h1>
        <p className="max-w-xl text-base text-lux-fg-muted">
          Retours d'expérience sur l'ops, l'onboarding, la stack et les décisions early-stage.
        </p>
      </header>

      <ul className="flex flex-col gap-4">
        {posts.map((post) => {
          const img = listImage(post)
          return (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-lux-border bg-lux-card p-6 transition-colors hover:border-lux-violet/40"
            >
              <div className="flex items-start gap-5">
                {img && (
                  <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-lux-border bg-lux-canvas sm:block">
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-center gap-3 text-xs text-lux-fg-muted">
                    <time>{formatDate(post.date)}</time>
                    {post.tags.length > 0 && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{post.tags.join(' · ')}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-lux-fg group-hover:text-lux-violet">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-lux-fg-muted">{post.excerpt}</p>
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
        {posts.length === 0 && (
          <li className="rounded-2xl border border-dashed border-lux-border p-12 text-center text-sm text-lux-fg-muted">
            Aucun article pour le moment.
          </li>
        )}
      </ul>
    </div>
  )
}
