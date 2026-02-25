<script setup lang="ts">
/**
 * PlatformSection Component
 *
 * Platform/Issues section displaying candidate positions in card grid.
 * Follows diijondacosta.com pattern with responsive card layout.
 *
 * Features:
 * - Section ID for Navigation scroll spy
 * - 5 platform position cards
 * - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
 * - Alternating background (gray-50)
 */

interface PlatformPosition {
  id: string
  title: string
  description: string
  icon: string
}

// Platform positions data - District 4 Blueprint
const positions: PlatformPosition[] = [
  {
    id: 'literacy',
    title: 'Literacy is the Foundation',
    description: 'District 4 Reads: Reading intervention specialists and literacy coaches in our schools. A Two-Generation Model bringing GED and Adult Literacy classes into school buildings. Monthly progress tracking and public reports on literacy scores.',
    icon: '⭐'
  },
  {
    id: 'pipeline',
    title: 'Breaking the Cycle',
    description: 'Reducing the school-to-prison pipeline by swapping suspensions for support through Restorative Justice. More counselors and mentors, not exclusionary discipline. Early intervention at the 3rd-grade mark—reading on level means a future.',
    icon: '🛡️'
  },
  {
    id: 'trade-tech',
    title: 'Trade, Tech & Readiness',
    description: 'Trade certification before graduation. Cyber Security classes in district schools. Expanded partnerships with Houston County Career Academy to prepare District 4 kids for the jobs that are actually hiring.',
    icon: '🛠️'
  },
  {
    id: 'funding',
    title: 'Bringing the Money Home',
    description: 'Building relationships with retail, industry, and military leaders at Robins AFB to fund after-school programs, trafficking awareness, and adult literacy. Ensuring Board of Education budgets prioritize District 4 classrooms.',
    icon: '💰'
  },
  {
    id: 'commitment',
    title: 'Skin in the Game',
    description: '"In-Co" Partners—International and Community partnerships that invest in our kids. When we educate the family, we strengthen the student. District 4 will no longer be an afterthought.',
    icon: '📢'
  }
]
</script>

<template>
  <section
    id="platform"
    class="py-20 bg-gray-50 scroll-mt-20"
    aria-label="Platform positions"
  >
    <div class="container mx-auto px-4">
      <!-- Section heading -->
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-teal-900">
        My Platform
      </h2>

      <!-- Section subheading -->
      <p class="text-center text-lg text-teal-700 mb-12 max-w-2xl mx-auto">
        The District 4 Blueprint: Knowledge is Power
      </p>

      <!-- Card grid -->
      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Platform positions"
      >
        <PlatformCard
          v-for="position in positions"
          :key="position.id"
          :title="position.title"
          :description="position.description"
          :icon="position.icon"
          role="listitem"
        />
      </div>

      <!-- Donate CTA after platform cards -->
      <div class="mt-12 text-center">
        <p class="text-lg text-gray-700 mb-6">
          Want to support Xzandria's platform for District 4?
        </p>
        <DonateButton
          variant="secondary"
          size="large"
          text="Donate to the Campaign"
        />
      </div>
    </div>
  </section>
</template>
