{"1":function(container,depth0,helpers,partials,data) {
    return "tsx";
},"3":function(container,depth0,helpers,partials,data) {
    return "jsx";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https: ws: wss:; object-src 'none'; base-uri 'self'; form-action 'none';\">\n  <meta name=\"referrer\" content=\"strict-origin-when-cross-origin\" />\n  <link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\" />\n  <link rel=\"manifest\" href=\"/site.webmanifest\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta name=\"description\" content=\"Modern web application built with "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":10,"column":70},"end":{"line":10,"column":85}}}) : helper))) != null ? stack1 : "")
    + "\" />\n  <meta name=\"theme-color\" content=\"#0f172a\" />\n  <link rel=\"apple-touch-icon\" href=\"/favicon.svg\" />\n\n  <!-- Open Graph / Facebook -->\n  <meta property=\"og:type\" content=\"website\" />\n  <meta property=\"og:title\" content=\""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":16,"column":37},"end":{"line":16,"column":52}}}) : helper))) != null ? stack1 : "")
    + "\" />\n  <meta property=\"og:description\" content=\"Built with React, Tailwind v4 and "
    + ((stack1 = (lookupProperty(helpers,"capitalizeFirst")||(depth0 && lookupProperty(depth0,"capitalizeFirst"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"backend") : depth0),{"name":"capitalizeFirst","hash":{},"data":data,"loc":{"start":{"line":17,"column":77},"end":{"line":17,"column":104}}})) != null ? stack1 : "")
    + "\" />\n\n  <title>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"projectName") || (depth0 != null ? lookupProperty(depth0,"projectName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data,"loc":{"start":{"line":19,"column":9},"end":{"line":19,"column":24}}}) : helper))) != null ? stack1 : "")
    + "</title>\n</head>\n<body class=\"bg-slate-900\">\n  <noscript>\n    <div class=\"fixed inset-0 z-50 flex items-center justify-center bg-slate-900 text-slate-200 p-6 text-center\">\n      <div class=\"max-w-md\">\n        <h1 class=\"text-3xl font-bold mb-4\">JavaScript Required</h1>\n        <p class=\"text-lg opacity-90\">\n          This application requires JavaScript to function. Please enable it to continue.\n        </p>\n      </div>\n    </div>\n  </noscript>\n  <div id=\"root\"></div>\n  <script type=\"module\" src=\"/src/main."
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"typescript") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":33,"column":39},"end":{"line":33,"column":78}}})) != null ? stack1 : "")
    + "\"></script>\n</body>\n</html>\n";
},"useData":true}