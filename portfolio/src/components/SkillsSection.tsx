import { motion } from 'framer-motion'

interface SkillCategory {
  category: string
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  { category: '// languages', skills: ['Kotlin', 'Java', 'TypeScript', 'JavaScript', 'C#', 'Python'] },
  { category: '// frontend', skills: ['React', 'SvelteKit', 'TailwindCSS', 'Vite', 'HTML/CSS', 'ShadCN'] },
  { category: '// backend & data', skills: ['Supabase', 'PostgreSQL', 'Node.js', 'ExpressJS', 'NextJS', 'Bun'] },
  { category: '// tools & platforms',   skills: ['Git', 'GitHub', 'Unity', 'IntelliJ IDEA', 'VSCode', 'Modrinth'] },
]

function SkillCard({ category, skills, index }: SkillCategory & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-bg-secondary border border-border rounded-lg p-6 overflow-hidden"
    >
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent-primary opacity-60" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent-primary opacity-60" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent-primary opacity-60" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent-primary opacity-60" />

      <p className="font-mono text-accent-primary text-xs tracking-widest mb-3">{category}</p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{ borderColor: '#e84c1e', color: '#f0f0f0' }}
            transition={{ duration: 0.15 }}
            className="bg-bg-tertiary border border-border text-text-secondary font-mono text-xs px-3 py-1 rounded cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative w-full py-20 bg-bg-primary overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(232,76,30,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6">
        <header className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-accent-primary tracking-widest text-sm mb-3"
          >
            {'// skills'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl font-bold text-text-primary"
          >
            SKILLS
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px mx-auto mt-4"
            style={{
              background: 'linear-gradient(to right, transparent, #e84c1e, transparent)',
              width: 200,
              transformOrigin: 'center',
            }}
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.category} {...cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
