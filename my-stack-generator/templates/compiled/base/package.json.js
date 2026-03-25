{"1":function(container,depth0,helpers,partials,data) {
    return ",\n    \"test\": \"vitest\",\n    \"test:ui\": \"vitest --ui\"";
},"3":function(container,depth0,helpers,partials,data) {
    return ",\n    \"lint\": \"eslint .\",\n    \"format\": \"prettier --write .\"";
},"5":function(container,depth0,helpers,partials,data) {
    return ",\n    \"firebase\": \"^12.8.0\"";
},"7":function(container,depth0,helpers,partials,data) {
    return ",\n    \"@supabase/supabase-js\": \"^2.48.1\"";
},"9":function(container,depth0,helpers,partials,data) {
    return ",\n    \"react-router-dom\": \"^7.0.0\"";
},"11":function(container,depth0,helpers,partials,data) {
    return ",\n    \"zustand\": \"^5.0.0\"";
},"13":function(container,depth0,helpers,partials,data) {
    return ",\n    \"typescript\": \"^5.7.0\",\n    \"@types/react\": \"^19.0.0\",\n    \"@types/react-dom\": \"^19.0.0\"";
},"15":function(container,depth0,helpers,partials,data) {
    return ",\n    \"vitest\": \"^3.0.0\",\n    \"@testing-library/react\": \"^16.0.0\",\n    \"@testing-library/jest-dom\": \"^6.0.0\",\n    \"jsdom\": \"^25.0.0\"";
},"17":function(container,depth0,helpers,partials,data) {
    return ",\n    \"eslint\": \"^9.0.0\",\n    \"@eslint/js\": \"^9.0.0\",\n    \"eslint-plugin-react\": \"^7.37.0\",\n    \"eslint-plugin-react-hooks\": \"^5.0.0\",\n    \"globals\": \"^15.0.0\",\n    \"prettier\": \"^3.4.0\"";
},"19":function(container,depth0,helpers,partials,data) {
    return ",\n    \"typescript-eslint\": \"^8.0.0\"";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "{\n  \"name\": \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"packageName") || (depth0 != null ? lookupProperty(depth0,"packageName") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"packageName","hash":{},"data":data,"loc":{"start":{"line":2,"column":11},"end":{"line":2,"column":26}}}) : helper))) != null ? stack1 : "")
    + "\",\n  \"private\": true,\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"engines\": { \"node\": \">=18.0.0\" },\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"preview\": \"vite preview\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasVitest") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":29},"end":{"line":12,"column":35}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasEslint") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":35},"end":{"line":14,"column":41}}})) != null ? stack1 : "")
    + "\n  },\n  \"dependencies\": {\n    \"react\": \"^19.0.0\",\n    \"react-dom\": \"^19.0.0\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"eq")||(depth0 && lookupProperty(depth0,"eq"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"backend") : depth0),"firebase",{"name":"eq","hash":{},"data":data,"loc":{"start":{"line":18,"column":32},"end":{"line":18,"column":55}}}),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":18,"column":26},"end":{"line":20,"column":45}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasRouter") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":45},"end":{"line":21,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasZustand") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":39},"end":{"line":22,"column":30}}})) != null ? stack1 : "")
    + "\n  },\n  \"devDependencies\": {\n    \"vite\": \"^6.0.0\",\n    \"@vitejs/plugin-react\": \"^5.0.0\",\n    \"tailwindcss\": \"^4.0.0\",\n    \"@tailwindcss/vite\": \"^4.0.0\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":33},"end":{"line":31,"column":40}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasVitest") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":40},"end":{"line":35,"column":29}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasEslint") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":29},"end":{"line":41,"column":31}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"and")||(depth0 && lookupProperty(depth0,"and"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"hasEslint") : depth0),(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"and","hash":{},"data":data,"loc":{"start":{"line":41,"column":37},"end":{"line":41,"column":63}}}),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":31},"end":{"line":42,"column":40}}})) != null ? stack1 : "")
    + "\n  }\n}\n";
},"useData":true}