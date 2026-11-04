// Content source: Haris_Amir_resume_vi.pdf. Update dates explicitly as roles change.
export const profile = {
  name: 'Haris Amir',
  role: 'Machine Learning Engineer & Researcher',
  location: 'Berlin, Germany',
  email: 'harisamir4@gmail.com',
  github: 'https://github.com/HarisAmir',
  linkedin: 'https://www.linkedin.com/in/its-haris-amir/',
  scholar: 'https://scholar.google.com/citations?user=j-ZjEP8AAAAJ&hl=en',
  resume: '/Haris_Amir_resume_vi.pdf',
  url: 'https://harisamir.github.io',
  description: 'Haris Amir is a machine learning engineer in Berlin, working on 3D perception, computer vision, continual learning, and production ML systems.',
  introduction: 'Building intelligent systems to solve real-world problems.',
  about: 'I am passionate about exploring new ideas and using technology to solve real-world problems. My interests span machine learning, computer vision, LLMs, and agentic AI. I enjoy experimenting with new approaches, building intelligent systems, and turning ideas into practical solutions.',
  facts: [
    { label: 'Education', value: 'Master’s in Computer Science' },
    { label: 'Based in', value: 'Berlin, Germany' },
    { label: 'Status', value: 'Open for research & collaboration' },
  ],
}

export const contactLinks = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: 'its-haris-amir', href: profile.linkedin },
  { label: 'GitHub', value: 'HarisAmir', href: profile.github },
  { label: 'Google Scholar', value: 'Publications & citations', href: profile.scholar },
]

export const affiliations = [
  { name: 'Volkswagen', logo: '/affiliations/volkswagen.svg' },
  { name: 'DFKI', logo: '/affiliations/dfki-ric.png' },
  { name: 'RPTU', logo: '/affiliations/rptu.svg' },
]

// Homepage skills strip; keep this selection short enough to scan at a glance.
export const featuredSkills = [
  'Machine learning', 'Computer vision', '3D perception', 'PyTorch',
  'Transformers', 'Python', 'ROS 2', 'SLAM', 'Point clouds',
  'Docker', 'Azure ML', 'GPU computing',
]
