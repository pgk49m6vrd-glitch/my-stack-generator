## 2024-05-24 - Navigation Link Active State Accessibility
**Learning:** Relying solely on text color or font weight changes for `<NavLink>` active states fails WCAG 1.4.1 (Use of Color). Users with certain color vision deficiencies may not perceive the difference between `text-white` and `text-slate-300`.
**Action:** Always provide a structural or layout change—such as a background pill, border, or underline—to explicitly distinguish active navigation links, in addition to color contrast changes.
