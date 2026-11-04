import { readdir, readFile } from 'node:fs/promises'

async function htmlFiles(dir) {
  const files = []
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${item.name}`
    if (item.isDirectory()) files.push(...await htmlFiles(path))
    else if (item.name.endsWith('.html')) files.push(path)
  }
  return files
}
const urls = new Set()
for (const path of await htmlFiles('dist')) {
  const html = await readFile(path, 'utf8')
  for (const match of html.matchAll(/<a\b[^>]*\bhref="(https?:[^\"]+)"/g)) urls.add(match[1].replaceAll('&amp;', '&'))
}
let failed = false
for (const url of urls) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'HarisPortfolioLinkCheck/1.0' } })
    const blocked = [401, 403, 429, 999].includes(response.status)
    console.log(`${response.ok ? 'OK' : blocked ? 'MANUAL CHECK (automated access blocked)' : 'FAIL'} ${response.status} ${url}`)
    if (!response.ok && !blocked) failed = true
    await response.body?.cancel()
  } catch (error) { console.log(`UNVERIFIED ${url}: ${error.message}`); failed = true }
}
if (failed) process.exitCode = 1
