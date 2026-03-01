<script setup lang="ts">
/**
 * AboutSection Component
 *
 * About section with bio and platform highlights.
 */

const config = useAppConfig()

// Scroll-triggered fade-in animation
const { target: sectionTarget, isVisible: sectionIsVisible } = useIntersectionObserver()

// About content from config (with defaults)
const aboutContent = computed(() => (config as any).about || {
  title: 'Meet Xzandria Armstrong',
  subtitle: 'The Daughter of a Teacher. A Mother. Your Advocate.',
  bio: `Xzandria Armstrong is a lifelong Houston County resident with deep roots in our community. A product of our public schools and a graduate of Houston County High School, she understands the challenges and opportunities facing our families.

After earning her degree from Georgia Southern University, Xzandria returned to Houston County to build her life and career here. She has worked in education and local business, giving her firsthand experience with the issues that matter most to our community.`,
  platform: [
    { title: 'Education', description: 'Supporting our schools, teachers, and students to ensure every child receives a quality education.' },
    { title: 'Public Safety', description: 'Working to make every neighborhood safe with community-focused policing and investment in public services.' },
    { title: 'Economic Growth', description: 'Attracting good jobs and supporting local businesses to strengthen our local economy.' },
    { title: 'Healthcare Access', description: 'Ensuring every family has access to affordable, quality healthcare close to home.' },
    { title: 'Transparency', description: 'Open communication and accountable leadership that keeps residents informed and engaged.' },
    { title: 'Community', description: 'Building bridges across our community and ensuring every voice is heard and valued.' }
  ]
})

// Split bio into paragraphs
const bioParagraphs = computed(() => {
  const bio = (aboutContent.value as any).who || (aboutContent.value as any).bio || ''
  return typeof bio === 'string' ? bio.split('\n\n').filter(p => p.trim()) : [String(bio)]
})
</script>

<template>
  <section
    id="about"
    ref="sectionTarget"
    class="py-24 md:py-32 bg-white scroll-mt-20 transition-all duration-700"
    :class="{ 'opacity-0 translate-y-8': !sectionIsVisible }"
  >
    <div class="container mx-auto px-6 max-w-6xl">
      <!-- Section heading -->
      <div class="text-center mb-16 md:mb-20">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {{ aboutContent.title }}
        </h2>
        <p class="text-xl md:text-2xl text-teal-700 font-medium max-w-2xl mx-auto">
          {{ aboutContent.tagline }}
        </p>
      </div>

      <!-- Two Column Layout: Image + Bio -->
      <div class="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <!-- Image Column -->
        <div class="order-1 md:order-1">
          <div class="relative">
            <img
              src="/images/gallery/IMG_0046.JPG"
              :alt="aboutContent.title"
              class="w-full h-auto rounded-2xl shadow-xl"
              style="box-shadow: 0 25px 50px -12px rgba(13, 148, 136, 0.25);"
              loading="lazy"
            />
            <!-- Decorative accent -->
            <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-100 rounded-full -z-10 opacity-50" />
            <div class="absolute -top-4 -left-4 w-16 h-16 bg-teal-200 rounded-full -z-10 opacity-30" />
          </div>
        </div>

        <!-- Bio Column -->
        <div class="order-2 md:order-2 flex flex-col justify-center">
          <div class="space-y-6">
            <p
              v-for="(paragraph, index) in bioParagraphs"
              :key="`bio-${index}`"
              class="text-gray-700 leading-relaxed text-lg md:text-xl"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prose p {
  margin: 0;
}
</style>
