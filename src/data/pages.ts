import { profile } from './profile'

// Shared by navigation, the About index, metadata, and the static build.
export const pages = [
  { path: '/', number: '01', title: 'About', description: profile.description, summary: '' },
  { path: '/projects/', number: '02', title: 'Projects', description: 'Projects by Haris Amir in machine learning, computer vision, and 3D perception.', summary: 'Projects I have built and worked on.' },
  { path: '/publications/', number: '03', title: 'Publications', description: 'Publications and research by Haris Amir.', summary: 'Collection of my research, explorations, and contributions.' },
  { path: '/contact/', number: '04', title: 'Contact', description: 'Connect with Haris Amir by email, LinkedIn, GitHub, or Google Scholar.', summary: 'Get in touch, explore my code, or follow my research.' },
]
