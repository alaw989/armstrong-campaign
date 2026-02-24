<script setup lang="ts">
/**
 * App Footer Component
 *
 * Footer container for legal disclaimers.
 * Legal disclaimers will be populated in plan 01-03.
 */
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Legal disclaimers placeholder - will be populated in plan 01-03 -->
      <div class="text-sm text-gray-400 mb-4">
        <p>Legal disclaimers placeholder</p>
      </div>

      <!-- Copyright -->
      <div class="text-xs text-gray-500 border-t border-gray-800 pt-4">
        <p>&copy; {{ currentYear }} Xzandria Armstrong for Houston County. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
