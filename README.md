# Portfolio — Ewann Bertrand

Portfolio d'étudiant développeur web (Epitech Toulouse), en HTML / CSS / JavaScript sans framework.

🔗 **Site en ligne :** https://vanbert89.github.io/Portfolio/

## Structure

```
index.html            Accueil (à la racine : obligatoire pour GitHub Pages)
404.html              Page d'erreur personnalisée
pages/                Biographie, projets, parcours, technologies, infos, contact, crédits
css/style.css         Styles communs : couleurs des thèmes clair / sombre, menu, boutons, cartes, pied de page
css/<page>.css        Styles propres à chaque page (accueil, biographie, projets, parcours, technologies,
                      informations, contact)
js/app.js             Commun à toutes les pages : thème, menu mobile, modales, particules
js/<page>.js          Scripts propres à une page (biographie, technologies, informations, contact)
images/               Photos (WebP), logos SVG libres de droits, logo Epitech, favicon
documents/            CV en PDF
robots.txt, sitemap.xml   Référencement (SEO)
```

## Automatisation (GitHub Actions)

Le workflow `.github/workflows/deploy.yml` se lance à chaque push et pull request :

1. **html-validate** : vérifie que le HTML est valide et bien structuré.
2. **lychee** : vérifie qu'aucun lien interne, image, CSS ou JS n'est cassé.
3. **Lighthouse CI** : audit accessibilité / SEO / performance (échec si accessibilité ou SEO < 90).
4. **Déploiement** automatique sur GitHub Pages si tout est vert (branche `main` uniquement).

> À faire une seule fois : *Settings → Pages → Build and deployment → Source : **GitHub Actions***.

Vérifier en local avant de pousser :

```bash
npx html-validate "**/*.html"
```

## Crédits

Sources et licences des images : voir la page [Crédits & mentions](pages/credits.html).
