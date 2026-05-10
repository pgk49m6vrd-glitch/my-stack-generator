{"0":function(container,depth0,helpers,partials,data) {
    return "import { getFirebaseAuth } from '../../lib/firebase.config';\nimport { onAuthStateChanged, signOut, type User } from 'firebase/auth';\n";
},"1":function(container,depth0,helpers,partials,data) {
    return "import { getSupabase } from '../../lib/supabase.config';\nimport type { User } from '@supabase/supabase-js';\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "    const auth = getFirebaseAuth();\n    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {\n      setUser(firebaseUser);\n      setLoading(false);\n    });\n    return () => unsubscribe();\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    const supabase = getSupabase();\n    supabase.auth.getSession().then(({ data: { session } }) => {\n      setUser(session?.user ?? null);\n      setLoading(false);\n    });\n    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {\n      setUser(session?.user ?? null);\n    });\n    return () => subscription.unsubscribe();\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    const auth = getFirebaseAuth();\n    await signOut(auth);\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "    const supabase = getSupabase();\n    await supabase.auth.signOut();\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"eq")||(depth0 && lookupProperty(depth0,"eq"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"backend") : depth0),"firebase",{"name":"eq","hash":{},"data":data,"loc":{"start":{"line":2,"column":6},"end":{"line":2,"column":29}}}),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.program(1, data, 0),"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":8,"column":7}}})) != null ? stack1 : "")
    + "\ninterface AuthContextType {\n  user: User | null;\n  loading: boolean;\n  logout: () => Promise<void>;\n}\n\nconst AuthContext = createContext<AuthContextType | null>(null);\n\ninterface AuthProviderProps {\n  children: ReactNode;\n}\n\nexport function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {\n  const [user, setUser] = useState<User | null>(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"eq")||(depth0 && lookupProperty(depth0,"eq"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"backend") : depth0),"firebase",{"name":"eq","hash":{},"data":data,"loc":{"start":{"line":27,"column":6},"end":{"line":27,"column":29}}}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":27,"column":0},"end":{"line":44,"column":7}}})) != null ? stack1 : "")
    + "  }, []);\n\n  const logout = async (): Promise<void> => {\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"eq")||(depth0 && lookupProperty(depth0,"eq"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"backend") : depth0),"firebase",{"name":"eq","hash":{},"data":data,"loc":{"start":{"line":48,"column":6},"end":{"line":48,"column":29}}}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":48,"column":0},"end":{"line":54,"column":7}}})) != null ? stack1 : "")
    + "  };\n\n  return (\n    <AuthContext.Provider value={{ user, loading, logout }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nexport function useAuth(): AuthContextType {\n  const context = useContext(AuthContext);\n  if (!context) {\n    throw new Error('useAuth must be used within an AuthProvider');\n  }\n  return context;\n}\n\nexport default AuthContext;\n";
},"useData":true}