<script setup lang="ts">
/**
 * Default Layout
 *
 * Main layout wrapper containing:
 * - Sticky navigation header
 * - Main content area
 * - Footer with legal disclaimers
 */
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>

    <!-- Navigation -->
    <Navigation />

    <!-- Main content area -->
    <main
      id="main-content"
      class="flex-grow"
      role="main"
      style="margin-top: 128px;"
    >
      <slot />
    </main>

    <!-- Footer with legal disclaimers -->
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>
