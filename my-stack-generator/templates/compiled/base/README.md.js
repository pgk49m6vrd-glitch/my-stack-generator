{"0":function(container,depth0,helpers,partials,data) {
    return "- **Language**: TypeScript";
},"1":function(container,depth0,helpers,partials,data) {
    return "- **Routing**: React Router";
},"2":function(container,depth0,helpers,partials,data) {
    return "- **State**: Zustand";
},"3":function(container,depth0,helpers,partials,data) {
    return "- **Linting**: ESLint + Prettier";
},"4":function(container,depth0,helpers,partials,data) {
    return "- **Testing**: Vitest + Testing Library";
},"5":function(container,depth0,helpers,partials,data) {
    return "- `src/pages/`: Route-level page components.";
},"6":function(container,depth0,helpers,partials,data) {
    return "- `src/stores/`: Zustand state stores.";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "# "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":1,"column":2},"end":{"line":1,"column":17}}}) : helper))) != null ? stack1 : "")
    + "\n\nBuilt with **My Stack Generator**.\n\n## 🚀 Getting Started\n\n1. **Install dependencies**:\n   ```bash\n   "
    + ((stack1 = (lookupProperty(helpers,"installCmd")||(depth0 && lookupProperty(depth0,"installCmd"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"pm") : depth0),{"name":"installCmd","hash":{},"data":data,"loc":{"start":{"line":9,"column":3},"end":{"line":9,"column":20}}})) != null ? stack1 : "")
    + "\n   ```\n\n2. **Start the development server**:\n   ```bash\n   "
    + ((stack1 = (lookupProperty(helpers,"devCmd")||(depth0 && lookupProperty(depth0,"devCmd"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"pm") : depth0),{"name":"devCmd","hash":{},"data":data,"loc":{"start":{"line":14,"column":3},"end":{"line":14,"column":16}}})) != null ? stack1 : "")
    + "\n   ```\n\n## 🛠️ Stack\n\n- **Framework**: React + Vite\n- **Styling**: Tailwind CSS v4\n- **Backend**: "
    + ((stack1 = (lookupProperty(helpers,"capitalizeFirst")||(depth0 && lookupProperty(depth0,"capitalizeFirst"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"backend") : depth0),{"name":"capitalizeFirst","hash":{},"data":data,"loc":{"start":{"line":21,"column":15},"end":{"line":21,"column":42}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":0},"end":{"line":22,"column":51}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasRouter") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":0},"end":{"line":23,"column":51}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasZustand") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":0},"end":{"line":24,"column":45}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasEslint") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":0},"end":{"line":25,"column":56}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasVitest") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":0},"end":{"line":26,"column":63}}})) != null ? stack1 : "")
    + "\n\n## 📂 Project Structure\n\n- `src/features/`: Domain-specific features (components, hooks, services).\n- `src/components/`: Shared UI components.\n- `src/lib/`: Backend configuration.\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasRouter") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":0},"end":{"line":33,"column":68}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasZustand") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":0},"end":{"line":34,"column":63}}})) != null ? stack1 : "")
    + "\n";
},"useData":true}