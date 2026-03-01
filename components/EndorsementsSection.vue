<script setup lang="ts">
/**
 * EndorsementsSection Component
 *
 * Displays community leader and organization endorsements.
 * Auto-rotating carousel with fade transitions.
 * Scroll-triggered fade-in animation.
 */

// Scroll-triggered fade-in animation
const { target: sectionTarget, isVisible: sectionIsVisible } = useIntersectionObserver()

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

// Carousel state
const currentIndex = ref(0)
const autoPlayInterval = ref<number | null>(null)
const AUTO_PLAY_DELAY = 5000 // 5 seconds

// Computed
const currentEndorsement = computed(() => endorsements[currentIndex.value])

// Methods
const goToEndorsement = (index: number) => {
  currentIndex.value = index
  resetAutoPlay()
}

const nextEndorsement = () => {
  currentIndex.value = (currentIndex.value + 1) % endorsements.length
  resetAutoPlay()
}

const previousEndorsement = () => {
  currentIndex.value = (currentIndex.value - 1 + endorsements.length) % endorsements.length
  resetAutoPlay()
}

const startAutoPlay = () => {
  stopAutoPlay()
  autoPlayInterval.value = window.setInterval(() => {
    nextEndorsement()
  }, AUTO_PLAY_DELAY)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

// Lifecycle
onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>

<template>
  <section
    id="endorsements"
    ref="sectionTarget"
    class="py-24 md:py-32 bg-white scroll-mt-20 transition-all duration-700"
    :class="{ 'opacity-0 translate-y-8': !sectionIsVisible }"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 text-teal-900">
        Community Endorsements
      </h2>

      <!-- Empty state -->
      <div v-if="endorsements.length === 0" class="text-center">
        <p class="text-xl text-gray-600">Endorsements coming soon!</p>
      </div>

      <!-- Carousel -->
      <div v-else class="max-w-4xl mx-auto">
        <div
          class="relative min-h-[250px]"
          @mouseenter="stopAutoPlay"
          @mouseleave="startAutoPlay"
        >
          <!-- Endorsement cards with fade transition -->
          <div class="relative overflow-hidden rounded-lg">
            <transition
              enter-active-class="transition-opacity duration-500"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-500"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              mode="out-in"
            >
              <blockquote
                v-if="currentEndorsement"
                :key="currentEndorsement.id"
                class="bg-gradient-to-br from-teal-50 to-white rounded-xl p-8 shadow-lg border-l-4 border-teal-800"
              >
                <!-- Quote -->
                <p class="text-xl italic mb-6 text-gray-700 leading-relaxed">
                  &ldquo;{{ currentEndorsement.quote }}&rdquo;
                </p>

                <!-- Source citation -->
                <cite class="not-italic block">
                  <strong class="text-gray-900 text-lg">{{ currentEndorsement.name }}</strong>
                  <span class="text-gray-600 block text-sm mt-1">
                    {{ currentEndorsement.title }}
                    <template v-if="currentEndorsement.organization">
                      • {{ currentEndorsement.organization }}
                    </template>
                  </span>
                </cite>
              </blockquote>
            </transition>
          </div>

          <!-- Navigation arrows -->
          <button
            @click="previousEndorsement"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 p-2 text-teal-800 hover:text-teal-600 transition-colors"
            aria-label="Previous endorsement"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            @click="nextEndorsement"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 p-2 text-teal-800 hover:text-teal-600 transition-colors"
            aria-label="Next endorsement"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <!-- Carousel indicators -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(_, index) in endorsements"
            :key="index"
            @click="goToEndorsement(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300',
              currentIndex === index ? 'bg-teal-800 w-8' : 'bg-teal-200 hover:bg-teal-400'
            ]"
            :aria-label="`Go to endorsement ${index + 1}`"
            :aria-current="currentIndex === index ? 'true' : undefined"
          />
        </div>
      </div>
    </div>
  </section>
</template>
