{"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "import { render, screen } from '@testing-library/react';\nimport { describe, it, expect } from 'vitest';\nimport App from './App';\n\ndescribe('App', () => {\n  it('renders the project name', () => {\n    render(<App />);\n    expect(screen.getByText(/"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":8,"column":29},"end":{"line":8,"column":44}}}) : helper))) != null ? stack1 : "")
    + "/i)).toBeInTheDocument();\n  });\n\n  it('renders the stack description', () => {\n    render(<App />);\n    expect(screen.getByText(/Stack operational/i)).toBeInTheDocument();\n  });\n});\n";
},"useData":true}