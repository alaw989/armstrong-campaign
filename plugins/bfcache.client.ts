/**
 * BFCache Fix Plugin
 *
 * Ensures the page can be cached in the browser's back/forward cache.
 * Avoids using beforeunload or unload events which prevent bfcache.
 */

export default defineNuxtPlugin(() => {
  // Don't add beforeunload or unload event listeners
  // These events prevent bfcache from working

  // Instead, use pagehide for any cleanup that needs to happen
  // pagehide is compatible with bfcache
  if (import.meta.client) {
    window.addEventListener('pagehide', () => {
      // Any cleanup that needs to happen when page is hidden
      // This is compatible with bfcache
    }, { once: true })
  }
})
