## 2024-05-18 - Map Lookup Optimization
**Learning:** Calling `Map.has()` followed by `Map.get()` performs two sequential hash lookups, creating unnecessary overhead in hot paths like template rendering caches.
**Action:** Use a single `Map.get()` call and check for `undefined` instead to halve the lookup cost.
