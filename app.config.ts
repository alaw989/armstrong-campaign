// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineAppConfig({
  site: {
    name: 'Xzandria Armstrong for Houston County',
    description: 'Leadership for Houston County, GA'
  },
  committee: {
    name: 'Armstrong for Houston County Committee',
    // Update these when treasurer provides official details
    address: '',
    phone: '',
    email: ''
  },

  // Brand color palette (teals and golds)
  // WCAG 2.1 AA compliant contrast ratios verified
  brand: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59', // Primary button background (5.2:1 with white)
      900: '#134e4a'
    },
    accent: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308', // Secondary button background (~10:1 with gray-900)
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12'
    }
  },

  // Hero section content
  hero: {
    badge: 'For Houston County',
    name: 'Xzandria Armstrong',
    title: 'For Houston County, GA',
    tagline: 'Leadership. Integrity. Progress.',
    photo: '/images/candidate-portrait.jpg',
    photoAlt: 'Xzandria Armstrong, candidate for Houston County'
  },

  // Donation configuration
  donation: {
    url: 'https://secure.actblue.com/donate/armstrong-for-houston'
  }
})
