// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'firebase'
  },
  app: {
    head: {
      script: [{
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-J9WQY4LNY6'
      },
      ]
    }
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: 'AIzaSyARDF3FOcqd4IxCcyguezpytvdGrgwkYKk',
      firebaseAuthDomain: 'anydan.link',
      firebaseProjectId: 'anydan--app',
      firebaseStorageBucket: 'anydan--app.appspot.com',
      firebaseAppId: '1:1007690767255:web:012896cfcaaaadf08202d2',
      firebaseMeasurementId: 'G-J9WQY4LNY6',
    },
  },
  css: ["vuetify/styles"],
  build: {
    transpile: ["vuetify"]
  },
  vite: {
    define: {
      "process.env.DEBUG": false
    }
  },
  modules: [
    // ['@nuxtjs/robots', {
    //   UserAgent: '*',
    //   Disallow: '',
    // Sitemap: 'https://anydan.link/sitemap.xml'
    // }],
    ['@funken-studio/sitemap-nuxt-3', { generateOnBuild: true }]
  ],
  sitemap: {
    hostname: 'https://anydan.link'
  },
  routeRules: {
    '/': { ssr: false },
    '/tetote/posts/**': { ssr: true },
  },

})