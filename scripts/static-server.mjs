import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname } from 'node:path'

export async function startServer(port = 0) {
  const root = resolve('dist')
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' }
  const server = http.createServer(async (req, res) => {
    try {
      let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
      if (!file.startsWith(root + '/') && file !== root) { res.writeHead(403); res.end(); return }
      let status = 200
      try {
        if ((await stat(file)).isDirectory()) file += '/index.html'
        await stat(file)
      } catch { file = root + '/404.html'; status = 404 }
      const data = await readFile(file)
      const headers = { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Accept-Ranges': 'bytes' }
      if (req.headers.range && status === 200) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range)
        const start = match?.[1] ? Number(match[1]) : Math.max(0, data.length - Number(match?.[2]))
        const end = match?.[1] && match[2] ? Math.min(Number(match[2]), data.length - 1) : data.length - 1
        if (!match || (!match[1] && !match[2]) || !Number.isSafeInteger(start) || start > end || start >= data.length) {
          res.writeHead(416, { 'Content-Range': `bytes */${data.length}` }); res.end(); return
        }
        res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${data.length}`, 'Content-Length': end - start + 1 })
        res.end(req.method === 'HEAD' ? undefined : data.subarray(start, end + 1)); return
      }
      res.writeHead(status, { ...headers, 'Content-Length': data.length })
      res.end(data)
    } catch { res.writeHead(500); res.end('Server error') }
  })
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolve) })
  return { server, url: `http://127.0.0.1:${server.address().port}` }
}
