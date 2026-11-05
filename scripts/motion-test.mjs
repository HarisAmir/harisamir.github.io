import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { startServer } from './static-server.mjs'

const { server, url } = await startServer()
let browser
try {
  browser = await chromium.launch({ executablePath: process.env.CHROME_EXECUTABLE || undefined })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' })
  page.setDefaultTimeout(10000)
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(url)
  await page.evaluate(() => document.fonts.ready)
  const statusDot = page.locator('.status-dot')
  assert.equal(await statusDot.evaluate(el => getComputedStyle(el, '::after').animationName), 'status-pulse')
  assert(await page.locator('.ambient-waves').isHidden(), 'Flat backgrounds keep the waves hidden')
  assert(['rgb(0, 0, 0)', 'rgb(255, 255, 255)'].includes(await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor)), 'Page background is pure black or white')
  const globeCircle = page.locator('.location-globe .circle').first()
  assert((await globeCircle.evaluate(el => getComputedStyle(el).animationName)).includes('globe-circle'), 'Location globe rotates')
  const initialTime = await globeCircle.evaluate(el => el.getAnimations()[0].currentTime)
  await page.waitForFunction(time => document.querySelector('.location-globe .circle').getAnimations()[0].currentTime > time, initialTime)
  const button = page.getByRole('link', { name: 'View Projects' })
  await button.hover({ position: { x: 25, y: 20 } })
  await page.waitForTimeout(1100)
  assert.notEqual(await button.evaluate(el => getComputedStyle(el).translate), '0px', 'Button follows pointer')
  const hoveredFill = await button.evaluate(el => getComputedStyle(el, '::before').transform)
  await page.mouse.move(800, 500)
  await page.waitForTimeout(1100)
  assert.notEqual(await button.evaluate(el => getComputedStyle(el, '::before').transform), hoveredFill, 'Fill recedes on pointer exit')
  assert.equal(await button.evaluate(el => el.style.getPropertyValue('--pointer-x')), '')

  // Record actual browser scroll events. A fixed 60 ms sample is unreliable on
  // CI: the wheel event may not have arrived, or the animation may have finished.
  await page.locator('.hero-statement').hover()
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    window.__wheelCheck = { positions: [], handled: false }
    window.__recordWheelScroll = () => window.__wheelCheck.positions.push(scrollY)
    window.addEventListener('scroll', window.__recordWheelScroll, { passive: true })
    window.addEventListener('wheel', event => {
      queueMicrotask(() => { window.__wheelCheck.handled = event.defaultPrevented })
    }, { once: true })
  })
  await page.mouse.wheel(0, 600)
  await page.waitForFunction(() => Math.abs(scrollY - 600) < 2)
  const wheelCheck = await page.evaluate(() => {
    window.removeEventListener('scroll', window.__recordWheelScroll)
    const result = window.__wheelCheck
    delete window.__wheelCheck
    delete window.__recordWheelScroll
    return result
  })
  assert(wheelCheck.handled, 'Desktop wheel movement is handled by smooth scrolling')
  assert(wheelCheck.positions.some(y => y > 0 && y < 590), `Wheel movement eases through intermediate positions: ${wheelCheck.positions}`)
  // Navigation cancels active scroll easing and starts the new page at its top.
  await page.mouse.wheel(0, 600)
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()
  await page.waitForURL('**/projects/')
  await page.locator('.page-enter-active').waitFor()
  await page.waitForFunction(() => !document.querySelector('.page-enter-active, .page-leave-active'))
  assert.equal(await page.evaluate(() => scrollY), 0)
  assert.equal(await page.locator('h1').textContent(), 'Projects.')
  await page.evaluate(() => scrollTo({ top: 1200, behavior: 'instant' }))
  // Keyboard activation avoids the automation driver's scroll-into-view adjustment.
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Publications' }).evaluate(el => el.focus({ preventScroll: true }))
  await page.keyboard.press('Enter')
  await page.waitForURL('**/publications/')
  await page.waitForFunction(() => document.querySelector('.publication-card') && !document.querySelector('.page-enter-active, .page-leave-active'))
  await page.goBack()
  await page.waitForFunction(() => document.querySelector('#dls3d') && !document.querySelector('.page-enter-active, .page-leave-active'))
  assert(Math.abs(await page.evaluate(() => scrollY) - 1200) < 2, `Browser back restores scroll after page swap: ${await page.evaluate(() => scrollY)}`)

  const gallery = page.locator('#continual-event-detection .gallery-track')
  await gallery.scrollIntoViewIfNeeded()
  await gallery.evaluate(el => el.dispatchEvent(new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true })))
  const nestedWasPrevented = await gallery.evaluate(el => !el.dispatchEvent(new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true })))
  assert.equal(nestedWasPrevented, false, 'Nested galleries retain native scrolling')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' }).click()
  await page.locator('.hero-name').waitFor()
  assert.equal(await globeCircle.evaluate(el => el.getAnimations().length), 0, 'Globe animation stops under reduced motion')
  assert.equal(await page.locator('.location-globe .globe').evaluate(el => el.style.rotate), '0deg', 'Globe scroll tilt stops under reduced motion')
  assert.equal(await page.locator('.page-view').evaluate(el => getComputedStyle(el).transitionDuration), '0s')
  assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior), 'auto')
  assert.equal(await statusDot.evaluate(el => getComputedStyle(el, '::after').animationName), 'none', 'Status pulse respects reduced motion')
  await page.getByRole('link', { name: 'View Projects' }).hover()
  assert.equal(await page.getByRole('link', { name: 'View Projects' }).evaluate(el => getComputedStyle(el).translate), 'none')
  assert.deepEqual(errors, [])
  console.log('PASS: flat backgrounds and rotating location globe; magnetic buttons and fill; eased wheel scrolling; transition timing; scroll cancellation and back restoration; native gallery scroll; reduced motion.')
} finally {
  await browser?.close()
  await new Promise(resolve => server.close(resolve))
}
