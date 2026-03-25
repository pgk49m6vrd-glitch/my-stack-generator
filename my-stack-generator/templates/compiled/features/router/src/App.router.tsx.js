{"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "import React from 'react';\nimport { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\nimport Home from './pages/Home';\n\nfunction App(): React.JSX.Element {\n  return (\n    <BrowserRouter>\n      <nav className=\"bg-slate-800 border-b border-slate-700 px-6 py-3\">\n        <div className=\"max-w-7xl mx-auto flex items-center justify-between\">\n          <Link to=\"/\" className=\"text-xl font-bold text-white hover:text-blue-400 transition-colors\">\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":11,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\n          </Link>\n          <div className=\"flex gap-4\">\n            <Link to=\"/\" className=\"text-slate-300 hover:text-white transition-colors\">Home</Link>\n          </div>\n        </div>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nexport default App;\n";
},"useData":true}