/**
 * Template engine powered by Handlebars.
 * Supports precompiled templates for production performance,
 * with fallback to runtime compilation from .hbs files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const COMPILED_DIR = path.join(TEMPLATES_DIR, 'compiled');

// ─── Handlebars Helpers ─────────────────────────────────────────────

/**
 * Register all custom Handlebars helpers.
 */
function registerHelpers() {
  // {{ext}} → returns 'tsx'/'jsx' or 'ts'/'js' based on context
  Handlebars.registerHelper('ext', function (base, options) {
    const ctx = options ? options.data.root : this;
    if (base === 'jsx') return ctx.typescript ? 'tsx' : 'jsx';
    if (base === 'js') return ctx.typescript ? 'ts' : 'js';
    return base;
  });

  // {{capitalizeFirst str}} → "Firebase" from "firebase"
  Handlebars.registerHelper('capitalizeFirst', function (str) {
    if (typeof str !== 'string' || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  // {{eq a b}} → boolean equality check
  Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });

  // {{includes arr val}} → check if array contains value
  Handlebars.registerHelper('includes', function (arr, val) {
    return Array.isArray(arr) && arr.includes(val);
  });

  // {{json obj}} → JSON.stringify with indent
  Handlebars.registerHelper('json', function (obj, indent) {
    return new Handlebars.SafeString(JSON.stringify(obj, null, typeof indent === 'number' ? indent : 2));
  });

  // {{devCmd pm}} → "npm run dev" vs "pnpm dev" vs "bun dev"
  Handlebars.registerHelper('devCmd', function (pm) {
    return pm === 'npm' ? 'npm run dev' : `${pm} dev`;
  });

  // {{installCmd pm}} → "npm install" vs "pnpm install" vs "bun install"
  Handlebars.registerHelper('installCmd', function (pm) {
    return `${pm} install`;
  });

  // {{and a b}} → logical AND (for sub-expressions)
  Handlebars.registerHelper('and', function (a, b) {
    return a && b;
  });

  // {{or a b}} → logical OR
  Handlebars.registerHelper('or', function (a, b) {
    return a || b;
  });

  // {{not a}} → logical NOT
  Handlebars.registerHelper('not', function (a) {
    return !a;
  });
}

// Register helpers on module load
registerHelpers();

// ─── Template Cache ─────────────────────────────────────────────────

const templateCache = new Map();

/**
 * Renders a single Handlebars template file with the given context.
 * @param {string} templatePath - Relative path from templates/ dir (e.g., 'base/src/App.jsx.hbs')
 * @param {object} context - Template variables
 * @returns {string} Rendered content
 */
export function renderTemplate(templatePath, context) {
  if (templateCache.has(templatePath)) {
    return templateCache.get(templatePath)(context);
  }

  // Try precompiled version first
  const compiledPath = path.join(COMPILED_DIR, templatePath.replace(/\.hbs$/, '.js'));
  if (fs.existsSync(compiledPath)) {
    // Precompiled templates are Handlebars template spec functions
    const specSource = fs.readFileSync(compiledPath, 'utf-8');
    // eslint-disable-next-line no-new-func
    const spec = new Function('return ' + specSource)();
    const template = Handlebars.template(spec);
    templateCache.set(templatePath, template);
    return template(context);
  }

  // Fallback to runtime compilation from .hbs file
  const hbsPath = path.join(TEMPLATES_DIR, templatePath);
  if (!fs.existsSync(hbsPath)) {
    throw new Error(`Template not found: ${templatePath} (looked in ${hbsPath})`);
  }

  const source = fs.readFileSync(hbsPath, 'utf-8');
  const template = Handlebars.compile(source, { noEscape: true });
  templateCache.set(templatePath, template);
  return template(context);
}

/**
 * Resolves and renders all templates for a project based on the config.
 * Returns a Map of { outputPath → renderedContent }.
 * @param {object} config - Project configuration
 * @returns {Map<string, string>}
 */
export function renderAllTemplates(config) {
  const files = new Map();
  const ctx = buildTemplateContext(config);

  // ── Base templates (always included) ──
  const ext = ctx.typescript ? 'tsx' : 'jsx';
  const extJS = ctx.typescript ? 'ts' : 'js';

  files.set('package.json', renderTemplate('base/package.json.hbs', ctx));
  files.set('index.html', renderTemplate('base/index.html.hbs', ctx));
  files.set(`src/main.${ext}`, renderTemplate(`base/src/main.${ext}.hbs`, ctx));
  files.set(`src/App.${ext}`, renderTemplate(`base/src/App.${ext}.hbs`, ctx));
  files.set('src/index.css', renderTemplate('base/src/index.css.hbs', ctx));
  files.set(`src/components/AprilFish.${ext}`, renderTemplate(`base/src/components/AprilFish.${ext}.hbs`, ctx));
  files.set('README.md', renderTemplate('base/README.md.hbs', ctx));
  files.set('.gitignore', renderTemplate('base/.gitignore.hbs', ctx));
  files.set('.ai-stack-instructions.md', renderTemplate('base/.ai-stack-instructions.md.hbs', ctx));
  files.set('public/site.webmanifest', renderTemplate('base/public/site.webmanifest.hbs', ctx));

  // Static files (no template needed)
  files.set('public/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚀</text></svg>');

  // Vite config
  if (ctx.typescript) {
    files.set('vite.config.ts', renderTemplate('typescript/vite.config.ts.hbs', ctx));
  } else {
    files.set('vite.config.js', renderTemplate('base/vite.config.js.hbs', ctx));
  }

  // ── Backend templates ──
  if (ctx.backend === 'firebase') {
    files.set(`src/lib/firebase.config.${extJS}`, renderTemplate(`firebase/src/lib/firebase.config.${extJS}.hbs`, ctx));
    files.set('.env.example', renderTemplate('firebase/.env.example.hbs', ctx));
  } else {
    files.set(`src/lib/supabase.config.${extJS}`, renderTemplate(`supabase/src/lib/supabase.config.${extJS}.hbs`, ctx));
    files.set('.env.example', renderTemplate('supabase/.env.example.hbs', ctx));
  }

  // ── TypeScript config ──
  if (ctx.typescript) {
    files.set('tsconfig.json', renderTemplate('typescript/tsconfig.json.hbs', ctx));
    files.set('tsconfig.node.json', renderTemplate('typescript/tsconfig.node.json.hbs', ctx));
  }

  // ── Feature templates ──
  if (ctx.features.includes('router')) {
    files.set(`src/pages/Home.${ext}`, renderTemplate(`features/router/src/pages/Home.${ext}.hbs`, ctx));
    // Override App with router version
    files.set(`src/App.${ext}`, renderTemplate(`features/router/src/App.router.${ext}.hbs`, ctx));
  }

  if (ctx.features.includes('zustand')) {
    files.set(`src/stores/useAppStore.${extJS}`, renderTemplate(`features/zustand/src/stores/useAppStore.${extJS}.hbs`, ctx));
  }

  if (ctx.features.includes('eslint')) {
    files.set('eslint.config.js', renderTemplate('features/eslint/eslint.config.js.hbs', ctx));
    files.set('.prettierrc', renderTemplate('features/eslint/.prettierrc.hbs', ctx));
  }

  if (ctx.features.includes('vitest')) {
    const vitestExt = ctx.typescript ? 'ts' : 'js';
    files.set(`vitest.config.${vitestExt}`, renderTemplate(`features/vitest/vitest.config.${vitestExt}.hbs`, ctx));
    files.set(`src/test/setup.${vitestExt}`, renderTemplate(`features/vitest/src/test/setup.${vitestExt}.hbs`, ctx));
    files.set(`src/App.test.${ext}`, renderTemplate(`features/vitest/src/App.test.${ext}.hbs`, ctx));
  }

  if (ctx.features.includes('auth')) {
    files.set(`src/features/auth/AuthContext.${ext}`, renderTemplate(`features/auth/src/features/auth/AuthContext.${ext}.hbs`, ctx));
    files.set(`src/features/auth/components/LoginForm.${ext}`, renderTemplate(`features/auth/src/features/auth/components/LoginForm.${ext}.hbs`, ctx));
    files.set(`src/features/auth/hooks/useAuth.${extJS}`, renderTemplate(`features/auth/src/features/auth/hooks/useAuth.${extJS}.hbs`, ctx));
  }

  if (ctx.features.includes('shadcn')) {
    files.set('components.json', renderTemplate('features/shadcn/components.json.hbs', ctx));
  }

  return files;
}

/**
 * Builds the full template context from user configuration.
 */
function buildTemplateContext(config) {
  return {
    projectName: config.projectName,
    packageName: config.packageName || config.projectName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, ''),
    pm: config.pm || 'npm',
    backend: config.backend || 'firebase',
    typescript: config.typescript || false,
    features: config.features || [],
    // Computed helpers for templates
    backendCapitalized: (config.backend || 'firebase').charAt(0).toUpperCase() + (config.backend || 'firebase').slice(1),
    backendDocsUrl: config.backend === 'supabase' ? 'https://supabase.com/docs' : 'https://firebase.google.com/docs',
    devCmd: (config.pm || 'npm') === 'npm' ? 'npm run dev' : `${config.pm || 'npm'} dev`,
    installCmd: `${config.pm || 'npm'} install`,
    hasRouter: (config.features || []).includes('router'),
    hasZustand: (config.features || []).includes('zustand'),
    hasEslint: (config.features || []).includes('eslint'),
    hasVitest: (config.features || []).includes('vitest'),
    hasAuth: (config.features || []).includes('auth'),
    hasShadcn: (config.features || []).includes('shadcn'),
  };
}

export { TEMPLATES_DIR, COMPILED_DIR, Handlebars };
