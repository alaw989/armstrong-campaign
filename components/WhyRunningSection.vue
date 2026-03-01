<script setup lang="ts">
/**
 * WhyRunningSection Component
 *
 * Explains Xzandria Armstrong's motivation for running for School Board.
 */

// Scroll-triggered fade-in animation
const { target: sectionTarget, isVisible: sectionIsVisible } = useIntersectionObserver()

const reasons = [
  {
    title: 'Our Children Deserve Better Safety',
    text: "It breaks my heart to see students in our district navigating dangerous routes and climbing through fences just to get to their desks. No child should have to struggle just to get into the building."
  },
  {
    title: 'Our Families Deserve to be Heard',
    text: "I see our Hispanic families and neighbors facing language barriers that keep them from fully participating in their children's education. Every family deserves to be informed, included, and empowered."
  },
  {
    title: 'Our Students Deserve a Path to the Finish Line',
    text: "We have too many high schoolers in District 4 who are not graduating. We need a system that catches our kids before they fall and holds itself accountable for their success."
  },
  {
    title: 'Our Teachers Deserve an Advocate',
    text: "Having grown up in a teacher's home, I know that when we don't support our educators, our children are the ones who pay the price."
  }
]

// Staggered animation state - each item appears sequentially
const animatedIndices = ref<Set<number>>(new Set())

// Watch for visibility and animate items
watchEffect(() => {
  if (sectionIsVisible.value && animatedIndices.value.size === 0) {
    // Animate each reason in with staggered delay
    reasons.forEach((_, index) => {
      setTimeout(() => {
        animatedIndices.value.add(index)
      }, index * 150) // 150ms delay between each
    })
  }
})

// Fallback: ensure section is visible after 2 seconds
onMounted(() => {
  setTimeout(() => {
    if (animatedIndices.value.size === 0) {
      reasons.forEach((_, index) => {
        animatedIndices.value.add(index)
      })
    }
  }, 2000)
})
</script>

<template>
  <section
    id="why-running"
    ref="sectionTarget"
    class="py-24 md:py-32 scroll-mt-20 transition-all duration-700"
    style="background-color: #f5f5f4;"
    :class="{ 'opacity-0 translate-y-8': !sectionIsVisible }"
  >
    <div class="container mx-auto px-6 max-w-4xl">
      <!-- Section heading -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why I Am Running
        </h2>
        <p class="text-xl md:text-2xl text-teal-700 font-medium mb-6">
          A Call to Action
        </p>
        <p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          I am running for the School Board because I have seen the gaps in our system that can no longer be ignored. I am running because:
        </p>
      </div>

      <!-- Reasons list -->
      <div class="space-y-10 mb-16">
        <div
          v-for="(reason, index) in reasons"
          :key="index"
          class="flex gap-6 p-6 -mx-6 rounded-2xl transition-all duration-300 hover:bg-teal-50/50 hover:translate-x-1 cursor-default group"
          :class="{
            'opacity-0 translate-y-8': !animatedIndices.has(index),
            'opacity-100 translate-y-0': animatedIndices.has(index)
          }"
        >
          <!-- Bullet/checkmark icon -->
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mt-1 transition-all duration-300 group-hover:bg-teal-200 group-hover:scale-110">
              <svg
                class="w-5 h-5 text-teal-700 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-teal-700">
              {{ reason.title }}
            </h3>
            <p class="text-gray-700 text-lg leading-relaxed">
              {{ reason.text }}
            </p>
          </div>
        </div>
      </div>

      <!-- Closing statement -->
      <div class="text-center max-w-3xl mx-auto">
        <div class="bg-teal-50 rounded-2xl px-8 py-8 md:px-12 md:py-10">
          <p class="text-gray-800 text-lg md:text-xl leading-relaxed italic">
            I'm not running to climb a political ladder. I'm running to be a bridge between the School Board and the families of District 4. I am here to listen, to speak up, and to ensure that every child in our community has the same quality education and support that I want for my own.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#why-running {
  background-color: #f5f5f4 !important;
}
</style>
