# GRE Math Trainer — Full Edition

Part of the **Theorem** product line (shared π-mark brand with GRE Math Trainer — AI Edition,
in the sibling `Lemma-app-ai` repo, org `Lemma-app`). Single-file PWA, no build step.

- **Live file:** `gre_original_v2.html` (also served via `index.html` redirect for GitHub Pages)
- **Dev codename convention:** mathematicians, alphabetical. This build: **Abel**.
- **Persisted localStorage key (never rename):** `gre_orig_v1`
- **PWA assets:** `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`

## Deploy checklist
- [ ] Bump `CACHE_VERSION` in `sw.js` in the **same commit** as any other change.
- [ ] Never rename `gre_orig_v1` in localStorage — it holds Drill and GRE tab score/streak/
      accuracy history plus the fun-fact rotation timestamp.
- [ ] Test the Drill and GRE session loops still stop exactly at the chosen count (5–50) and
      show the summary screen before shipping.

Table, Numbers, Geometry, and Tips tabs are static reference panels — no session concept
applies to them, only a rotating fun-fact banner.
