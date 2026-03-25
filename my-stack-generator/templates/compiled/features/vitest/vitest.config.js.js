{"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "import { defineConfig } from 'vitest/config';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  test: {\n    globals: true,\n    environment: 'jsdom',\n    setupFiles: './src/test/setup.js',\n    css: true,\n  },\n});\n";
},"useData":true}