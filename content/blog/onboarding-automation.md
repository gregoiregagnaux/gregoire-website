---
title: "Automatiser l'onboarding produit en 7 jours"
date: "2026-04-22"
excerpt: "Comment passer d'un onboarding manuel à un parcours self-serve sans casser la conversion — retour d'expérience sur 3 SaaS B2B."
tags: ["ops", "onboarding", "automation"]
# Images : dépose les fichiers dans public/images/blog/onboarding-automation/ puis active la ligne.
# - cover (16:9)     : grand visuel en en-tête d'article
# - thumbnail (1:1)  : vignette carrée dans la liste du blog
# cover: "/images/blog/onboarding-automation/cover.png"
thumbnail: "/images/blog/onboarding-automation/thumbnail.jpeg"
---

# Automatiser l'onboarding produit en 7 jours

Sur les trois dernières startups B2B que j'ai accompagnées, l'onboarding était le même goulot d'étranglement : un membre de l'équipe Customer Success qui passe 45 minutes en visio avec chaque nouveau client. Ça marche jusqu'à 50 signups par mois. Au-delà, c'est l'équipe qu'on brûle.

## Le diagnostic, pas la solution

Avant de toucher au moindre outil, j'ai passé deux jours à mesurer :

- **Time-to-value médian** : 4 jours entre signup et première action de valeur
- **Drop-off** : 38 % des comptes ne se reconnectaient jamais après la démo
- **Coût marginal** : ~28 € en temps CS par nouveau compte activé

Ce sont ces trois chiffres qui ont justifié le sprint d'automatisation auprès du board — pas l'impression que "ça serait bien".

## La séquence en 7 jours

1. **J1-2** : Mapper les 4 actions qui prédisent la rétention à 30 jours (analyse Mixpanel)
2. **J3** : Rédiger les emails de la séquence comportementale (déclenchés par event, pas par temps)
3. **J4-5** : Setup Customer.io + tagging événements côté produit
4. **J6** : Enregistrer 3 Loom courts (< 2 min chacun) qui remplacent la démo live
5. **J7** : A/B test sur 50 % du traffic, mesure du même triptyque que le diagnostic

## Ce qui a marché, ce qui n'a pas

Le gros gain n'est pas venu de l'automatisation des emails — c'est venu de **supprimer la démo obligatoire**. La case "Réserver une démo" remplacée par "Démarrer maintenant" a fait passer le taux d'activation de 62 % à 81 % sur le segment self-serve.

> L'automatisation ne sauve pas un mauvais onboarding. Elle accélère ce qui marche déjà.

Le piège classique : vouloir automatiser le call CS au lieu de le rendre inutile.
