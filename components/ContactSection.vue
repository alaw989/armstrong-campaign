<script setup lang="ts">
/**
 * Contact Section Component
 *
 * Displays contact information and social media links.
 * Three-column layout: Email | Phone | Social
 *
 * Features:
 * - Scroll-triggered fade-in animation
 * - Configurable contact info from app.config.ts
 * - Social media links with circular buttons
 * - Volunteer CTA button
 * - Accessible links (mailto, tel, external with security attributes)
 */

// Scroll-triggered fade-in animation
const { target: sectionTarget, isVisible: sectionIsVisible } = useIntersectionObserver()

const config = useAppConfig()

// Contact info from config with fallback defaults
const contact = config.contact || {
  email: 'info@armstrongforhouston.com',
  phone: '(478) 555-0123',
  address: '123 Main Street, Warner Robins, GA 31088',
  volunteerEmail: 'volunteer@armstrongforhouston.com'
}

// Social media links from config
const social = config.social || []
</script>

<template>
  <section
    id="contact"
    ref="sectionTarget"
    class="py-24 md:py-32 bg-teal-700 scroll-mt-20 transition-all duration-700"
    :class="{ 'opacity-0 translate-y-8': !sectionIsVisible }"
  >
    <div class="container mx-auto px-4">
      <!-- Section heading -->
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
        Get in Touch
      </h2>
      <p class="text-center text-lg mb-12 max-w-2xl mx-auto text-teal-50">
        Have questions or want to get involved? We'd love to hear from you.
        Reach out via email, phone, or connect with us on social media.
      </p>

      <!-- Three-column layout -->
      <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <!-- Email Column -->
        <div class="text-center">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="font-semibold mb-2 text-white">Email</h3>
          <a
            :href="`mailto:${contact.email}`"
            class="text-teal-100 hover:text-white underline transition-colors"
          >
            {{ contact.email }}
          </a>
        </div>

        <!-- Phone Column -->
        <div class="text-center">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h3 class="font-semibold mb-2 text-white">Phone</h3>
          <a
            :href="`tel:${contact.phone.replace(/\D/g, '')}`"
            class="text-teal-100 hover:text-white underline transition-colors"
          >
            {{ contact.phone }}
          </a>
        </div>

        <!-- Social Media Column -->
        <div class="text-center">
          <h3 class="font-semibold mb-4 text-white">Follow Us</h3>
          <div v-if="social.length > 0" class="flex justify-center space-x-4">
            <a
              v-for="item in social"
              :key="item.platform"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Follow us on ${item.platform}`"
              class="w-12 h-12 bg-white text-teal-700 rounded-full flex items-center justify-center hover:bg-teal-50 transition-colors"
            >
              <span class="font-bold">{{ item.platform[0] }}</span>
            </a>
          </div>
          <p v-else class="text-teal-200 text-sm">
            Connect with us on social media - coming soon!
          </p>
        </div>
      </div>

      <!-- Volunteer CTA -->
      <div class="mt-12 text-center">
        <a
          :href="`mailto:${contact.volunteerEmail}?subject=I want to volunteer!`"
          class="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-teal-50 text-teal-700 font-semibold rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Volunteer for the Campaign
        </a>
      </div>
    </div>
  </section>
</template>
