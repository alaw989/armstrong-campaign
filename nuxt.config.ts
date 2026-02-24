// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  // Enable TypeScript with strict mode
  typescript: {
    strict: true,
    typeCheck: false, // Disabled to avoid vite-plugin-checker issues
  },

  // Static site generation configuration
  nitro: {
    preset: 'static',
  },

  // SEO and site configuration
  site: {
    url: 'https://armstrongforhouston.com',
    name: 'Xzandria Armstrong for Houston County',
    description: 'Leadership for Houston County, GA. Learn about Xzandria Armstrong\'s platform, vision, and campaign.',
    defaultLocale: 'en',
  },

  // Modules - disable og-image due to unenv issue
  modules: ['@nuxt/ui', '@nuxtjs/seo', '@nuxt/image'],

  // Image optimization configuration
  image: {
    // Image quality
    quality: 80,
    // Modern formats (browser will use best supported)
    formats: ['webp', 'avif', 'jpeg'],
    // Screen sizes for responsive images
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    // Presets for gallery
    presets: {
      galleryThumb: {
        width: 400,
        height: 400,
        fit: 'cover',
        quality: 75,
        format: 'webp',
      },
      galleryFull: {
        width: 1200,
        quality: 85,
        format: 'webp',
      },
    },
  },

  // SEO module configuration (@nuxtjs/seo v2)
  seo: {
    // Global SEO configuration
    redirectToCanonicalSiteUrl: false,
  },

  // Disable og-image module which has unenv dependency issues
  ogImage: {
    enabled: false,
  },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  // Global CSS
  css: ['~/assets/css/main.css'],
})
