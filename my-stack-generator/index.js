#!/usr/bin/env node

import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import validatePkgName from 'validate-npm-package-name';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

let currentRoot = '';

const cleanup = () => {
  if (currentRoot && fs.existsSync(currentRoot)) {
    try {
      fs.rmSync(currentRoot, { recursive: true, force: true });
      console.log(`\n🧹 Cleaned up: ${currentRoot}`);
    } catch (e) {
      // Ignore cleanup errors
    }
  }
};

process.on('SIGINT', () => {
  cleanup();
  rl.close();
  process.exit(1);
});

/**
 * Validates the project name against Windows reserved names,
 * dot/space endings, and basic character rules.
 */
export function validateProjectName(name) {
  if (!name || name.trim() === '') return false;

  // Length check to prevent DoS/filesystem errors
  if (name.length > 214) return false;

  // Refuse . and ..
  if (name === '.' || name === '..') return false;

  // Windows reserved names
  const reservedNames = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
  if (reservedNames.test(name)) return false;

  // Names ending in space or dot (Windows issues)
  if (name.endsWith(' ') || name.endsWith('.')) return false;

  // Whitelist: letters, numbers, hyphens, underscores, dots
  const validNameRegex = /^[a-zA-Z0-9_.-]+$/;
  if (!validNameRegex.test(name)) return false;

  // Path resolution check to prevent path traversal
  const root = path.resolve(process.cwd(), name);
  const realCwd = fs.realpathSync(process.cwd());
  const relative = path.relative(realCwd, root);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return false;
  }

  return true;
}

/**
 * Sanitizes and validates the npm package name.
 */
function sanitizePackageName(name) {
  const sanitized = name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '');
  const validation = validatePkgName(sanitized);
  if (!validation.validForNewPackages) {
    throw new Error(`Invalid package name: "${sanitized}". npm names must be lowercase, URL-friendly, and not reserved.`);
  }
  return sanitized;
}

/**
 * Checks if a package manager is available in the system.
 */
function checkPackageManager(pm) {
  try {
    const result = spawn.sync(pm, ['--version'], { stdio: 'ignore', timeout: 5000 });
    return result.status === 0;
  } catch (e) {
    return false;
  }
}

