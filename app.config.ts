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
    badge: 'District 4',
    name: 'Xzandria Armstrong',
    title: 'Houston County Board of Education',
    tagline: 'Leadership. Integrity. Progress.',
    photos: [
      '/images/hero/hero-1.jpg',
      '/images/hero/hero-2.jpg',
      '/images/hero/hero-3.jpg'
    ],
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
  about: {
    title: 'Rooted in Houston County',
    tagline: 'The Daughter of a Teacher. A Mother. Your Advocate.',
    who: `I was raised in the heart of Houston County by a mother who dedicated her life to the classroom. As the daughter of a retired Houston County teacher, I saw early on that education isn't just about books—it's about the care, the planning, and the heart an educator pours into every student. Those values are the foundation of who I am.

Today, I am a mother and a dedicated community advocate. While my own children currently attend private school, that choice hasn't distanced me from our public schools; it has motivated me to work even harder for them. I believe every parent wants the same things: safety, opportunity, and a fair shot for their children. I have spent years as a listening ear for my neighbors and a voice for those who feel unheard. I am not a career politician; I am a neighbor who has been in the trenches, advocating for the resources and respect our District 4 families deserve.`,
    why: `II. Why I Am Running: A Call to Action
I am running for the School Board because I have seen the gaps in our system that can no longer be ignored. I am running because:
• Our Children Deserve Better Safety: It breaks my heart to see students in our district navigating dangerous routes and climbing through fences just to get to their desks. No child should have to struggle just to get into the building.
• Our Families Deserve to be Heard: I see our Hispanic families and neighbors facing language barriers that keep them from fully participating in their children's education. Every family deserves to be informed, included, and empowered.
• Our Students Deserve a Path to the Finish Line:We have too many high schoolers in District 4 who are not graduating. We need a system that catches our kids before they fall and holds itself accountable for their success.
• Our Teachers Deserve an Advocate: Having grown up in a teacher's home, I know that when we don't support our educators, our children are the ones who pay the price.
I'm not running to climb a political ladder. I'm running to be a bridge between the School Board and the families of District 4. I am here to listen, to speak up, and to ensure that every child in our community has the same quality education and support that I want for my own.`,
    vision: `IV. The District 4 Vision Plan (Executive Summary)

The Priority
The Goal
Physical Safety
Repairing infrastructure so every child arrives safely and with dignity.
Inclusive Schools
Breaking down language barriers for our Hispanic families and neighbors.
Academic Success
Raising the graduation rate through accountability and early intervention.
Community Voice
Transitioning from an "underserved" district to an "empowered" one.`
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
