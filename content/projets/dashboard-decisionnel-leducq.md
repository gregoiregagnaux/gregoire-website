---
title: "Un dashboard de business intelligence pour la prise de décision"
date: "2026-05-26"
period: "2026"
role: "Conception & développement — de la donnée brute à l'outil de décision"
excerpt: "Consolider une donnée éclatée entre une API métier, des exports CSV et un CRM en un seul tableau de bord décisionnel, sécurisé et mis à jour automatiquement chaque nuit."
tags: ["Business Intelligence", "Data", "Décision"]
stack:
  - "Next.js 16"
  - "React 19"
  - "Supabase (Postgres)"
  - "Tremor"
  - "Python (ETL)"
  - "Vercel"
  - "GitHub Actions"
highlights:
  - value: "4"
    label: "sources de données unifiées en un seul modèle"
  - value: "~10"
    label: "KPI décisionnels (CA, marge, taux de vente…)"
  - value: "02:17"
    label: "synchronisation nocturne automatisée (UTC)"
  - value: "SSO"
    label: "accès Google + allowlist + RLS sur chaque table"
link: "https://bi.leducq-encheres.com"
link_label: "Voir le dashboard (accès restreint)"
key_takeaways:
  - "**La donnée n'a de valeur que consolidée.** Tant qu'elle vit dans trois outils séparés, personne ne décide rien."
  - "Un bon dashboard décisionnel ne montre pas *toutes* les données — il montre les **5 à 10 chiffres** qui changent une décision."
  - "L'automatisation du sync (cron nocturne) est ce qui transforme une démo en outil dont on se sert vraiment."
  - "Sécuriser l'accès dès le départ (SSO + allowlist + RLS) coûte une journée et évite de tout reprendre plus tard."
conclusion: |
  C'était mon premier projet de bout en bout : partir d'une donnée qui dormait dans une API, des fichiers CSV et un CRM, et la transformer en un outil que l'on **ouvre le matin pour décider** — quelles ventes performent, où se trouve la marge, qui sont les meilleurs clients.

  La leçon que je garde : la valeur n'est pas dans la techno, elle est dans la **question à laquelle on répond**. La stack n'a fait que servir cette question.
# Images : dépose les fichiers dans public/images/projets/dashboard-decisionnel-leducq/ puis active la ligne.
# cover: "/images/projets/dashboard-decisionnel-leducq/cover.png"
# thumbnail: "/images/projets/dashboard-decisionnel-leducq/thumbnail.png"
---

## Le point de départ : une donnée qui ne parlait à personne

Dans une maison de ventes aux enchères, l'information vit partout sauf au même endroit. Les lots et les adjudications sont dans l'**API métier** (Exeve). Les références vendeurs, acheteurs et experts arrivent par **exports CSV**. Les sources d'acquisition des clients sont suivies dans un **CRM (Airtable)**.

Résultat : pour répondre à une question aussi simple que *« quelle vente a dégagé le plus de marge ce trimestre ? »*, il fallait croiser trois outils à la main. Autant dire que personne ne le faisait — et que les décisions se prenaient à l'intuition.

## L'objectif : décider, pas contempler

Je ne voulais pas d'un énième écran rempli de graphiques. L'objectif était précis : **réduire le temps entre une question et sa réponse à quelques secondes.**

Trois questions de décision ont guidé tout le projet :

1. **Quelles ventes performent réellement ?** — au-delà du chiffre d'affaires brut, en regardant la marge et le taux de vente.
2. **Où part la valeur ?** — commissions vendeur, acheteur, expert, plateforme, apporteur d'affaires.
3. **Qui sont les clients qui comptent ?** — vendeurs et acheteurs récurrents, et par quel canal ils sont arrivés.

## L'architecture : un seul modèle, plusieurs sources

J'ai construit un pipeline qui consolide toutes les sources dans une base Postgres unique (Supabase), avec des vues pré-agrégées pensées pour la lecture côté dashboard.

```
API Exeve ──(scripts Python)──> Supabase ──(@supabase/supabase-js)──> Dashboard Next.js
                 │                  │
                 └── exports CSV ───┘   (jointure des références vendeur / acheteur / expert)
        CRM Airtable ──────────────┘   (canal d'acquisition des contacts)
```

Le dashboard ne lit jamais les tables brutes : il consomme des **vues métier** déjà agrégées (`bi_dashboard_master`, statistiques par vente, statistiques mensuelles, stats CRM par contact). Toute la logique de calcul lourde vit dans la base — l'interface reste rapide et simple.

## Les KPI qui changent une décision

Le cœur du tableau de bord, c'est une dizaine d'indicateurs choisis pour leur impact sur une décision, pas pour faire joli :

| Indicateur | Ce qu'il déclenche comme décision |
| --- | --- |
| CA total & adjudication totale | Lire la performance brute d'une vente ou d'une période |
| Marge brute | Distinguer une vente qui « fait du chiffre » d'une vente rentable |
| Commissions (vendeur, acheteur, expert, plateforme) | Comprendre où part la valeur, lot par lot |
| Taux de vente / lots invendus | Ajuster les estimations et la sélection des prochains lots |
| Ratio adjudication / estimation | Calibrer les estimations futures |
| Lot record & podium clients | Identifier les pièces et les contacts à fort potentiel |

Le tout est filtrable par **date, vente, expert et source d'acquisition**, et se décline en vue par vente et en fiche CRM détaillée par contact.

## Ce qui le rend vraiment utilisable

Un dashboard de démo et un outil dont on se sert tous les jours, c'est deux choses différentes. Trois détails ont fait la différence :

- **Synchronisation nocturne automatique.** Les contacts et les sources d'acquisition se mettent à jour seuls chaque nuit via GitHub Actions, même laptop éteint. Les chiffres sont frais le matin sans intervention.
- **Accès sécurisé dès le départ.** Connexion Google (SSO) restreinte à une *allowlist*, et une politique de sécurité au niveau des lignes (RLS) sur chaque table : un visiteur non authentifié ne voit strictement rien.
- **Tolérance aux variations de schéma.** La couche de lecture essaie plusieurs noms de colonnes possibles — quand la donnée source bouge, le dashboard ne casse pas.

## Ce que j'en retire

Au-delà du livrable, ce projet m'a appris à raisonner *de la décision vers la donnée*, et non l'inverse. On part de la question que se pose un dirigeant, on remonte jusqu'à la donnée brute, et on ne garde dans l'interface que ce qui sert cette question.
