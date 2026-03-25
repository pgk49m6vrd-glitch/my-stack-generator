{"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "{\n  \"name\": \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":2,"column":11},"end":{"line":2,"column":26}}}) : helper))) != null ? stack1 : "")
    + "\",\n  \"short_name\": \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":3,"column":17},"end":{"line":3,"column":32}}}) : helper))) != null ? stack1 : "")
    + "\",\n  \"start_url\": \"/\",\n  \"display\": \"standalone\",\n  \"background_color\": \"#0f172a\",\n  \"theme_color\": \"#0f172a\",\n  \"icons\": [\n    {\n      \"src\": \"/favicon.svg\",\n      \"sizes\": \"any\",\n      \"type\": \"image/svg+xml\"\n    },\n    {\n      \"src\": \"/favicon.svg\",\n      \"sizes\": \"192x192\",\n      \"type\": \"image/svg+xml\",\n      \"purpose\": \"any maskable\"\n    },\n    {\n      \"src\": \"/favicon.svg\",\n      \"sizes\": \"512x512\",\n      \"type\": \"image/svg+xml\",\n      \"purpose\": \"any maskable\"\n    }\n  ]\n}\n";
},"useData":true}