async function main() {
  // Node version check
  const nodeVersionMajor = parseInt(process.versions.node.split('.')[0], 10);
  if (nodeVersionMajor < 18) {
    console.error(`\n❌ Error: Node.js version 18 or higher is required. You are using ${process.versions.node}.`);
    process.exit(1);
  }

  console.log("\n--- 🚀 MYSTACK GENERATOR V1.2.0 ---");

  try {
    // 1. Project Name
    let projectName = '';
    while (true) {
      projectName = await askQuestion("👉 What is your project name? (default: my-awesome-project) ");
      projectName = projectName.trim() || 'my-awesome-project';
      if (validateProjectName(projectName)) {
        break;
      }
      console.log("❌ Invalid project name. Must be 1-214 characters, avoid reserved names, ending with space/dot, or special characters.");
    }

    // 2. Package Manager Selection
    let pm = "";
    while (true) {
      console.log("\n📦 Which package manager do you prefer?");
      console.log("1. npm");
      console.log("2. pnpm");
      console.log("3. bun");
      let pmChoice = await askQuestion("Your Choice (1, 2 or 3) [default: 1]: ");
      pmChoice = pmChoice.trim();

      if (pmChoice === "1" || pmChoice === "") {
        pm = "npm";
      } else if (pmChoice === "2") {
        pm = "pnpm";
      } else if (pmChoice === "3") {
        pm = "bun";
      }

      if (pm) {
        if (!checkPackageManager(pm)) {
          console.error(`\n❌ Error: ${pm} is not installed or not available in your PATH.`);
          pm = ""; // Reset to re-ask
          continue;
        }
        break;
      } else {
        console.log("⚠️  Invalid choice. Please select 1, 2, or 3.");
      }
    }

    // 3. Backend Choice
    let backend = "";
    while (true) {
      console.log("\n🔥 Which back-end do you prefer?");
      console.log("1. Firebase");
      console.log("2. Supabase");
      let backendChoice = await askQuestion("Your Choice (1 or 2) [default: 1]: ");
      backendChoice = backendChoice.trim();

      if (backendChoice === "1" || backendChoice === "") {
        backend = "firebase";
        break;
      } else if (backendChoice === "2") {
        backend = "supabase";
        break;
      } else {
        console.log("⚠️  Invalid choice. Please select 1 or 2.");
      }
    }

    const root = path.join(process.cwd(), projectName);
    // Do not set currentRoot here to avoid cleaning up existing directories if we fail before creation.

    if (fs.existsSync(root)) {
      console.log(`❌ Error: Directory "${projectName}" already exists.`);
      return;
    }

    console.log(`\n✨ Starting setup with ${pm} and ${backend}...`);

    // Folders structure
    const folders = [
      'src/features/auth/components',
      'src/features/auth/hooks',
      'src/features/auth/services',
      'src/components',
      'src/lib',
      'src/hooks',
      'src/utils',
      'public'
    ];

    // Create root directory safely (atomic-ish check)
    try {
      await fs.promises.mkdir(root);
    } catch (e) {
      if (e.code === 'EEXIST') {
        console.log(`❌ Error: Directory "${projectName}" already exists.`);
        return;
      }
      throw e;
    }
    // Now we own the directory
    currentRoot = root;
    await Promise.all(folders.map(folder => fs.promises.mkdir(path.join(root, folder), { recursive: true })));

    // File templates
    const files = {
      'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`,

      'src/App.jsx': `import React from 'react';

function App() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative font-sans text-slate-200">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-slate-900 to-purple-500/10" aria-hidden="true"></div>

      {/* Decorative Orb */}
      <div
        className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse motion-reduce:animate-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 text-center px-4">
        <span
          role="img"
          aria-label="Rocket launching"
          className="inline-block animate-bounce motion-reduce:animate-none mb-6 text-6xl"
        >
          🚀
        </span>

        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent forced-colors:text-[CanvasText] break-words text-balance max-w-4xl mx-auto">
          ${projectName}
        </h1>

        <p className="text-lg md:text-xl max-w-md mx-auto mb-8 opacity-90 forced-colors:text-[CanvasText]">
          React + Tailwind V4 + ${backend.charAt(0).toUpperCase() + backend.slice(1)} Stack operational.
        </p>

        <div className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/90 inline-block shadow-xl forced-colors:text-[CanvasText]">
          Feature-Based Architecture ready
        </div>
      </div>
    </main>
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

      'src/index.css': `@import "tailwindcss";

@theme {
  --font-sans: "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif";
}

:root {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  @apply bg-slate-900 text-slate-200;
}

::selection {
  @apply bg-purple-500/30 text-purple-200;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-slate-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-slate-700 rounded-full border-2 border-slate-900 hover:bg-slate-600;
}

/* Firefox support */
* {
  scrollbar-width: thin;
  scrollbar-color: #334155 #0f172a;
}
`,

      'README.md': `# ${projectName}

Built with **My Stack Generator**.

## 🚀 Getting Started

1. **Install dependencies**:
   \`\`\`bash
   ${pm} install
   \`\`\`

2. **Start the development server**:
   \`\`\`bash
   ${pm === 'npm' ? 'npm run dev' : pm + ' dev'}
   \`\`\`

## 🛠️ Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4
- **Backend**: ${backend === 'firebase' ? 'Firebase' : 'Supabase'}

## 📂 Project Structure

- \`src/features/\`: Domain-specific features (components, hooks, services).
- \`src/components/\`: Shared UI components.
- \`src/lib/\`: Backend configuration.
`,

      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Modern web application built with ${projectName}" />
  <meta name="theme-color" content="#0f172a" />
  <link rel="apple-touch-icon" href="/favicon.svg" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${projectName}" />
  <meta property="og:description" content="Built with React, Tailwind v4 and ${backend.charAt(0).toUpperCase() + backend.slice(1)}" />

  <title>${projectName}</title>
</head>
<body class="bg-slate-900">
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`,

      '.gitignore': `node_modules\ndist\n.env\n.env.local\n.DS_Store`,

      '.ai-stack-instructions.md': `# Technical Stack\n\n- React + Vite\n- Tailwind V4\n- ${backend.charAt(0).toUpperCase() + backend.slice(1)}\n- Package Manager: ${pm}`,

      'public/favicon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚀</text></svg>`,

      'public/site.webmanifest': JSON.stringify({
        name: projectName,
        short_name: projectName,
        start_url: "/",
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#0f172a",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml"
          },
          {
            src: "/favicon.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any maskable"
          },
          {
            src: "/favicon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      }, null, 2),

      'package.json': JSON.stringify({
        name: sanitizePackageName(projectName),
        private: true,
        version: "1.0.0",
        type: "module",
        engines: { "node": ">=18.0.0" },
        scripts: { "dev": "vite", "build": "vite build", "preview": "vite preview" },
        dependencies: {
          "react": "^19.0.0",
          "react-dom": "^19.0.0",
          ...(backend === 'firebase' ? { "firebase": "^12.8.0" } : { "@supabase/supabase-js": "^2.48.1" })
        },
        devDependencies: {
          "vite": "^6.0.0",
          "@vitejs/plugin-react": "^5.0.0",
          "tailwindcss": "^4.0.0",
          "@tailwindcss/vite": "^4.0.0"
        }
      }, null, 2)
    };

    if (backend === 'firebase') {
      files['src/lib/firebase.config.js'] = `import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
const getFirebaseApp = () => {
  if (!getApps().length) {
    if (!firebaseConfig.apiKey) {
      throw new Error("Firebase API Key is missing. Please set VITE_FIREBASE_API_KEY in your .env file.");
    }
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
};

// Lazy initialization of services
// Usage: const auth = getFirebaseAuth();
export const getFirebaseAuth = () => getAuth(getFirebaseApp());
export const getFirebaseDb = () => getFirestore(getFirebaseApp());
`;
      files['.env.example'] = `VITE_FIREBASE_API_KEY=\nVITE_FIREBASE_AUTH_DOMAIN=\nVITE_FIREBASE_PROJECT_ID=\nVITE_FIREBASE_STORAGE_BUCKET=\nVITE_FIREBASE_MESSAGING_ID=\nVITE_FIREBASE_APP_ID=`;
    } else {
      files['src/lib/supabase.config.js'] = `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client;
export const getSupabase = () => {
  if (!client) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
    }
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
};
`;
      files['.env.example'] = `VITE_SUPABASE_URL=\nVITE_SUPABASE_ANON_KEY=`;
    }

    // Optimization: Write files concurrently
    await Promise.all(Object.entries(files).map(([filePath, content]) =>
      fs.promises.writeFile(path.join(root, filePath), content)
    ));

    const install = await askQuestion(`\n📦 Do you want to install dependencies with ${pm}? (Y/n) `);
    if (install.trim().toLowerCase() !== 'n') {
      console.log(`\n📦 Installing dependencies with ${pm}...`);
      try {
        await new Promise((resolve, reject) => {
          const args = ['install'];
          if (pm === 'npm') {
            args.push('--no-fund');
          }
          const child = spawn(pm, args, { cwd: root, stdio: 'inherit' });
          child.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Installation failed with code ${code}`));
          });
          child.on('error', reject);
        });
        console.log(`\n✅ Done! Project created in ./${projectName}`);
        console.log(`\n🚀 Get started:`);
        console.log(`  cd ${projectName}`);
        console.log(`  ${pm === 'npm' ? 'npm run dev' : pm + ' dev'}`);
        console.log(`\n💡 Don't forget to configure your .env file based on .env.example`);
      } catch (e) {
        console.error(`\n❌ Installation failed. Cleaning up...`);
        if (fs.existsSync(root)) {
          fs.rmSync(root, { recursive: true, force: true });
        }
        console.error(`Project folder removed due to installation failure.`);
        throw e;
      }
    } else {
      console.log(`\n✅ Done! Project created in ./${projectName}`);
      console.log(`\n🚀 Next steps:`);
      console.log(`  cd ${projectName}`);
      console.log(`  ${pm} install`);
      console.log(`  ${pm === 'npm' ? 'npm run dev' : pm + ' dev'}`);
      console.log(`\n💡 Don't forget to configure your .env file based on .env.example`);
    }

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    cleanup();
  } finally {
    rl.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
