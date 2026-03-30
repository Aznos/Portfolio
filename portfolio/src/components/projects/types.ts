export interface ProjectData {
  id: string
  name: string
  description?: string
  githubUrl?: string
  downloads?: number
  tags?: string[]
  liveUrl?: string
  year?: string | number
  featured?: boolean
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Personal developer portfolio built with React, TypeScript, Framer Motion, and Tailwind CSS v4.',
    githubUrl: 'https://github.com/aznos/Portfolio',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    year: 2025,
    featured: true,
  },
  {
    id: 'project-alpha',
    name: 'Project Alpha',
    description: 'An exciting project currently in development. Real details coming soon.',
    tags: ['TBD'],
    year: 2025,
    downloads: 1200,
  },
  {
    id: 'project-beta',
    name: 'Project Beta',
    description: 'Another project in the works. Stay tuned for updates.',
    githubUrl: 'https://github.com/aznos',
    liveUrl: 'https://aznos.dev',
    tags: ['React', 'Node.js', 'TypeScript'],
    year: 2024,
  },
]
