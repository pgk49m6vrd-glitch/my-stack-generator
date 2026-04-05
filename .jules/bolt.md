## 2024-05-01 - Split-Brain Handlebars Engine

**Learning:** When trying to optimize CLI startup time by lazily loading the full `handlebars` compiler and eagerly loading only `handlebars/runtime.js`, be aware that the runtime and full compiler are completely separate instances. Therefore, when compiling or executing templates dynamically, the compiler instance lacks access to helpers or partials registered on the runtime instance.

**Action:** Always explicitly pass context extensions, like `{ helpers: Handlebars.helpers, partials: Handlebars.partials }`, when executing templates, bridging the divide between precompiled cache objects (running on the runtime) and JIT-compiled objects (running on the compiler instance).
