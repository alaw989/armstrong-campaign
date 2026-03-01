<script setup lang="ts">
/**
 * PlatformSection Component
 *
 * Platform/Issues section displaying candidate positions in horizontal snap-scroll carousel.
 * The District 4 Blueprint: Knowledge is Power
 *
 * Features:
 * - Section ID for Navigation scroll spy
 * - Scroll-triggered fade-in animation
 * - Numbered cards with gradient icon backgrounds
 * - Floating background shapes for visual interest
 * - Enhanced hover effects and animations
 * - Horizontal snap-scroll carousel with dot indicators
 * - Previous/Next navigation buttons
 */

// Scroll-triggered fade-in animation
const { target: sectionTarget, isVisible: sectionIsVisible } = useIntersectionObserver()

interface PlatformPosition {
  id: string
  title: string
  tagline: string
  points: string[]
  icon: string
}

// Carousel state
const carouselRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const totalCards = 5
const cardRefs = ref<HTMLElement[]>([])

// Drag state
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

// Set up refs for cards
const setCardRef = (el: any, index: number) => {
  if (el) {
    cardRefs.value[index] = el
  }
}

// Mouse drag handlers
const onMouseDown = (e: MouseEvent) => {
  if (!carouselRef.value) return
  isDragging.value = true
  startX.value = e.pageX - carouselRef.value.offsetLeft
  scrollLeft.value = carouselRef.value.scrollLeft
  carouselRef.value.style.cursor = 'grabbing'
  carouselRef.value.style.userSelect = 'none'
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !carouselRef.value) return
  e.preventDefault()
  const x = e.pageX - carouselRef.value.offsetLeft
  const walk = (x - startX.value) * 2 // Scroll speed multiplier
  carouselRef.value.scrollLeft = scrollLeft.value - walk
}

const onMouseUp = () => {
  if (!carouselRef.value) return
  isDragging.value = false
  carouselRef.value.style.cursor = ''
  carouselRef.value.style.userSelect = ''
}

const onMouseLeave = () => {
  if (!carouselRef.value) return
  isDragging.value = false
  carouselRef.value.style.cursor = ''
  carouselRef.value.style.userSelect = ''
}

// Scroll to specific card
const scrollToCard = (index: number) => {
  activeIndex.value = index // Update immediately for button feedback
  if (!carouselRef.value) return
  const card = cardRefs.value[index]
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
}

// Previous/Next navigation
const previousCard = () => {
  const newIndex = Math.max(0, activeIndex.value - 1)
  scrollToCard(newIndex)
}

const nextCard = () => {
  const newIndex = Math.min(totalCards - 1, activeIndex.value + 1)
  scrollToCard(newIndex)
}

// Handle scroll to update activeIndex based on which card is centered
let scrollTimeout: ReturnType<typeof setTimeout> | null = null
const onScroll = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    if (!carouselRef.value) return
    const containerCenter = carouselRef.value.scrollLeft + carouselRef.value.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Infinity

    cardRefs.value.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(containerCenter - cardCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })
    activeIndex.value = closestIndex
  }, 50)
}

// Platform positions data - District 4 Blueprint
const positions: PlatformPosition[] = [
  {
    id: 'literacy',
    title: 'Literacy is the Foundation',
    tagline: 'If a child can\'t read, we\'ve already closed the door on them.',
    points: [
      '<strong>District 4 Reads:</strong> Reading intervention specialists and literacy coaches in our schools - not just in an office.',
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
    tagline: 'District 4 maps show where the money is - and where it isn\'t.',
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
      '"In-Co" Partners - International and Community partnerships that invest in our kids.',
      'Fighting for after-school programs, trafficking awareness, and adult literacy foundations.',
      'Ensuring District 4 classrooms get the resources they need.'
    ],
    icon: '🤝'
  }
]
</script>

