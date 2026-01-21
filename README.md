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

### 🤖 Le "AI-Source of Truth"
Chaque projet généré inclut un fichier **`.ai-stack-instructions.md`**. 
Ce fichier est conçu pour être partagé avec vos outils d'IA (Cursor, Claude Code, etc.). Il explique à l'IA :
1. Les technologies utilisées.
2. Les règles de nommage et de structure.
3. Les standards de développement à respecter.

Cela garantit que le code généré par l'IA sera **toujours compatible** avec votre architecture sans que vous ayez à le réexpliquer à chaque fois.

---

## ⚙️ Installation

Suivez ces étapes pour installer la commande globalement sur votre machine :

### 1. Télécharger le projet
Clonez le dépôt ou téléchargez les fichiers sources dans un dossier dédié.

### 2. Accéder au dossier
Ouvrez votre terminal et déplacez-vous dans le projet :
```bash
cd my-stack-generator
