import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { startServer } from './static-server.mjs'

const { server, url } = await startServer()
let browser
try {
  browser = await chromium.launch({ executablePath: process.env.CHROME_EXECUTABLE || undefined })
  for (const system of ['light', 'dark']) {
    const context = await browser.newContext({ colorScheme: system, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.text().includes('Hydration')) errors.push(message.text()) })
    await page.goto(url)
    const toggle = page.getByRole('button', { name: 'Dark theme', exact: true })
    await toggle.waitFor({ state: 'visible' })
    await page.waitForFunction(() => !document.querySelector('.theme-toggle').disabled)
    assert.equal(await page.locator('html').getAttribute('data-theme'), system)
    assert.equal(await page.evaluate(() => localStorage.getItem('haris-theme')), null, 'System default is not saved as an override')
    const opposite = system === 'light' ? 'dark' : 'light'
    await page.emulateMedia({ colorScheme: opposite })
    await page.waitForFunction(theme => document.documentElement.dataset.theme === theme, opposite)
    await toggle.click()
    assert.equal(await page.locator('html').getAttribute('data-theme'), system)
    assert.equal(await page.evaluate(() => localStorage.getItem('haris-theme')), system)
    assert.equal(await toggle.getAttribute('aria-pressed'), String(system === 'dark'))
    await page.reload()
    assert.equal(await page.locator('html').getAttribute('data-theme'), system, 'Choice persists across reloads')
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 })
      for (const path of ['/', '/projects/', '/publications/', '/contact/']) {
        await page.goto(url + path)
        assert.equal(await page.locator('html').getAttribute('data-theme'), system)
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${system} ${path} ${width}: fits viewport`)
        const bounds = await toggle.boundingBox()
        assert(bounds.width >= 44 && bounds.height >= 44 && bounds.x >= 0 && bounds.x + bounds.width <= width, 'Visible, accessible toggle target')
        if (width !== 320) await page.screenshot({ path: `artifacts/${system}-${path === '/' ? 'home' : path.split('/')[1]}-${width}.png`, fullPage: true })
      }
    }
    assert.deepEqual(errors, [], 'No hydration or runtime errors')
    await context.close()
    const noJs = await browser.newContext({ javaScriptEnabled: false, colorScheme: system })
    const staticPage = await noJs.newPage()
    await staticPage.goto(url)
    assert.equal(await staticPage.locator('body').evaluate(el => getComputedStyle(el).backgroundColor), system === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)', 'CSS follows device without JavaScript')
    await noJs.close()
  }
  console.log('PASS: light/dark system defaults, live OS changes, toggle persistence, accessible mobile navigation, 4 routes × 3 widths × 2 themes, no-JavaScript palettes.')
} finally {
  await browser?.close()
  await new Promise(resolve => server.close(resolve))
}
