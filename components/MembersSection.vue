<script setup lang="ts">
/**
 * MembersSection Component
 *
 * Displays campaign team members in a responsive grid layout.
 * Each member has a photo, name, and role.
 * Handles empty state gracefully.
 */

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
    photo: '/images/team/jane-smith.jpg',
    alt: 'Jane Smith, Campaign Manager'
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'Treasurer',
    photo: '/images/team/john-doe.jpg',
    alt: 'John Doe, Treasurer'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    role: 'Volunteer Coordinator',
    photo: '/images/team/maria-garcia.jpg',
    alt: 'Maria Garcia, Volunteer Coordinator'
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Communications Director',
    photo: '/images/team/james-wilson.jpg',
    alt: 'James Wilson, Communications Director'
  }
]
</script>

<template>
  <section id="team" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-900">
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
          <img
            :src="member.photo"
            :alt="member.alt || `${member.name}, ${member.role}`"
            class="w-32 h-32 rounded-full mx-auto mb-4 object-cover bg-gray-200"
            loading="lazy"
          >

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
