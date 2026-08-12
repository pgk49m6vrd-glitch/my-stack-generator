module.exports = {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "import React from 'react';\nimport { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\nimport Home from './pages/Home';\n\nfunction App(): React.JSX.Element {\n  return (\n    <BrowserRouter>\n      <a href=\"#main-content\" className=\"sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-slate-800 focus:text-white focus:ring-2 focus:ring-blue-400 font-medium rounded-br-lg\">\n        Skip to main content\n      </a>\n      <nav className=\"bg-slate-800 border-b border-slate-700 px-6 py-3\">\n        <div className=\"max-w-7xl mx-auto flex items-center justify-between\">\n          <Link to=\"/\" className=\"text-xl font-bold text-white hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded\">\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":14,"column":12},"end":{"line":14,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\n          </Link>\n          <div className=\"flex gap-4\">\n            <Link to=\"/\" className=\"text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded px-2 py-1\">Home</Link>\n          </div>\n        </div>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nexport default App;\n";
},"useData":true}