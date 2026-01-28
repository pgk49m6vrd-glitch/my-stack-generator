export const getTemplates = (projectName, pm) => {
  return {
    'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`,

    'src/lib/firebase.config.js': `import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "VOTRE_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);`,

    'src/App.jsx': `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="relative z-10 text-center px-4">
        <div className="inline-block animate-bounce mb-6 text-6xl">🚀</div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          ${projectName}
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-md mx-auto mb-8">
          Stack React + Tailwind V4 + Firebase opérationnelle via ${pm}.
        </p>
        <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white inline-block">
          Architecture Feature-Based prête
        </div>
      </div>
    </div>
  );
}

export default App;`,

    'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

    'src/index.css': `@import "tailwindcss";`,

    'index.html': `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${projectName}</title></head><body class="bg-slate-900"><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`,

    '.gitignore': `node_modules\ndist\n.env\n.env.local\n.DS_Store`,

    '.ai-stack-instructions.md': `# 🧠 AI Project Instructions & Architecture

This project is built with a **Feature-Based Architecture**.
Please follow these guidelines when generating code or refactoring.

## 🛠️ Tech Stack
- **Framework:** React + Vite
- **Language:** JavaScript (ESModules)
- **Styling:** Tailwind CSS v4
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Package Manager:** ${pm}

## 📂 Project Structure (Feature-Based)
We group files by **domain feature**, not by technical type.

\`\`\`
src/
├── features/           # Domain features
│   ├── auth/           # Example feature: Authentication
│   │   ├── components/ # Components specific to Auth
│   │   ├── hooks/      # Hooks specific to Auth
│   │   └── services/   # API/Firebase logic for Auth
│   └── [feature-name]/ # New features go here
├── components/         # Shared UI components (Buttons, Inputs, Layouts)
├── hooks/              # Shared global hooks
├── lib/                # Third-party configs (Firebase, etc.)
└── utils/              # Pure helper functions
\`\`\`

## 📝 Coding Standards

### Components
- Use functional components with hooks.
- PascalCase for component filenames (e.g., \`UserProfile.jsx\`).
- Keep components small and focused. Extract logic to custom hooks if complex.

### Styling (Tailwind v4)
- Use utility classes directly.
- Avoid \`@apply\` unless creating a reusable atomic component.
- Use arbitrary values \`[]\` sparingly; prefer theme tokens.

### State Management
- Prefer local state (\`useState\`) for UI logic.
- Use \`useContext\` or global stores only for truly global state (User session, Theme).
- Use Feature-hooks to encapsulate data fetching.

### Naming Conventions
- **Files:** \`kebab-case\` for non-components, \`PascalCase\` for components.
- **Functions:** \`camelCase\` (e.g., \`fetchUserData\`).
- **Variables:** \`camelCase\` (e.g., \`isLoading\`).
- **Constants:** \`UPPER_SNAKE_CASE\` (e.g., \`MAX_RETRY_COUNT\`).

## 🚀 Creating a New Feature
1. Create a folder in \`src/features/[feature-name]\`.
2. Add \`components/\`, \`hooks/\`, and \`services/\` subfolders.
3. Keep feature-specific logic isolated.
`
  };
};
