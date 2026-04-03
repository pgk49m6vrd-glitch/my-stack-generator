{"0":function(container,depth0,helpers,partials,data) {
    return "import tseslint from 'typescript-eslint';\n";
},"1":function(container,depth0,helpers,partials,data) {
    return "const fileGlob = '**/*.{js,jsx,ts,tsx}';\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "const fileGlob = '**/*.{js,jsx}';\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "  ...tseslint.configs.recommended,\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "import js from '@eslint/js';\nimport globals from 'globals';\nimport reactPlugin from 'eslint-plugin-react';\nimport reactHooksPlugin from 'eslint-plugin-react-hooks';\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":0},"end":{"line":7,"column":7}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(2, data, 0),"data":data,"loc":{"start":{"line":9,"column":0},"end":{"line":13,"column":7}}})) != null ? stack1 : "")
    + "\nexport default [\n  { ignores: ['dist'] },\n  js.configs.recommended,\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":0},"end":{"line":20,"column":7}}})) != null ? stack1 : "")
    + "  {\n    files: [fileGlob],\n    languageOptions: {\n      ecmaVersion: 2024,\n      globals: {\n        ...globals.browser,\n      },\n      parserOptions: {\n        ecmaFeatures: { jsx: true },\n      },\n    },\n    plugins: {\n      'react': reactPlugin,\n      'react-hooks': reactHooksPlugin,\n    },\n    rules: {\n      ...reactPlugin.configs.recommended.rules,\n      ...reactHooksPlugin.configs.recommended.rules,\n      'react/react-in-jsx-scope': 'off',\n      'react/prop-types': 'off',\n    },\n    settings: {\n      react: { version: 'detect' },\n    },\n  },\n];\n";
},"useData":true}