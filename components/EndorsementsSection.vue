<script setup lang="ts">
/**
 * EndorsementsSection Component
 *
 * Displays community leader and organization endorsements.
 * Uses blockquote-style cards with semantic HTML.
 * Handles empty state gracefully.
 */

interface Endorsement {
  id: string
  quote: string
  name: string
  title: string
  organization?: string
}

// TODO: Replace with campaign-provided endorsements
const endorsements: Endorsement[] = [
  {
    id: '1',
    quote: "Xzandria Armstrong brings the leadership and integrity Houston County needs. Her commitment to our schools and families is unwavering.",
    name: 'Dr. Sarah Johnson',
    title: 'Former Houston County School Board Member'
  },
  {
    id: '2',
    quote: "I've seen Xzandria's dedication to our community firsthand. She listens, she cares, and she gets things done.",
    name: 'Rev. Michael Williams',
    title: 'Pastor, First Baptist Church of Warner Robins'
  },
  {
    id: '3',
    quote: "As a small business owner, I need someone who understands the challenges we face. Xzandria has been a champion for local businesses.",
    name: 'Patricia Chen',
    title: 'Owner, Chen Family Restaurant',
    organization: 'Houston County Chamber of Commerce Member'
  },
  {
    id: '4',
    quote: "Xzandria's vision for education in Houston County is exactly what our students and teachers need. She has my full support.",
    name: 'Margaret Thompson',
    title: 'Retired Teacher, 30 years in Houston County Schools'
  }
]
</script>

<template>
  <section id="endorsements" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-900">
        Community Endorsements
      </h2>

      <!-- Empty state -->
      <div v-if="endorsements.length === 0" class="text-center">
        <p class="text-xl text-gray-600">Endorsements coming soon!</p>
      </div>

      <!-- Endorsements list -->
      <div v-else class="space-y-6 max-w-4xl mx-auto">
        <blockquote
          v-for="endorsement in endorsements"
          :key="endorsement.id"
          class="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-800"
        >
          <!-- Quote -->
          <p class="text-lg italic mb-4 text-gray-700">
            &ldquo;{{ endorsement.quote }}&rdquo;
          </p>

          <!-- Source citation -->
          <cite class="not-italic block">
            <strong class="text-gray-900">{{ endorsement.name }}</strong>
            <span class="text-gray-600 block text-sm">
              {{ endorsement.title }}
              <template v-if="endorsement.organization">
                • {{ endorsement.organization }}
              </template>
            </span>
          </cite>
        </blockquote>
      </div>
    </div>
  </section>
</template>
