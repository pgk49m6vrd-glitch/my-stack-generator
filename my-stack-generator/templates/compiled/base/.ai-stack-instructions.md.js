{"0":function(container,depth0,helpers,partials,data) {
    return "- Language: TypeScript";
},"1":function(container,depth0,helpers,partials,data) {
    return "- Routing: React Router";
},"2":function(container,depth0,helpers,partials,data) {
    return "- State: Zustand";
},"3":function(container,depth0,helpers,partials,data) {
    return "- Linting: ESLint + Prettier";
},"4":function(container,depth0,helpers,partials,data) {
    return "- Testing: Vitest";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "# Technical Stack\n\n- React + Vite\n- Tailwind V4\n- "
    + ((stack1 = (lookupProperty(helpers,"capitalizeFirst")||(depth0 && lookupProperty(depth0,"capitalizeFirst"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"backend") : depth0),{"name":"capitalizeFirst","hash":{},"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":5,"column":29}}})) != null ? stack1 : "")
    + "\n- Package Manager: "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"pm") || (depth0 != null ? lookupProperty(depth0,"pm") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"pm","hash":{},"data":data,"loc":{"start":{"line":6,"column":19},"end":{"line":6,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":0},"end":{"line":7,"column":47}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasRouter") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":0},"end":{"line":8,"column":47}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasZustand") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":0},"end":{"line":9,"column":41}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasEslint") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":0},"end":{"line":10,"column":52}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasVitest") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":0},"end":{"line":11,"column":41}}})) != null ? stack1 : "")
    + "\n";
},"useData":true}