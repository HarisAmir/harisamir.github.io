import sharp from 'sharp'
import { mkdir, copyFile, readdir } from 'node:fs/promises'

await mkdir('public/profile', { recursive: true })
await mkdir('public/publications', { recursive: true })
for (const width of [1200, 2400]) {
  await sharp('assets-src/publications/recontext3d.png').resize({ width }).webp({ quality: 92 }).toFile(`public/publications/recontext3d-${width}.webp`)
}
// Preserve the full supplied photograph without cropping.
for (const width of [640, 1280]) {
  await sharp('photo4.jpeg').rotate()
    .resize({ width }).webp({ quality: 84 }).toFile(`public/profile/portrait-${width}.webp`)
}
await mkdir('public/projects', { recursive: true })
for (const file of await readdir('assets-src/projects')) {
  if (file.endsWith('.png')) {
    await sharp(`assets-src/projects/${file}`).resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 92 }).toFile(`public/projects/${file.replace(/\.png$/, '.webp')}`)
  } else if (file.endsWith('.mp4')) {
    await copyFile(`assets-src/projects/${file}`, `public/projects/${file}`)
  }
}
await sharp('assets-src/point-cloud.png').resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 90 }).toFile('public/projects/point-cloud-office.webp')
console.log('Generated portraits, publication/project figures, and comparison videos. PDFs are served from public/documents/.')
