module.exports = {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nimport tailwindcss from '@tailwindcss/vite'\n\nexport default defineConfig(({ command }) => ({\n  plugins: [\n    react(),\n    tailwindcss(),\n  ],\n}))\n";
},"useData":true};