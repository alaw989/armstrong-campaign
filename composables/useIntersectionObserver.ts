/**
 * useIntersectionObserver Composable
 *
 * Provides intersection observer for scroll-triggered animations
 * Client-side only to avoid SSR issues
 *
 * Usage:
 * const { target, isVisible } = useIntersectionObserver()
 */
export const useIntersectionObserver = (options = { threshold: 0.1 }) => {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  // Only run on client side
  if (process.client) {
    let observer: IntersectionObserver | null = null

    onMounted(() => {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              isVisible.value = true
            }
          })
        }, options)

        if (target.value) {
          observer.observe(target.value)
        }
      }, 100)
    })

    onBeforeUnmount(() => {
      if (observer && target.value) {
        observer.unobserve(target.value)
      }
    })
  }

  return { target, isVisible }
}
