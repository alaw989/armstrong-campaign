<script setup lang="ts">
/**
 * MembersSection Component
 *
 * Displays campaign team members in a responsive grid layout.
 * Each member has a photo, name, and role.
 * Handles empty state gracefully.
 * Scroll-triggered fade-in animation.
 */

// Scroll-triggered fade-in animation
const { target: sectionTarget, isVisible: sectionIsVisible } = useIntersectionObserver()

interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  alt?: string
}

// TODO: Replace with campaign-provided team member information
const members: TeamMember[] = [
  {
    id: '1',
    name: 'Jane Smith',
    role: 'Campaign Manager',
    photo: '/images/team/jane-smith.svg',
    alt: 'Jane Smith, Campaign Manager'
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'Treasurer',
    photo: '/images/team/john-doe.svg',
    alt: 'John Doe, Treasurer'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    role: 'Volunteer Coordinator',
    photo: '/images/team/maria-garcia.svg',
    alt: 'Maria Garcia, Volunteer Coordinator'
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Communications Director',
    photo: '/images/team/james-wilson.svg',
    alt: 'James Wilson, Communications Director'
  }
]
</script>

<template>
  <section
    id="team"
    ref="sectionTarget"
    class="py-24 md:py-32 bg-gray-50 scroll-mt-20 transition-all duration-700"
    :class="{ 'opacity-0 translate-y-8': !sectionIsVisible }"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 text-teal-900">
        Meet the Team
      </h2>

      <!-- Empty state -->
      <div v-if="members.length === 0" class="text-center">
        <p class="text-xl text-gray-600">Team information coming soon!</p>
      </div>

      <!-- Team members grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <article
          v-for="member in members"
          :key="member.id"
          class="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:border-teal-600 transition-all border border-transparent"
        >
          <!-- Member photo -->
          <NuxtImg
            :src="member.photo"
            :alt="member.alt || `${member.name}, ${member.role}`"
            width="128"
            height="128"
            loading="lazy"
            format="webp"
            class="w-32 h-32 rounded-full mx-auto mb-4 object-cover bg-gray-200"
          />

          <!-- Member name -->
          <h3 class="font-semibold text-lg text-teal-900 mb-1">
            {{ member.name }}
          </h3>

          <!-- Member role -->
          <p class="text-teal-800 text-sm">
            {{ member.role }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
