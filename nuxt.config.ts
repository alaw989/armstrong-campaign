// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // Only enable devtools in development
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  // Ensure Vue production build is used
  vue: {
    runtimeConfig: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('-'),
      },
    },
  },

  // Vite configuration for production
  vite: {
    define: {
      // Ensure Vue uses production mode
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    },
    build: {
      // Ensure minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // Improve chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for better caching
          },
        },
      },
    },
    // Improve build performance
    optimizeDeps: {
      include: [],
    },
    // CSS configuration - fix Vite 7 CSS injection
    css: {
      devSourcemap: true,
    },
  },

  // Feature flags to reduce bundle size
  features: {
    // Disable unnecessary features
    inlineStyles: false,
  },

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
    // Add cache headers for static assets
    routeRules: {
      '/': { prerender: true, headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } },
      '/images/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    },
  },

  // SEO and site configuration
  site: {
    url: 'https://armstrongforhouston.com',
    name: 'Xzandria Armstrong for Houston County',
    description: 'Leadership for Houston County, GA. Learn about Xzandria Armstrong\'s platform, vision, and campaign.',
    defaultLocale: 'en',
  },

  // Modules - @nuxt/ui removed as it's not used, SEO and image modules kept
  modules: ['@nuxtjs/seo', '@nuxt/image', '@nuxtjs/tailwindcss'],

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
    // Presets for gallery and hero
    presets: {
      hero: {
        width: 800,
        height: 1067,
        fit: 'cover',
        quality: 85,
        format: 'webp',
      },
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
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/images/campaign.jpg' },
        // Preload critical LCP images (WebP for performance)
        { rel: 'preload', as: 'image', type: 'image/webp', fetchpriority: 'high', href: '/images/campaign-150.webp' },
        { rel: 'preload', as: 'image', type: 'image/webp', fetchpriority: 'high', media: '(min-width: 769px)', href: '/images/gallery/IMG_0020-desktop.webp' },
        { rel: 'preload', as: 'image', type: 'image/webp', fetchpriority: 'high', media: '(max-width: 768px)', href: '/images/gallery/IMG_0020-mobile.webp' },
      ],
    },
  },

  // Global CSS
  css: ['~/assets/css/main.css'],
})