<template>
  <section
    id="platform"
    ref="sectionTarget"
    class="py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden scroll-mt-20 transition-all duration-700"
    :class="{ 'opacity-0 translate-y-8': !sectionIsVisible }"
    aria-label="Platform positions"
  >
    <!-- Floating background shapes -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-pulse-slow" />
      <div class="absolute bottom-20 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s" />
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/5 to-transparent rounded-full" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section heading -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block text-sm font-semibold tracking-wider uppercase text-teal-400 mb-3 animate-fade-in">
          The District 4 Blueprint
        </span>
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white relative">
          <span class="relative z-10">Knowledge is Power</span>
          <!-- Underline decoration -->
          <span class="absolute bottom-1 left-0 w-full h-3 bg-teal-500/50 -z-0 rounded-full"></span>
        </h2>
        <p class="text-xl text-slate-300 italic leading-relaxed relative">
          <span class="relative z-10">
            "Our district can't be the best unless every child can read. Educating the public is the key to our democracy and the loudest voice against violence."
          </span>
          <!-- Large decorative quote mark -->
          <span class="absolute top-0 left-0 text-9xl text-teal-500/10 -translate-x-2 -translate-y-4 font-serif">"</span>
        </p>
      </div>

      <!-- Carousel with navigation buttons -->
      <div class="relative mb-8">
        <!-- Previous button (hidden on mobile, shown on desktop) -->
        <button
          @click="previousCard"
          :disabled="activeIndex === 0"
          class="nav-button hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 items-center justify-center rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 text-teal-400 hover:bg-teal-500 hover:text-white hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-lg"
          :class="{ 'opacity-0': activeIndex === 0 }"
          aria-label="Previous platform position"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <!-- Next button (hidden on mobile, shown on desktop) -->
        <button
          @click="nextCard"
          :disabled="activeIndex === totalCards - 1"
          class="nav-button hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 items-center justify-center rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 text-teal-400 hover:bg-teal-500 hover:text-white hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-lg"
          :class="{ 'opacity-0': activeIndex === totalCards - 1 }"
          aria-label="Next platform position"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <!-- Snap scroll container -->
        <div
          ref="carouselRef"
          @scroll="onScroll"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseLeave"
          class="carousel-container flex gap-6 overflow-x-auto px-4 py-4 -mx-4 cursor-grab active:cursor-grabbing"
          role="list"
          aria-label="Platform positions. Use arrow keys, swipe, or drag to navigate."
        >
          <article
            v-for="(position, index) in positions"
            :key="position.id"
            :ref="(el: any) => setCardRef(el, index)"
            class="carousel-card group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-700/50 hover:border-teal-500/30"
            role="listitem"
          >
            <!-- Number badge -->
            <span class="absolute -top-4 -right-4 text-7xl font-bold text-slate-700 group-hover:text-teal-600/30 transition-colors z-0">
              0{{ index + 1 }}
            </span>

            <!-- Gradient icon container -->
            <div class="relative z-10 w-16 h-16 mb-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl" aria-hidden="true">{{ position.icon }}</span>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-teal-200 transition-colors">
              {{ position.title }}
            </h3>

            <!-- Tagline -->
            <p class="text-base text-teal-400 font-medium mb-6 italic">
              {{ position.tagline }}
            </p>

            <!-- Bullet points -->
            <ul class="space-y-3 text-slate-300">
              <li
                v-for="(point, idx) in position.points"
                :key="idx"
                class="flex gap-3"
              >
                <span class="text-teal-500 mt-1 flex-shrink-0">•</span>
                <span v-html="point" class="text-sm leading-relaxed" />
              </li>
            </ul>

            <!-- Hover accent border -->
            <div class="absolute inset-0 rounded-2xl border-2 border-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </article>
        </div>

        <!-- Dot navigation -->
        <div class="flex justify-center items-center gap-3 mt-4" role="tablist" aria-label="Platform position navigation">
          <button
            v-for="(_, index) in positions"
            :key="index"
            @click="scrollToCard(index)"
            :aria-label="`Go to platform position ${index + 1}`"
            :aria-selected="activeIndex === index"
            role="tab"
            class="dot-indicator transition-all duration-300 rounded-full"
            :class="activeIndex === index
              ? 'bg-teal-400 w-8'
              : 'bg-slate-600 hover:bg-slate-500 w-3'"
          />
          <span class="ml-2 text-sm text-slate-400 font-medium">
            {{ activeIndex + 1 }} / {{ totalCards }}
          </span>
        </div>
      </div>

      <!-- Donate CTA -->
      <div class="text-center">
        <p class="text-lg text-slate-300 mb-6">
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
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

/* Snap scroll container */
.carousel-container {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  scroll-padding: 0 50%;
  scroll-behavior: auto;
  touch-action: pan-x;
  overscroll-behavior: x contain;
  cursor: grab;
}

.carousel-container:active {
  cursor: grabbing;
}

.carousel-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.carousel-container {
  -ms-overflow-style: none;
}

/* Each card snaps into view */
.carousel-card {
  flex: 0 0 auto;
  scroll-snap-align: center;
  width: min(85vw, 420px);
  max-width: 420px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

.carousel-card * {
  user-select: none;
  -webkit-user-select: none;
}

@media (min-width: 768px) {
  .carousel-card {
    width: min(45vw, 420px);
  }
}

@media (min-width: 1024px) {
  .carousel-card {
    width: min(32vw, 420px);
  }
}

/* Dot indicator */
.dot-indicator {
  height: 0.75rem;
  cursor: pointer;
}

.dot-indicator:focus-visible {
  outline: 2px solid teal-400;
  outline-offset: 2px;
}

/* Nav button cursor */
.nav-button {
  cursor: pointer;
}

.nav-button:disabled {
  cursor: not-allowed;
}
</style>
