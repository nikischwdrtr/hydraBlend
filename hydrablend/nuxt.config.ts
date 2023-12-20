export default defineNuxtConfig({
  app: {
    head: {
      title: 'hydrablend',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
      ],
    },
  },
  modules: [
  ],
  css: [
    '~/assets/css/main.scss',
  ],
  vite: {
    define: { global: 'window' },
  },
  ssr: false,
})