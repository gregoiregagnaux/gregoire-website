import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Flag } from 'lucide-react'
import { getAllSlugs, getPostBySlug } from '@/lib/blog'

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-8 py-24 md:px-12 md:py-32">
      <Link
        href="/blog"
        className="inline-flex w-fit items-center gap-2 text-sm text-lux-fg-muted transition-colors hover:text-lux-fg"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Retour au blog
      </Link>

      <header className="flex flex-col gap-6 border-b border-lux-border pb-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-lux-fg-muted">
            <time>{formatDate(post.date)}</time>
            {post.tags.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <span>{post.tags.join(' · ')}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-lux-fg md:text-4xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-base leading-relaxed text-lux-fg-muted">{post.excerpt}</p>
          )}
        </div>
        {post.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-lux-border bg-lux-card">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      {post.keyTakeawaysHtml && post.keyTakeawaysHtml.length > 0 && (
        <aside
          aria-labelledby="post-key-takeaways"
          className="relative rounded-2xl border border-lux-violet/25 bg-[color-mix(in_srgb,var(--color-lux-violet)_6%,var(--color-lux-card))] p-6 md:p-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-lux-violet/30 bg-lux-violet/10 text-lux-violet">
              <Bookmark className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <span
              id="post-key-takeaways"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-lux-violet"
            >
              À retenir
            </span>
          </div>
          <ul className="flex flex-col gap-3.5">
            {post.keyTakeawaysHtml.map((item, i) => (
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

      <article className="prose-lux" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      {post.conclusionHtml && (
        <aside
          aria-labelledby="post-conclusion"
          className="relative rounded-2xl border border-lux-border bg-lux-card/60 p-6 md:p-8"
        >
          <div className="mb-4 flex items-center gap-3 border-b border-lux-border pb-4">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-lux-emerald/30 bg-lux-emerald/10 text-lux-emerald">
              <Flag className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <span
              id="post-conclusion"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-lux-emerald"
            >
              Conclusion
            </span>
          </div>
          <div
            className="prose-lux"
            dangerouslySetInnerHTML={{ __html: post.conclusionHtml }}
          />
        </aside>
      )}
    </div>
  )
}
