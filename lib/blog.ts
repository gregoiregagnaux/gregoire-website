import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type PostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  cover?: string
  thumbnail?: string
}

export type Post = PostMeta & {
  contentHtml: string
  keyTakeawaysHtml?: string[]
  conclusionHtml?: string
}

async function readPostFile(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  const raw = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { data, content }
}

async function renderMarkdown(md: string): Promise<string> {
  const processed = await remark().use(html).process(md)
  return processed.toString()
}

function stripOuterParagraph(rendered: string): string {
  const trimmed = rendered.trim()
  if (trimmed.startsWith('<p>') && trimmed.endsWith('</p>') && trimmed.indexOf('<p>', 3) === -1) {
    return trimmed.slice(3, -4)
  }
  return trimmed
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  const cover = typeof data.cover === 'string' && data.cover.length > 0 ? data.cover : undefined
  const thumbnail =
    typeof data.thumbnail === 'string' && data.thumbnail.length > 0 ? data.thumbnail : undefined
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    excerpt: String(data.excerpt ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    ...(cover ? { cover } : {}),
    ...(thumbnail ? { thumbnail } : {}),
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(BLOG_DIR)
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith('.md'))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, '')
        const { data } = await readPostFile(slug)
        return toMeta(slug, data)
      }),
  )
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, content } = await readPostFile(slug)
    const contentHtml = await renderMarkdown(content)

    const rawTakeaways = data.key_takeaways
    const keyTakeawaysHtml = Array.isArray(rawTakeaways)
      ? await Promise.all(
          rawTakeaways
            .map((item) => String(item).trim())
            .filter((item) => item.length > 0)
            .map(async (item) => stripOuterParagraph(await renderMarkdown(item))),
        )
      : undefined

    const rawConclusion = typeof data.conclusion === 'string' ? data.conclusion.trim() : ''
    const conclusionHtml = rawConclusion ? await renderMarkdown(rawConclusion) : undefined

    return {
      ...toMeta(slug, data),
      contentHtml,
      ...(keyTakeawaysHtml && keyTakeawaysHtml.length > 0 ? { keyTakeawaysHtml } : {}),
      ...(conclusionHtml ? { conclusionHtml } : {}),
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw err
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR)
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
}
