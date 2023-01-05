/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// State management (Pinia Stores)
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

pinia.use((context) => {
    // const storeId = context.store.$id
    const storeId = 'videoData'

    // Sync state from localStorage
    const fromStorage = JSON.parse(window.localStorage.getItem(storeId))

    if (fromStorage) {
        context.store.$patch(fromStorage)
    }

    // Save state to localStorage
    if (context.store.$id == storeId) {
        context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, JSON.stringify(state))
    })
    }
    
})

app.use(pinia)
registerPlugins(app)

app.mount('#app')
