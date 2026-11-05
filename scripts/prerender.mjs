import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { render, pages, profile } from '../.ssr/entry-server.js'

const template = await readFile('dist/index.html', 'utf8')
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const routes = [...pages.map(p => ({ path: p.path, title: `${p.title} — ${profile.name}`, description: p.description })),
  { path: '/404.html', title: `Page not found — ${profile.name}`, description: 'This page could not be found.' }]

for (const route of routes) {
  const url = profile.url + route.path
  const meta = `<title>${escape(route.title)}</title>
    <meta name="description" content="${escape(route.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escape(route.title)}" />
    <meta property="og:description" content="${escape(route.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${profile.url}/profile/portrait-1280.webp" />
    <meta property="og:image:alt" content="Haris Amir in front of a glass and brick building" />
    <meta name="twitter:card" content="summary_large_image" />
    ${route.path === '/404.html' ? '<meta name="robots" content="noindex" />' : ''}
    ${route.path === '/' ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: profile.url, jobTitle: profile.role, image: profile.url + '/profile/portrait-1280.webp', sameAs: [profile.github, profile.linkedin, profile.scholar] }).replace(/</g, '\\u003c')}</script>` : ''}`
  const html = template.replace('<!--page-meta-->', meta).replace('<!--app-html-->', await render(route.path))
  const file = route.path === '/404.html' ? 'dist/404.html' : `dist${route.path}index.html`
  await mkdir(file.slice(0, file.lastIndexOf('/')), { recursive: true })
  await writeFile(file, html)
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(r => r.path !== '/404.html').map(r => `<url><loc>${profile.url}${r.path}</loc></url>`).join('')}</urlset>`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${profile.url}/sitemap.xml\n`)
await writeFile('dist/.nojekyll', '')
console.log(`Prerendered ${routes.length} pages, sitemap, and robots.txt.`)
