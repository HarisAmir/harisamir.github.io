import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

/** Small, progressive enhancements; native scrolling remains the fallback. */
export function usePageMotion() {
  const router = useRouter()
  let cleanup = () => {}
  onMounted(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const mouse = matchMedia('(hover: hover) and (pointer: fine)')
    const controls = '.button, .publication-resource, .gallery-arrow, .site-nav a'
    let hovered: HTMLElement | null = null
    let frame = 0
    let target = window.scrollY
    let position = window.scrollY
    let previousTime = 0
    const resetHover = () => {
      hovered?.style.removeProperty('--pointer-x')
      hovered?.style.removeProperty('--pointer-y')
      hovered = null
    }
    const stopScroll = () => { cancelAnimationFrame(frame); frame = 0; position = target = window.scrollY }
    const reset = () => { stopScroll(); resetHover() }
    function point(event: PointerEvent) {
      if (reduced.matches || !mouse.matches || event.pointerType !== 'mouse') return
      const control = (event.target as Element).closest<HTMLElement>(controls)
      if (control !== hovered) resetHover()
      if (!control || control.matches(':disabled')) return
      hovered = control
      const rect = control.getBoundingClientRect()
      control.style.setProperty('--pointer-x', `${Math.max(-5, Math.min(5, (event.clientX - rect.left - rect.width / 2) * .12))}px`)
      control.style.setProperty('--pointer-y', `${Math.max(-4, Math.min(4, (event.clientY - rect.top - rect.height / 2) * .16))}px`)
    }
    function step(time: number) {
      const dt = Math.min(time - previousTime, 40)
      previousTime = time
      const max = Math.max(0, document.documentElement.scrollHeight - innerHeight)
      target = Math.max(0, Math.min(target, max))
      const distance = target - position
      if (Math.abs(distance) < 1) { window.scrollTo({ top: target, behavior: 'instant' }); frame = 0; return }
      position += distance * (1 - Math.exp(-dt / 95))
      window.scrollTo({ top: position, behavior: 'instant' })
      frame = requestAnimationFrame(step)
    }
    function wheel(event: WheelEvent) {
      if (reduced.matches || !mouse.matches || event.ctrlKey || event.metaKey || event.shiftKey || !event.cancelable || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      // Keep trackpads' fine-grained momentum and nested scrollers native.
      if (event.deltaMode === 0 && Math.abs(event.deltaY) < 50) { stopScroll(); return }
      let element = event.target instanceof Element ? event.target : null
      if (element?.closest('input, textarea, select, [contenteditable="true"], .gallery-track, .skills-window')) { stopScroll(); return }
      while (element && element !== document.body) {
        const style = getComputedStyle(element)
        if (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight) { stopScroll(); return }
        element = element.parentElement
      }
      if (!frame) position = target = scrollY
      const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? innerHeight : 1
      const max = Math.max(0, document.documentElement.scrollHeight - innerHeight)
      target = Math.max(0, Math.min(target + event.deltaY * unit, max))
      if (!frame && Math.abs(target - scrollY) < 1) return
      event.preventDefault()
      if (!frame) { previousTime = performance.now(); frame = requestAnimationFrame(step) }
    }
    document.addEventListener('pointermove', point, { passive: true })
    document.addEventListener('pointerleave', resetHover)
    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('pointerdown', stopScroll, { passive: true })
    window.addEventListener('keydown', stopScroll)
    window.addEventListener('blur', reset)
    reduced.addEventListener('change', reset)
    const removeGuard = router.beforeEach(() => { reset() })
    cleanup = () => {
      reset(); removeGuard()
      document.removeEventListener('pointermove', point)
      document.removeEventListener('pointerleave', resetHover)
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('pointerdown', stopScroll)
      window.removeEventListener('keydown', stopScroll)
      window.removeEventListener('blur', reset)
      reduced.removeEventListener('change', reset)
    }
  })
  onBeforeUnmount(() => cleanup())
}
