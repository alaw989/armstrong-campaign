<script setup lang="ts">
/**
 * Contact Section Component
 *
 * Displays contact information and social media links.
 * Three-column layout: Email | Phone | Social
 *
 * Features:
 * - Configurable contact info from app.config.ts
 * - Social media links with circular buttons
 * - Volunteer CTA button
 * - Accessible links (mailto, tel, external with security attributes)
 */
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
  <section id="contact" class="py-20 bg-gray-900 text-white">
    <div class="container mx-auto px-4">
      <!-- Section heading -->
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
        Get in Touch
      </h2>
      <p class="text-center text-lg mb-12 max-w-2xl mx-auto text-gray-300">
        Have questions or want to get involved? We'd love to hear from you.
        Reach out via email, phone, or connect with us on social media.
      </p>

      <!-- Three-column layout -->
      <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <!-- Email Column -->
        <div class="text-center">
          <div class="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
            class="text-teal-400 hover:text-teal-300 underline transition-colors"
          >
            {{ contact.email }}
          </a>
        </div>

        <!-- Phone Column -->
        <div class="text-center">
          <div class="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
            class="text-teal-400 hover:text-teal-300 underline transition-colors"
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
              class="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors"
            >
              <span class="text-white font-bold">{{ item.platform[0] }}</span>
            </a>
          </div>
          <p v-else class="text-gray-400 text-sm">
            Connect with us on social media - coming soon!
          </p>
        </div>
      </div>

      <!-- Volunteer CTA -->
      <div class="mt-12 text-center">
        <a
          :href="`mailto:${contact.volunteerEmail}?subject=I want to volunteer!`"
          class="inline-block bg-teal-700 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Volunteer for the Campaign
        </a>
      </div>
    </div>
  </section>
</template>
