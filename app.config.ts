// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineAppConfig({
  site: {
    name: 'Xzandria Armstrong for Houston County',
    description: 'Leadership for Houston County, GA',
    url: 'https://armstrongforhouston.com'
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
  },

  // Contact information
  // TODO: Update with campaign-provided final contact details before launch
  contact: {
    email: 'info@armstrongforhouston.com',
    phone: '(478) 555-0123',
    address: '123 Main Street, Warner Robins, GA 31088',
    volunteerEmail: 'volunteer@armstrongforhouston.com'
  },

  // Social media links
  // TODO: Update with actual campaign social media URLs before launch
  social: [
    {
      platform: 'Facebook',
      url: 'https://facebook.com/armstrongforhouston'
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/armstrongforhouston'
    }
  ],

  // About section content
  // TODO: Update with campaign-provided final content before launch
  about: {
    title: 'About Xzandria',
    who: `Xzandria Armstrong is a lifelong Houston County resident with deep roots in our community. A product of our public schools and a graduate of Houston County High School, she understands the challenges and opportunities facing our families.

After earning her degree from Georgia Southern University, Xzandria returned to Houston County to build her life and career here. She has worked in education and local business, giving her firsthand experience with the issues that matter most to our community.`,
    why: `I'm running for Houston County because I believe in our community's potential. I've seen families struggling to make ends meet, teachers working hard with limited resources, and small businesses trying to recover from difficult times.

We need leadership that listens to residents and puts people before politics. I'm running to ensure every voice in Houston County is heard and every family has the opportunity to thrive.`,
    vision: `Together, we can build a Houston County where every child receives a quality education, every neighborhood is safe, and every family has access to good jobs and healthcare. A community that honors its past while building a brighter future for the next generation.

My vision is of a Houston County that works for everyone — where opportunity is abundant, leaders are accountable, and progress lifts up all our residents.`
  },

  // Platform positions
  // TODO: Update with campaign-provided final content before launch
  platform: {
    title: 'My Platform',
    subtitle: "Here's where I stand on the issues that matter most to Houston County.",
    positions: [
      {
        id: 'education',
        title: 'Education',
        description: 'Investing in our schools and ensuring every child has access to quality education.',
        icon: '📚'
      },
      {
        id: 'economy',
        title: 'Economic Growth',
        description: 'Supporting local businesses and creating good-paying jobs for Houston County families.',
        icon: '💼'
      },
      {
        id: 'public-safety',
        title: 'Public Safety',
        description: 'Ensuring our neighborhoods are safe and supporting our first responders.',
        icon: '🛡️'
      },
      {
        id: 'infrastructure',
        title: 'Infrastructure',
        description: 'Improving roads, bridges, and broadband access for all communities.',
        icon: '🏗️'
      },
      {
        id: 'healthcare',
        title: 'Healthcare Access',
        description: 'Expanding access to quality healthcare and reducing costs for families.',
        icon: '🏥'
      }
    ]
  },

  // Team members
  // TODO: Replace with campaign-provided team information
  team: [
    {
      id: '1',
      name: 'Jane Smith',
      role: 'Campaign Manager',
      photo: '/images/team/jane-smith.svg'
    },
    {
      id: '2',
      name: 'John Doe',
      role: 'Treasurer',
      photo: '/images/team/john-doe.svg'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      role: 'Volunteer Coordinator',
      photo: '/images/team/maria-garcia.svg'
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Communications Director',
      photo: '/images/team/james-wilson.svg'
    }
  ],

  // Community endorsements
  // TODO: Replace with campaign-provided endorsements
  endorsements: [
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
})
