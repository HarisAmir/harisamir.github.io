import { renderToString } from '@vue/server-renderer'
import { createApp } from './app'
export { pages } from './data/pages'
export { profile } from './data/profile'

export async function render(url: string) {
  const { app, router } = createApp()
  await router.push(url)
  await router.isReady()
  return renderToString(app)
}
