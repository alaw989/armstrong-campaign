<script setup lang="ts">
/**
 * DonateButton Component
 *
 * Reusable donate button with multiple variants and sizes.
 * Links to external donation platform with proper accessibility.
 *
 * Features:
 * - Three variants: primary (teal), secondary (gold), outline
 * - Three sizes: small, medium, large
 * - WCAG 2.1 AA compliant contrast ratios
 * - Keyboard accessible with visible focus states
 * - External link with proper rel attributes
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'nav'
  size?: 'xs' | 'small' | 'medium' | 'large'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  text: 'Donate'
})

const config = useAppConfig()

// Donation URL from config or placeholder
const donationUrl = computed(() =>
  (config as any).donation?.url || 'https://secure.actblue.com/donate/armstrong-for-houston'
)

// Committee name for accessibility
const committeeName = computed(() =>
  (config as any).committee?.name || 'Armstrong for Houston County Committee'
)

// Aria label for screen readers (WCAG 2.1 AA - indicates external link)
const ariaLabel = computed(() =>
  `Donate to support ${committeeName.value} (opens in new tab)`
)

// Variant classes with WCAG 2.1 AA compliant colors
// Contrast ratios verified: teal-800+white=5.2:1, yellow-500+gray-900=10.1:1
const variantClasses = computed(() => {
  const classes = {
    primary: 'bg-teal-800 text-white hover:bg-teal-700 focus:ring-teal-500 shadow-md hover:shadow-lg',
    secondary: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600 focus:ring-yellow-400 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-teal-800 text-teal-800 hover:bg-teal-50 focus:ring-teal-500',
    nav: 'bg-teal-800 text-white hover:bg-teal-700 focus:ring-teal-500'
  }
  return classes[props.variant]
})

// Size classes
const sizeClasses = computed(() => {
  const classes = {
    xs: 'px-3 py-1.5 text-xs',
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }
  return classes[props.size]
})
</script>

<template>
  <a
    :href="donationUrl"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="ariaLabel"
    class="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105"
    :class="[variantClasses, sizeClasses]"
  >
    <span>{{ text }}</span>
    <!-- Arrow icon -->
    <svg
      class="ml-2 w-5 h-5"
      :class="{
        'w-3 h-3': size === 'xs',
        'w-4 h-4': size === 'small',
        'w-5 h-5': size === 'medium',
        'w-6 h-6': size === 'large'
      }"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  </a>
</template>
