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
    id: 'superenchants',
    name: 'Superenchants',
    description: 'A minecraft plugin with a data-driven system supporting 100+ custom enchantments',
    tags: ['Java', 'Kotlin', 'Data-Driven'],
    year: 2024,
    downloads: 55000,
    featured: true,
  },
  {
    id: 'bullet',
    name: 'Bullet',
    description: "A Minecraft server implementation written from scratch, improving on the vanilla server's performance and security",
      githubUrl: 'https://github.com/BulletMC/Bullet',
      tags: ['Low-Level', 'Packets', 'Networking', 'Security'],
    year: 2025,
  },
  {
    id: 'acorn',
    name: 'Acorn',
    description: 'A work in progress 2D game engine written from scratch using OpenGL, built for full control over performance',
    githubUrl: 'https://github.com/Acorn-engine/Acorn',
    tags: ['Game Engine', 'Kotlin', 'Low-Level'],
    year: 2026,
  },
]
