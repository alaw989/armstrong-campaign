<script setup lang="ts">
/**
 * AboutSection Component
 *
 * About section displaying candidate bio and vision.
 * Follows diijondacosta.com About pattern with clean typography.
 *
 * Features:
 * - Section ID for Navigation scroll spy
 * - Three subsections: Who I Am, Why I'm Running, My Vision
 * - Readable typography with proper hierarchy
 * - Max-width constraint for readability
 */

const config = useAppConfig()

// About content from config (with defaults)
const aboutContent = computed(() => (config as any).about || {
  title: 'Meet Xzandria Armstrong',
  who: `Xzandria Armstrong is a lifelong Houston County resident with deep roots in our community. A product of our public schools and a graduate of Houston County High School, she understands the challenges and opportunities facing our families.

After earning her degree from Georgia Southern University, Xzandria returned to Houston County to build her life and career here. She has worked in education and local business, giving her firsthand experience with the issues that matter most to our community.`,
  why: `I'm running for Houston County because I believe in our community's potential. I've seen families struggling to make ends meet, teachers working hard with limited resources, and small businesses trying to recover from difficult times.

We need leadership that listens to residents and puts people before politics. I'm running to ensure every voice in Houston County is heard and every family has the opportunity to thrive.`,
  vision: `Together, we can build a Houston County where every child receives a quality education, every neighborhood is safe, and every family has access to good jobs and healthcare. A community that honors its past while building a brighter future for the next generation.

My vision is of a Houston County that works for everyone — where opportunity is abundant, leaders are accountable, and progress lifts up all our residents.`
})
</script>

<template>
  <section
    id="about"
    class="py-20 scroll-mt-20"
  >
    <div class="container mx-auto px-4">
      <!-- Section heading -->
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-900">
        {{ aboutContent.title }}
      </h2>

      <!-- Two-column layout -->
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <!-- Left: Photo -->
        <div class="flex justify-center md:justify-start">
          <NuxtImg
            src="/images/candidate-portrait.jpg"
            :alt="aboutContent.title"
            class="rounded-2xl shadow-xl w-full max-w-sm aspect-[4/5] object-cover"
            loading="lazy"
            format="webp"
          />
        </div>

        <!-- Right: Content -->
        <div class="space-y-10">
          <!-- Who I Am subsection -->
          <div class="border-l-4 border-teal-800 pl-4">
            <h3 class="text-xl font-semibold mb-3 text-teal-800">
              Who I Am
            </h3>
            <p class="text-base leading-relaxed text-gray-700 whitespace-pre-line">
              {{ aboutContent.who }}
            </p>
          </div>

          <!-- Why I'm Running subsection -->
          <div class="border-l-4 border-teal-800 pl-4">
            <h3 class="text-xl font-semibold mb-3 text-teal-800">
              Why I'm Running
            </h3>
            <p class="text-base leading-relaxed text-gray-700 whitespace-pre-line">
              {{ aboutContent.why }}
            </p>
          </div>

          <!-- My Vision subsection -->
          <div class="border-l-4 border-teal-800 pl-4">
            <h3 class="text-xl font-semibold mb-3 text-teal-800">
              My Vision
            </h3>
            <p class="text-base leading-relaxed text-gray-700 whitespace-pre-line">
              {{ aboutContent.vision }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
