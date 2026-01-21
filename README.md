# 🛠️ My Stack Generator

**Le générateur de boilerplate ultime pour le développement "AI-Native" avec React, Tailwind v4 et Firebase.**

Ce projet est une interface de ligne de commande (CLI) personnelle conçue pour automatiser la création de projets web modernes. Plutôt que de configurer manuellement chaque outil, ce générateur déploie une architecture robuste, scalable et immédiatement comprise par les assistants IA (Cursor, Claude Code, Google AntiGravity, etc.).

---

## 🚀 Pourquoi utiliser My Stack Generator ?

Le but est de supprimer la "fatigue du setup". En une seule commande, vous obtenez un environnement de production prêt à l'emploi qui respecte les meilleures pratiques actuelles.

### La Stack Technique
* **Framework :** [React](https://reactjs.org/) (via Vite) pour une rapidité d'exécution maximale.
* **Styling :** [Tailwind CSS v4](https://tailwindcss.com/) (moteur haute performance).
* **Backend :** [Firebase](https://firebase.google.com/) (SDK Modulaire v9+) pré-configuré.
* **Architecture :** Feature-Based Design (Organisation par domaines métiers).

---

## 🏗️ Architecture & Points Forts

L'architecture générée suit une logique **Feature-Based**. Au lieu de regrouper les fichiers par "type technique" (tous les composants ensemble, tous les hooks ensemble), nous les regroupons par **fonctionnalité**.



### Structure des dossiers :
* **`src/features/`** : Le cœur de l'application. Chaque dossier (ex: `auth`) contient ses propres `components`, `hooks` et `services`. 
* **`src/lib/`** : Centralisation des configurations (ex: `firebase.config.js`).
* **`src/components/`** : Composants UI globaux et réutilisables (Button, Input, Card).
* **`src/hooks/`** : Hooks globaux partagés entre plusieurs fonctionnalités.


---

## ⚙️ Installation

Suivez ces étapes pour installer la commande globalement sur votre machine :

### 1. Télécharger le projet
Clonez le dépôt ou téléchargez les fichiers sources dans un dossier dédié.

### 2. Accéder au dossier
Ouvrez votre terminal et déplacez-vous dans le projet :
```bash
cd my-stack-generator
```
### 3. Lier la commande au système
Exécutez la commande suivante pour enregistrer **`create-my-stack`** sur votre ordinateur :
```bash
npm link
```

---

## 💻 Utilisation
Pour créer un nouveau projet, il vous suffit de lancer :
```bash
create-my-stack
```
Le terminal vous posera alors une question interactive :
```plaintext
👉 Quel est le nom de votre projet ?
```

Après avoir rentré le nom de votre projet, le terminal vous posera une seconde question :
```plaintext
📦 Quel gestionnaire de paquets préférez-vous ?
1. npm
2. pnpm
3. bun
Votre choix (1, 2 ou 3) :
```
Vous n'avez qu'à répondre par 1, 2 ou 3

Actions automatisées par le script :

- Création de l'arborescence complète des dossiers.

- Génération des fichiers de configuration (React, Tailwind v4, Firebase).

- Création d'une page d'accueil animée (App.jsx) pour tester le rendu immédiatement.

- Installation automatique de toutes les dépendances via votre gestionaire de paquets.
