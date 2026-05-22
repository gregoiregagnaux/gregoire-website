#!/usr/bin/env node
import chokidar from 'chokidar'
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content', 'blog')
const IMAGES_DIR = path.join(ROOT, 'public', 'images', 'blog')

const PREFIX = '\x1b[35m[blog-sync]\x1b[0m'
const log = (msg) => console.log(`${PREFIX} ${msg}`)
const warn = (msg) => console.warn(`${PREFIX} \x1b[33m${msg}\x1b[0m`)

function template(slug) {
  const today = new Date().toISOString().slice(0, 10)
  return `---
title: "Mettre le titre"
date: "${today}"
excerpt: "Résumé"
tags: ["tag1", "tag2"]
key_takeaways:
  - "point 1"
  - "point 2"

conclusion: |
  Écrire la conclusion ici.

# Images : dépose les fichiers dans public/images/blog/${slug}/ puis active la ligne.
# - cover (16:9)     : grand visuel en en-tête d'article
# - thumbnail (1:1)  : vignette carrée dans la liste du blog
# cover: "/images/blog/${slug}/cover.png"
# thumbnail: "/images/blog/${slug}/thumbnail.png"
# Pour ajouter une image inline, utilise le format :
# ![Légende de l'image](/images/blog/${slug}/exemple.png)
# Pour ajouter un lien : [texte du lien](https://example.com)
---

# Mettre le titre
`
}

async function pathExists(p) {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

async function ensureImageFolder(slug) {
  const dir = path.join(IMAGES_DIR, slug)
  const gitkeep = path.join(dir, '.gitkeep')
  const existed = await pathExists(dir)
  await mkdir(dir, { recursive: true })
  if (!(await pathExists(gitkeep))) {
    await writeFile(gitkeep, '', 'utf8')
  }
  if (!existed) log(`Dossier image créé : public/images/blog/${slug}/`)
}

async function handleAdd(filePath) {
  if (!filePath.endsWith('.md')) return
  const slug = path.basename(filePath, '.md')
  try {
    const content = await readFile(filePath, 'utf8')
    if (content.trim().length === 0) {
      await writeFile(filePath, template(slug), 'utf8')
      log(`Template inséré : ${slug}.md`)
    }
    await ensureImageFolder(slug)
  } catch (err) {
    warn(`Erreur sur ${slug}.md : ${err.message}`)
  }
}

async function handleUnlink(filePath) {
  if (!filePath.endsWith('.md')) return
  const slug = path.basename(filePath, '.md')
  const dir = path.join(IMAGES_DIR, slug)
  if (!(await pathExists(dir))) return
  try {
    await rm(dir, { recursive: true, force: true })
    log(`Dossier image supprimé : public/images/blog/${slug}/`)
  } catch (err) {
    warn(`Échec suppression ${dir} : ${err.message}`)
  }
}

const watcher = chokidar.watch(BLOG_DIR, {
  ignoreInitial: true,
  depth: 0,
  ignored: (p, stats) => Boolean(stats?.isFile() && !p.endsWith('.md')),
  awaitWriteFinish: { stabilityThreshold: 150, pollInterval: 50 },
})

watcher.on('add', handleAdd)
watcher.on('unlink', handleUnlink)
watcher.on('ready', () => {
  log(`Watcher prêt sur content/blog/`)
})
watcher.on('error', (err) => warn(`Watcher error: ${err.message}`))

const shutdown = async () => {
  await watcher.close()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
