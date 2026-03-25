{"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "import React from 'react';\n\nfunction Home(): React.JSX.Element {\n  return (\n    <div className=\"min-h-screen bg-slate-900 flex items-center justify-center\">\n      <div className=\"text-center\">\n        <h1 className=\"text-4xl font-bold text-white mb-4\">Home</h1>\n        <p className=\"text-slate-400\">Welcome to "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":8,"column":49},"end":{"line":8,"column":64}}}) : helper))) != null ? stack1 : "")
    + "</p>\n      </div>\n    </div>\n  );\n}\n\nexport default Home;\n";
},"useData":true}