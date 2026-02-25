<template>
  <!-- Performance resource hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Hero Section -->
  <section id="hero">
    <HeroSection />
  </section>

  <!-- About Section -->
  <section id="about">
    <AboutSection />
  </section>

  <!-- Platform Section -->
  <section id="platform">
    <PlatformSection />
  </section>

  <!-- Gallery Section (placeholder) -->
  <section id="gallery">
    <GallerySection />
  </section>

  <!-- Team Members -->
  <section id="team">
    <MembersSection />
  </section>

  <!-- Endorsements -->
  <section id="endorsements">
    <EndorsementsSection />
  </section>

  <!-- Contact Section (placeholder) -->
  <section id="contact">
    <ContactSection />
  </section>
</template>

<script setup lang="ts">
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
  ]
})
</script>
