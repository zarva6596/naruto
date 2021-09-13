import { createSEOMeta } from "./utils/seo";
import { fetchSitemapRoutes } from "./utils/sitemap";

export default async () => {
  const routes = await fetchSitemapRoutes();

  return {
    mode: 'universal',
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'mini-vuedose',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        ...createSEOMeta({
          title: 'NarutoDose',
          description: "Get to know all about Naruto and its characters in tiny bits of info.",
          image: '[Insert_NarutoDose_Image_URL]',
          url: process.env.HOST_NAME,
        }),
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Get to know all about Naruto and its characters in tiny bits of info.' 
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/tailwindcss
      '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      [
        'storyblok-nuxt',
        { 
          accessToken: process.env.STORYBLOK_KEY, 
          cacheProvider: 'memory' 
        }
      ],
      [
        '@nuxtjs/markdownit', 
        { html: true, injected: true, use: ['markdown-it-prism'] }
      ],
      [
        '@nuxtjs/sitemap'
      ]
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/themes/prism-tomorrow.css',
      },
    ],

    sitemap: {
      hostname: process.env.HOST_NAME,
      // hostname: process.env.SITEMAP_HOSTNAME,
      routes,
    },
  }
}
