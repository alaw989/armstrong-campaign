<script setup lang="ts">
/**
 * App Footer Component
 *
 * Footer container for legal disclaimers.
 *
 * FEC Compliance (11 CFR 110.11):
 * - "Paid for by" disclaimer must be clear and conspicuous
 * - Must appear on every page of the website
 * - Text size at least as large as majority of other text
 * - Contrast must meet readability requirements
 */
const config = useAppConfig()
const currentYear = new Date().getFullYear()

// Committee name from config - can be updated with official name
const committeeName = config.committee?.name || 'Armstrong for Houston County Committee'
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Legal disclaimers - REQUIRED ON EVERY PAGE -->
      <div class="text-sm mb-6">
        <p class="mb-2 text-gray-300">
          Paid for by {{ committeeName }}
        </p>
        <p class="text-gray-400 text-xs">
          Contributions or gifts to {{ committeeName }} are not tax deductible.
        </p>
      </div>

      <!-- Copyright -->
      <div class="text-xs text-gray-500 border-t border-gray-800 pt-4">
        <p>&copy; {{ currentYear }} {{ committeeName }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
