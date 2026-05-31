# gregoire-website

Portfolio personnel de Grégoire Gagnaux — Founder Associate / COO.

Site vitrine présentant mes projets et un blog de notes sur les opérations des startups.

## Stack

- **Next.js 16** (App Router, React 19) — généré en **static export** (`output: 'export'`)
- **Tailwind CSS v4** — thème sombre « lux » maison
- **Contenu en Markdown** — articles de blog et projets sous `content/`, rendus via `remark`
- Déployé sur **Cloudflare Pages**

## Développement

```bash
npm install
npm run dev      # next dev (port 3001) + watcher de contenu blog
```

Le site est ensuite sur http://localhost:3001.

## Build

```bash
npm run build    # génère le site statique dans out/
```

## Structure

```
app/                  Routes (App Router) : accueil, /projets, /blog
content/
  blog/               Articles de blog (Markdown + frontmatter)
  projets/            Projets du portfolio (Markdown + frontmatter)
lib/
  blog.ts             Pipeline de lecture des articles
  projects.ts         Pipeline de lecture des projets
public/images/        Visuels (blog + projets)
```

### Ajouter un projet

Crée un fichier `content/projets/<slug>.md` avec le frontmatter (`title`, `date`,
`period`, `role`, `excerpt`, `tags`, `stack`, `highlights`, `link`…). Il apparaît
automatiquement sur `/projets` et `/projets/<slug>`.
