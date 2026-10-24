# Amir Rimal portfolio

Next.js, React and JavaScript, with self-hosted Manrope typography and animated SVG illustrations.

## Run

Use Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:4174. For a static preview, run `npm run build` and then `npm run preview`. The build exports to `out/`.

## Add a note

Create a Markdown file in `content/posts/`. Its filename becomes the article URL.

```markdown
---
title: My new note
date: 2026-10-24
description: A short summary of the article.
tags: SwiftUI, iOS, Engineering
draft: false
---

Write your article here.
```

Separate tags with commas. Use `draft: true` to hide a note. Published notes appear automatically in the listing, search, tag filters, RSS feed and sitemap after rebuilding. Markdown is trusted author content and supports HTML.

## Edit portfolio content

- `lib/projects.js`: project summaries and ownership.
- `lib/project-overviews.js`: client-facing project descriptions.
- `lib/project-details.js` and `lib/*-essay.js`: recruiter-facing technical articles.
- `lib/portfolio.js`: homepage content, projects and colour themes.
- `components/ProceduralArt.js`: project SVG illustrations.
- `components/Notes.js`: note listing, search, filters and article layout.
- `app/globals.css`: shared styling.

Project detail artwork animates while visible. Gallery artwork animates on hover. Reduced motion and background visibility are respected. The selected colour scheme is saved locally; a fresh visit without a saved choice starts with a random theme.

## Validation

Run `npm run build` to check and export the site. Run `node scripts/verify-springs.mjs` to check the spring calculations.

## Agent discovery

Public resources are generated from the same project and published-note data:

- `/llms.txt`: concise index with absolute links.
- `/llms-full.txt`: project engineering articles and published notes as text.
- `/agents.md`: navigation, ownership and attribution guidance for readers.
- `/portfolio.json`: structured project and note metadata, including tags.
- `/sitemap.xml` and `/feed.xml`: page and note discovery.

The HTML head advertises the text index and JSON resource. These resources do not add navigation buttons. Rebuild after changing content.

## Public domain

Set `NEXT_PUBLIC_SITE_URL` to your public URL before building for deployment. Canonical links, structured data, sitemap, RSS and agent resources share this setting. Local builds use `http://localhost:4174`.

## GitHub Pages

The `.github/workflows/deploy.yml` workflow builds and publishes pushes to `main` in the `rimalamir.github.io` repository. In GitHub, select **Settings → Pages → Source → GitHub Actions** before the first deployment.

The workflow sets `NEXT_PUBLIC_SITE_URL=https://rimalamir.github.io`. Keep this repository at the domain root; no Next.js base path is needed. When adding a custom domain, update the workflow URL and configure that domain in Pages settings.

Publish a note by committing its Markdown file and pushing to `main`. The workflow rebuilds all public resources and deploys the static `out/` artifact automatically.
