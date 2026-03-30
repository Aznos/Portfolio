import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { Download, CalendarDays, FolderGit2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Stat {
  icon: LucideIcon
  value: number
  suffix: string
  label: string
  sub: string
}

const STATS: Stat[] = [
  {
    icon: Download,
    value: 70000,
    suffix: '+',
    label: 'Total Downloads',
    sub: 'Across modrinth, curseforge, and github',
  },
  {
    icon: CalendarDays,
    value: 7,
    suffix: '+',
    label: 'Years of Experience',
    sub: 'Building production-grade software',
  },
  {
    icon: FolderGit2,
    value: 25,
    suffix: '+',
    label: 'Projects Shipped',
    sub: 'Open source & professional work',
  },
]

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    Math.round(v).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, stat.value, {
        duration: 1.5,
        ease: 'easeOut',
      })
      return () => controls.stop()
    }
  }, [isInView, count, stat.value])

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateY.set(dx * 8)
    rotateX.set(-dy * 8)
  }

  function onMouseLeave() {
    animate(rotateX, 0, { duration: 0.4 })
    animate(rotateY, 0, { duration: 0.4 })
  }

  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{
          borderColor: '#e84c1e44',
          boxShadow: '0 0 30px #e84c1e33, inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
        transition={{ duration: 0.2 }}
        className="relative bg-bg-secondary border border-border rounded-lg p-6 cursor-default select-none overflow-hidden"
      >
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent-primary opacity-60" />
        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent-primary opacity-60" />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent-primary opacity-60" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent-primary opacity-60" />

        <div
          className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-md bg-bg-tertiary"
          style={{ boxShadow: '0 0 12px #e84c1e55' }}
        >
          <Icon size={20} className="text-accent-primary" />
        </div>

        <div className="font-display text-4xl font-bold text-text-primary mb-1">
          <motion.span>{rounded}</motion.span>
          <span className="text-accent-primary">{stat.suffix}</span>
        </div>

        <p className="font-sans text-sm uppercase tracking-widest text-text-secondary mb-3">
          {stat.label}
        </p>

        <div className="h-px bg-border mb-3" />

        <p className="font-mono text-xs text-text-muted">{stat.sub}</p>
      </motion.div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="relative w-full py-20 bg-bg-primary overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(232,76,30,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Section header */}
        <header className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-accent-primary tracking-widest text-sm mb-3"
          >
            {'// metrics'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-text-primary"
          >
            PERFORMANCE STATS
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
