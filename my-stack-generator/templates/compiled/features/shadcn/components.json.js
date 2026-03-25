{"1":function(container,depth0,helpers,partials,data) {
    return "true";
},"3":function(container,depth0,helpers,partials,data) {
    return "false";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "{\n  \"$schema\": \"https://ui.shadcn.com/schema.json\",\n  \"style\": \"default\",\n  \"rsc\": false,\n  \"tsx\": "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":5,"column":9},"end":{"line":5,"column":51}}})) != null ? stack1 : "")
    + ",\n  \"tailwind\": {\n    \"config\": \"\",\n    \"css\": \"src/index.css\",\n    \"baseColor\": \"slate\",\n    \"cssVariables\": true\n  },\n  \"aliases\": {\n    \"components\": \"@/components\",\n    \"utils\": \"@/lib/utils\"\n  }\n}\n";
},"useData":true}