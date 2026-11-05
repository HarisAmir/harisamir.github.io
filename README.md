# Haris Amir — Portfolio

Vue 3, Vite, Vue Router, TypeScript, and responsive CSS. About, Projects, Publications, and Contact are prerendered to static HTML for GitHub Pages. All fonts and media are hosted locally. No API keys are needed.

## Local development

Use Node.js 22.12 or newer. The project and GitHub Actions use Node 22.

```sh
npm ci
npm run dev
```

For a production preview:

```sh
npm run build
npm run preview
```

`npm run build` type-checks the app, prepares responsive images and includes the PDFs from `public/documents/`, builds the browser bundle, and prerenders the pages, sitemap, robots.txt, and 404 page into `dist/`.

## Update the site

| File or folder | Content |
| --- | --- |
| `src/data/profile.ts` | Introduction, focus text, contact details, affiliations, skills |
| `src/data/projects.ts` | Project titles, tags, descriptions, results, media, resource links |
| `src/data/publications.ts` | Publications, authors, figures, links, and BibTeX |
| `src/data/pages.ts` | Navigation, page descriptions, homepage index, SEO metadata |
| `src/pages/` | Page headings and structure |
| `src/style.css` | Typography, colors, layout, and motion |
| `photo4.jpeg` | Original full portrait, displayed without background blur or cropping |
| `assets-src/projects/` | Project figures, video posters, prepared MP4s |
| `assets-src/publications/` | Publication figure |
| `assets-src/point-cloud.png` | Office reconstruction figure |
| `public/affiliations/` | The three active affiliation logos |
| `public/documents/Haris_Amir_cv_web.pdf` | Downloadable résumé |
| `public/documents/german-french-translation.pdf` | Translation project report |
| `public/documents/continual-event-detection.pdf` | Event-detection project report |

The three active PDFs live only in `public/documents/` and are tracked in Git. Replace those files to update the documents; Vite serves them directly during development and copies them into `dist/documents/` for deployment. Do not delete this folder. Media builds prepare the responsive photos, project/publication figures, and comparison videos from their source assets. Dependencies and generated media are ignored by Git and remain available locally.

The DLS3D manuscript is not part of the project or deployment. Its paper and code remain “Coming soon”. The paired videos play at their original speed; DLS3D holds its final frame until the baseline ends, then both restart together.

## Checks

```sh
npm run build
npx playwright install chromium
npm test
```

On macOS, an installed Chrome can be used instead of downloading Chromium:

```sh
CHROME_EXECUTABLE="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm test
```

The browser tests cover routes, desktop/mobile widths, local links, image loading, keyboard access, galleries, citations, paired video playback, scrolling, page transitions, flat backgrounds, the animated location globe, and reduced motion. Test screenshots go into the ignored `artifacts/` folder.

`npm run check:links` checks external links and needs network access. Some services block automated requests; inspect those links in a browser if reported as blocked.

## Publish to GitHub Pages

The workflow is already configured in [`.github/workflows/pages.yml`](.github/workflows/pages.yml). It builds and tests the source, then deploys successful `main` pushes. GitHub's built-in token handles deployment; no deployment secrets are required.

1. Sign into **HarisAmir** and create a **public**, empty repository named **harisamir.github.io** at <https://github.com/new>. Leave README, .gitignore, and license initialization off. If that repository already exists, use it rather than creating another; these initial-push commands assume it is empty.
2. In Terminal, run:

   ```sh
   cd "/Users/harisamir/Desktop/Work/website"
   git init -b main
   git add .
   git commit -m "Publish portfolio website"
   git remote add origin https://github.com/HarisAmir/harisamir.github.io.git
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages → Build and deployment**. Set **Source** to **GitHub Actions**.
4. Open **Actions → Build and deploy portfolio → Run workflow**, choose **main**, and run it. This also works if the first automatic deployment ran before Pages was enabled.
5. Once both jobs are green, visit **https://harisamir.github.io/**. GitHub may take a few minutes to finish publishing.

Publish future edits with:

```sh
git add .
git commit -m "Update portfolio"
git push
```

Every successful push to `main` publishes automatically. Upload the source project, including `.github/` and `assets-src/`; the workflow creates and uploads `dist/` for you. The Vite base `/` and `profile.url` are configured for this user-site repository.

Official guidance: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [custom GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The navbar theme switch follows the device’s light/dark setting on a first visit. A manual choice is saved in local storage and restored on future visits. Both palettes also support reduced motion.
