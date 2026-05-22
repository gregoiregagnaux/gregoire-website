---
title: "Choisir sa stack tech au stade pre-seed"
date: "2026-05-08"
excerpt: "La stack idéale en pre-seed n'est pas celle qui scale à 10M d'utilisateurs — c'est celle qui te laisse pivoter en 2 semaines."
tags: ["stack", "pre-seed", "decisions"]
key_takeaways:
  - "**Optimise pour la vitesse de réécriture**, pas pour la performance théorique."
  - "Une stack que tu maîtrises bat une stack 'moderne' que tu apprends en cours de route."
  - "Le canal d'acquisition impose des contraintes techniques bien avant la scalabilité."
  - "Choisis vite, documente en 3 lignes, reviens-y dans 6 mois avec des données."
conclusion: |
  En pre-seed, la stack n'est pas un actif : c'est un consommable. Tu vas la jeter, partiellement ou totalement, avant la Series A. Le seul critère qui compte vraiment : **est-ce que cette stack me permet de répondre à un client demain ?**

  Si oui, c'est la bonne. Reviens-y quand tu auras des problèmes de scale réels, pas avant.
# Images : dépose les fichiers dans public/images/blog/choix-stack-tech/ puis active la ligne.
# - cover (16:9)     : grand visuel en en-tête d'article
#cover: "/images/blog/choix-stack-tech/cover.png"
# - thumbnail (1:1)  : vignette carrée dans la liste du blog
thumbnail: "/images/blog/choix-stack-tech/cover.png"
---

# Choisir sa stack tech au stade pre-seed

La question revient à chaque coffee chat avec un fondateur first-time : "Qu'est-ce qu'on prend comme stack ?" La réponse honnête n'est pas une liste d'outils, c'est un cadre de décision.
![Schéma du workflow Make pour l'onboarding des salariés](/images/blog/choix-stack-tech/choix-stack-tech-test.png)

## Trois questions, dans cet ordre

1. **Combien de pivots probables d'ici la Series A ?** Si la réponse est "deux ou plus", optimise pour la vitesse de réécriture, pas pour la perf.
2. **Qui code dans 6 mois ?** Toi seul, ou une équipe de 4 ? Une stack que tu maîtrises bat une stack "moderne" que tu apprends en cours de route.
3. **Quel est le canal d'acquisition principal ?** SEO impose du SSR. Produit-led growth tolère du SPA. B2B enterprise impose des intégrations natives — pas la stack la plus sexy.

## Ma recommandation par défaut

Pour un MVP B2B SaaS en 2026, je propose presque toujours la même base :

- **Next.js** côté front (App Router, Server Components)
- **Supabase** ou **Neon** pour la base — Postgres managé, auth incluse
- **Tailwind** pour ne plus jamais discuter de design tokens en pre-seed
- **Vercel** ou **Railway** pour le déploiement

Cette stack n'est pas optimale. Elle est **suffisamment bonne, partout**. C'est ce qu'on veut quand on ne sait pas encore ce qu'on construit.

## Les pièges que je vois revenir

| Symptôme | Cause réelle |
| --- | --- |
| "On refait tout, c'est du legacy" à 8 mois | Stack choisie pour impressionner les devs, pas pour le marché |
| Migration Postgres → Mongo à la Seed | Modèle de données pas figé, mauvais diagnostic |
| Microservices avant la Series A | Org chart prématuré déguisé en archi |

## La règle que je garde

> En pre-seed, chaque heure passée à débattre d'archi est une heure non passée à parler à un client.

Choisis vite, documente la décision en 3 lignes dans un `DECISIONS.md`, et reviens-y dans 6 mois avec des données.
