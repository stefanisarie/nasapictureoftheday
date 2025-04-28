import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  experimental: {
    asyncContext: true,
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  routeRules: {
    // NASA route cache for 12 hours
    '/api/apod':        { cache: { maxAge: 60 * (12 * 60) } },
  },
})
