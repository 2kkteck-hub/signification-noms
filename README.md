# 🌟 Signification des Noms et Prénoms

Une application web simple, rapide et moderne pour découvrir la signification, l'origine et l'histoire de tout nom ou prénom.

## 📋 Fonctionnalités

- **Recherche instantanée** : Tapez un nom ou prénom pour voir sa signification
- **Détail complet** : Origine, genre, popularité, jour de fête, variantes, personnes célèbres, étymologie
- **Noms populaires** : Découvrez les noms les plus recherchés
- **Nom aléatoire** : Trouvez un nom au hasard en un clic
- **Favoris** : Enregistrez vos noms préférés (mémorisé dans le navigateur)
- **Historique** : Retrouvez vos recherches récentes
- **Partage** : Partagez la signification d'un nom ou copiez-la dans le presse-papiers
- **Responsive** : Fonctionne sur mobile, tablette et ordinateur
- **100% hors-ligne** : Aucun serveur requis, fonctionne directement dans votre navigateur

## 🚀 Utilisation en local

1. Ouvrez le fichier `index.html` dans votre navigateur web préféré (Chrome, Firefox, Edge, Safari, etc.)
2. Tapez un nom ou prénom dans la barre de recherche
3. Cliquez sur un résultat pour voir tous les détails
4. Ajoutez vos noms préférés aux favoris avec ⭐

## ☁️ Déploiement sur Vercel (mise en ligne)

Vercel est une plateforme d'hébergement gratuite pour sites statiques. Voici comment mettre votre application en ligne :

### Étape 1 : Créer un compte GitHub
Si vous n'en avez pas, créez-en un sur [github.com](https://github.com).

### Étape 2 : Pousser le projet sur GitHub
```bash
# Dans le dossier du projet
git init
git add .
git commit -m "Premier commit - Application Signification des Noms"

# Créer un nouveau dépôt sur GitHub, puis :
git remote add origin https://github.com/VOTRE_UTILISATEUR/signification-noms.git
git branch -M main
git push -u origin main
```

### Étape 3 : Connecter à Vercel
1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub
2. Cliquez sur **"Add New Project"**
3. Sélectionnez votre dépôt `signification-noms`
4. Cliquez sur **"Deploy"**
5. Votre application sera en ligne en quelques secondes avec une URL comme : `https://signification-noms.vercel.app`

## 💾 Important : Base de données vs Hébergement

| | Vercel | Base de données |
|---|--------|-----------------|
| **Rôle** | Héberge le site web (frontend) | Stocke les données (noms, utilisateurs, etc.) |
| **Dans ce projet** | ✅ Oui - le site est déployé ici | ❌ Non - les noms sont dans un fichier JS local |

### Les données actuelles
Les 43 noms et leurs significations sont stockés dans le fichier `js/data-noms.js`. Ce fichier est envoyé avec le site sur Vercel, donc les données sont disponibles immédiatement.

### Pour une vraie base de données (optionnel)
Si vous voulez que les utilisateurs puissent ajouter leurs propres noms, créer des comptes, ou sauvegarder des favoris sur un serveur, il vous faudra une base de données externe comme :
- **Supabase** (gratuit, compatible avec Vercel)
- **Firebase** (Google)
- **MongoDB Atlas**
- **PlanetScale**

Contactez-moi si vous souhaitez ajouter une base de données externe !

## 📁 Structure du projet

```
signification-noms/
├── index.html          # Page principale
├── vercel.json         # Configuration déploiement Vercel
├── .gitignore          # Fichiers ignorés par Git
├── css/
│   └── style.css       # Styles et mise en page
├── js/
│   ├── data-noms.js    # Base de données des noms (43 noms)
│   └── app.js          # Logique de l'application
└── README.md           # Ce fichier
```

## 🛠 Personnalisation

Pour ajouter de nouveaux noms, éditez le fichier `js/data-noms.js` et ajoutez un objet suivant ce format :

```javascript
{
    id: 44,
    nom: "VotreNom",
    genre: "masculin", // ou "feminin" / "mixte"
    origine: "Origine du nom",
    signification: "Signification du nom",
    popularite: "Populaire / Très populaire",
    fete: "Jour de fête (ou 'non célébré')",
    variantes: "Variantes du nom",
    celebres: "Personnes célèbres",
    etymologie: "Histoire et étymologie détaillée"
}
```

## 🌐 Langue

L'application est entièrement en français.

## 📄 Licence

Libre d'utilisation et de modification.

---

Fait avec ❤️ pour découvrir la beauté des noms et prénoms.