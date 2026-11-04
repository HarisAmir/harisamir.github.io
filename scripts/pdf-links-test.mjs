import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'vite'

// Exercise the actual linked URLs against Vite too: a missing PDF can otherwise
// return the SPA's HTML with status 200, which does not open as a document.
const links = new Set()
for (const file of ['dist/index.html', 'dist/projects/index.html']) {
  const html = await readFile(file, 'utf8')
  for (const match of html.matchAll(/href="([^"#?]+\.pdf)"/g)) links.add(match[1])
}
assert.equal(links.size, 3, 'Both project reports and the résumé are linked')
const server = await createServer({
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { host: '127.0.0.1', port: 0 },
})
try {
  await server.listen()
  const address = server.httpServer.address()
  for (const path of links) {
    const response = await fetch(`http://127.0.0.1:${address.port}${path}`)
    assert.equal(response.status, 200, path)
    assert.match(response.headers.get('content-type') || '', /^application\/pdf\b/, path)
    const body = Buffer.from(await response.arrayBuffer())
    assert.equal(body.subarray(0, 5).toString(), '%PDF-', path)
    assert.deepEqual(body, await readFile(`public${path}`), `Serves the complete document: ${path}`)
  }
  console.log('PASS: both project reports and résumé open as complete PDF documents in the development server.')
} finally {
  await server.close()
}
