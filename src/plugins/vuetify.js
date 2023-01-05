/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          // primary: '#1867C0',
          primary: '#000000',
          // secondary: '#5CBBF6',
          secondary: '#02AE9E',
          accent: '#fff',
          error: '#852F3F',
          background: '#0D0E0E',
        },
      },
    },
  },
})
