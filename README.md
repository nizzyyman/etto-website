# Etto Website

Production currently serves the Vite app in `etto-site/`.

Repo-root scripts now delegate to that app:

- `npm run dev` runs `etto-site`
- `npm run build` runs `etto-site`
- `npm run legacy:dev` runs the old root static site
- `npm run legacy:build` builds the old root static site

For the writing page:

- Route: `/writing/`
- Production component: `etto-site/src/components/site/WritingPage.tsx`
- Source-of-truth article copy: `etto-site/src/content/writingArticle.ts`

The root-level static files such as `writing/index.html` are legacy and are not the source of truth for `www.etto.ai`.
