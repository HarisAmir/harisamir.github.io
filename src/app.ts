import { createSSRApp, createApp as createClientApp } from 'vue'
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import PublicationsPage from './pages/PublicationsPage.vue'
import ContactPage from './pages/ContactPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import { pages } from './data/pages'
import { profile } from './data/profile'

export function createApp(hydrate = true) {
  const app = (hydrate ? createSSRApp : createClientApp)(App)
  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { path: '/', component: HomePage },
      { path: '/projects/', component: ProjectsPage },
      { path: '/publications/', component: PublicationsPage },
      { path: '/contact/', component: ContactPage },
      { path: '/:pathMatch(.*)*', component: NotFoundPage },
    ],
    async scrollBehavior(to, from, saved) {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      // Wait for the actual replacement DOM, rather than estimating animation time.
      if (from.matched.length && to.path !== from.path) {
        for (let frame = 0; frame < 90; frame++) {
          await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
          if (window.location.pathname !== to.path) return false
          if (document.querySelector<HTMLElement>('.page-view')?.dataset.pagePath === to.path) break
        }
      }
      if (saved) return { ...saved, behavior: 'instant' }
      if (to.hash) return { el: to.hash, top: 135, behavior: reduced ? 'instant' : 'smooth' }
      return { top: 0, behavior: 'instant' }
    },
  })
  if (!import.meta.env.SSR) {
    router.afterEach((to, from) => {
      const page = pages.find(p => p.path.replace(/\/$/, '') === to.path.replace(/\/$/, ''))
      const title = page ? `${page.title} — ${profile.name}` : `Page not found — ${profile.name}`
      document.title = title
      const description = page?.description ?? 'This page could not be found.'
      const url = profile.url + (page?.path ?? to.path)
      for (const [attribute, key, value] of [
        ['name', 'description', description], ['property', 'og:title', title],
        ['property', 'og:description', description], ['property', 'og:url', url],
      ]) {
        let tag = document.querySelector(`meta[${attribute}="${key}"]`)
        if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute, key); document.head.append(tag) }
        tag.setAttribute('content', value)
      }
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.append(canonical) }
      canonical.setAttribute('href', url)
      const robots = document.querySelector('meta[name="robots"]')
      if (page) robots?.remove()
      else if (!robots) {
        const tag = document.createElement('meta')
        tag.name = 'robots'
        tag.content = 'noindex'
        document.head.append(tag)
      }
      if (from.matched.length && to.path !== from.path) {
        requestAnimationFrame(() => document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true }))
      }
    })
  }
  app.use(router)
  return { app, router }
}
