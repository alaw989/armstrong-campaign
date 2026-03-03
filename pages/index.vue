<template>
  <!-- Performance resource hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Hero Section (above fold - eager load) -->
  <HeroSection />

  <!-- About Section (above fold - eager load) -->
  <AboutSection />

  <!-- Why I'm Running Section (above fold - eager load) -->
  <WhyRunningSection />

  <!-- Platform Section (below fold - lazy load) -->
  <LazyPlatformSection />

  <!-- Gallery Section (below fold - lazy load) -->
  <LazyGallerySection />

  <!-- Team Members (below fold - lazy load) -->
  <LazyMembersSection />

  <!-- Endorsements (below fold - lazy load) -->
  <LazyEndorsementsSection />

  <!-- Contact Section (below fold - lazy load) -->
  <LazyContactSection />
</template>

<script setup lang="ts">
// Structured data for SEO (JSON-LD)
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Xzandria Armstrong',
  jobTitle: 'Houston County Board of Education Candidate',
  description: 'Leadership for Houston County, GA. Learn about Xzandria Armstrong\'s platform, vision, and campaign.',
  url: 'https://armstrongforhouston.com',
  image: 'https://armstrongforhouston.com/images/campaign.jpg',
  worksFor: {
    '@type': 'Organization',
    name: 'Armstrong for Houston County Committee'
  },
  knowsAbout: [
    'Education',
    'Houston County',
    'Community Leadership',
    'Public Service'
  ]
}

useHead({
  title: 'Xzandria Armstrong for Houston County - Leadership for Our Community',
  meta: [
    { name: 'description', content: 'Leadership for Houston County, GA. Support Xzandria Armstrong\'s campaign for progress, integrity, and community.' },
    // Open Graph tags
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Xzandria Armstrong for Houston County' },
    { property: 'og:title', content: 'Xzandria Armstrong for Houston County' },
    { property: 'og:description', content: 'Leadership for Houston County, GA. Support Xzandria Armstrong\'s campaign for progress, integrity, and community.' },
    { property: 'og:image', content: '/images/candidate-portrait.svg' },
    { property: 'og:url', content: 'https://armstrongforhouston.com/' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Xzandria Armstrong for Houston County' },
    { name: 'twitter:description', content: 'Leadership for Houston County, GA. Support Xzandria Armstrong\'s campaign.' },
    { name: 'twitter:image', content: '/images/candidate-portrait.svg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://armstrongforhouston.com/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(structuredData)
    }
  ]
})
</script>
