import '@fontsource/instrument-sans/latin-400.css'
import '@fontsource/instrument-sans/latin-500.css'
import '@fontsource/instrument-sans/latin-600.css'
import './style.css'
import { createApp } from './app'

const { app, router } = createApp(Boolean(document.querySelector('#app main')))
router.isReady().then(() => app.mount('#app'))
