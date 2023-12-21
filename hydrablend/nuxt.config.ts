export default defineNuxtConfig({
  app: {
    head: {
      title: 'observation; blend',
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
    define: {
      'window.global': {}
    }
  },
  ssr: false,
})