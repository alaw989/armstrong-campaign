<script setup lang="ts">
/**
 * PlatformSection Component
 *
 * Platform/Issues section displaying candidate positions in card grid.
 * The District 4 Blueprint: Knowledge is Power
 *
 * Features:
 * - Section ID for Navigation scroll spy
 * - 5 platform position cards with detailed bullet points
 * - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
 * - Alternating background (gray-50)
 * - Quote and slogans section
 */

interface PlatformPosition {
  id: string
  title: string
  tagline: string
  points: string[]
  icon: string
}

// Platform positions data - District 4 Blueprint
const positions: PlatformPosition[] = [
  {
    id: 'literacy',
    title: 'Literacy is the Foundation',
    tagline: 'If a child can\'t read, we\'ve already closed the door on them.',
    points: [
      '<strong>District 4 Reads:</strong> Reading intervention specialists and literacy coaches in our schools—not just in an office.',
      '<strong>Two-Generation Model:</strong> GED classes and Adult Literacy inside school buildings. When parents level up, children follow.',
      '<strong>Real Accountability:</strong> Monthly progress tracking and public reports on literacy scores.'
    ],
    icon: '⭐'
  },
  {
    id: 'pipeline',
    title: 'Breaking the Cycle',
    tagline: 'We keep our kids in the classroom, not in the system.',
    points: [
      '<strong>Swap Suspensions for Support:</strong> Restorative Justice with more counselors and mentors, not exclusionary discipline.',
      '<strong>Early Intervention:</strong> Stop the school-to-prison pipeline at 3rd grade. Reading on level means a future.',
      'When students can read, they engage. When they engage, they succeed.'
    ],
    icon: '🛡️'
  },
  {
    id: 'trade-tech',
    title: 'Trade, Tech & Readiness',
    tagline: 'Not everyone goes to college, but everyone needs a trade.',
    points: [
      '<strong>Trade Before Graduation:</strong> Students earn trade certifications before walking across the stage.',
      '<strong>Cyber in the Classroom:</strong> Cyber Security classes for jobs that are actually hiring.',
      '<strong>Career Academy Partnerships:</strong> Expand connections with Houston County Career Academy.'
    ],
    icon: '🛠️'
  },
  {
    id: 'funding',
    title: 'Bringing the Money Home',
    tagline: 'District 4 maps show where the money is—and where it isn\'t.',
    points: [
      '<strong>Skin in the Game:</strong> Partnerships with retail, industry, and military leaders at Robins AFB.',
      '<strong>Fair Share:</strong> District 4 will no longer be an afterthought in Board of Education budgets.',
      '<strong>Fellowships for Creatives:</strong> Programs for young writers, actors, and aspiring politicians.'
    ],
    icon: '💰'
  },
  {
    id: 'commitment',
    title: 'My Commitment',
    tagline: 'When we educate the family, we strengthen the student.',
    points: [
      '"In-Co" Partners—International and Community partnerships that invest in our kids.',
      'Fighting for after-school programs, trafficking awareness, and adult literacy foundations.',
      'Ensuring District 4 classrooms get the resources they need.'
    ],
    icon: '🤝'
  }
]

const slogans = [
  { text: 'District 4: Skin in the Game.', highlight: 'Skin in the Game' },
  { text: 'Literacy First. Success Follows.', highlight: 'Literacy First' },
  { text: 'Read Today. Lead Tomorrow.', highlight: 'Read Today' }
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
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block text-sm font-semibold tracking-wider uppercase text-teal-700 mb-3">
          The District 4 Blueprint
        </span>
        <h2 class="text-3xl md:text-5xl font-bold mb-4 text-teal-900">
          Knowledge is Power
        </h2>
        <p class="text-xl text-gray-700 italic leading-relaxed">
          "Our district can't be the best unless every child can read. Educating the public is the key to our democracy and the loudest voice against violence."
        </p>
      </div>

      <!-- Card grid -->
      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        role="list"
        aria-label="Platform positions"
      >
        <article
          v-for="position in positions"
          :key="position.id"
          class="platform-card bg-white rounded-xl p-6 shadow-md border-t-4 border-teal-700 hover:shadow-xl transition-all duration-300"
          role="listitem"
        >
          <!-- Icon -->
          <div class="text-3xl mb-4" aria-hidden="true">
            {{ position.icon }}
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-teal-900 mb-2">
            {{ position.title }}
          </h3>

          <!-- Tagline -->
          <p class="text-sm text-teal-700 font-medium mb-4 italic">
            {{ position.tagline }}
          </p>

          <!-- Bullet points -->
          <ul class="space-y-3 text-gray-700 text-sm">
            <li
              v-for="(point, idx) in position.points"
              :key="idx"
              class="flex gap-2"
            >
              <span class="text-teal-600 mt-1">•</span>
              <span v-html="point" />
            </li>
          </ul>
        </article>
      </div>

      <!-- Slogans section -->
      <div class="bg-gradient-to-r from-teal-700 to-teal-800 rounded-2xl p-8 md:p-12 text-white text-center mb-12">
        <h3 class="text-2xl md:text-3xl font-bold mb-8">
          Our Message
        </h3>
        <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div
            v-for="(slogan, idx) in slogans"
            :key="idx"
            class="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20"
          >
            <p class="text-lg md:text-xl font-semibold">
              {{ slogan.text }}
            </p>
          </div>
        </div>
      </div>

      <!-- Donate CTA -->
      <div class="text-center">
        <p class="text-lg text-gray-700 mb-6">
          Want to support this vision for District 4?
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

<style scoped>
.platform-card:hover {
  transform: translateY(-4px);
}
</style>
