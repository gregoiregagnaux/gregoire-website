import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projets')

export type Highlight = {
  value: string
  label: string
}

export type ProjectMeta = {
  slug: string
  title: string
  date: string
  period: string
  role: string
  excerpt: string
  tags: string[]
  stack: string[]
  highlights: Highlight[]
  link?: string
  linkLabel?: string
  cover?: string
  thumbnail?: string
}

export type Project = ProjectMeta & {
  contentHtml: string
  keyTakeawaysHtml?: string[]
  conclusionHtml?: string
}

async function readProjectFile(slug: string) {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`)
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

function toHighlights(raw: unknown): Highlight[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => {
      if (item && typeof item === 'object') {
        const rec = item as Record<string, unknown>
        return { value: String(rec.value ?? ''), label: String(rec.label ?? '') }
      }
      return { value: '', label: '' }
    })
    .filter((h) => h.value.length > 0 || h.label.length > 0)
}

function toMeta(slug: string, data: Record<string, unknown>): ProjectMeta {
  const cover = typeof data.cover === 'string' && data.cover.length > 0 ? data.cover : undefined
  const thumbnail =
    typeof data.thumbnail === 'string' && data.thumbnail.length > 0 ? data.thumbnail : undefined
  const link = typeof data.link === 'string' && data.link.length > 0 ? data.link : undefined
  const linkLabel =
    typeof data.link_label === 'string' && data.link_label.length > 0 ? data.link_label : undefined
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    period: String(data.period ?? ''),
    role: String(data.role ?? ''),
    excerpt: String(data.excerpt ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
    highlights: toHighlights(data.highlights),
    ...(link ? { link } : {}),
    ...(linkLabel ? { linkLabel } : {}),
    ...(cover ? { cover } : {}),
    ...(thumbnail ? { thumbnail } : {}),
  }
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const files = await fs.readdir(PROJECTS_DIR)
  const projects = await Promise.all(
    files
      .filter((f) => f.endsWith('.md'))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, '')
        const { data } = await readProjectFile(slug)
        return toMeta(slug, data)
      }),
  )
  return projects.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data, content } = await readProjectFile(slug)
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

export async function getAllProjectSlugs(): Promise<string[]> {
  const files = await fs.readdir(PROJECTS_DIR)
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
}
