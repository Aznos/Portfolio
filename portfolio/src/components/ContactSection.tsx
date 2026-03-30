import { motion } from 'framer-motion'
import { GitBranch, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const CONTACT_LINKS = [
  { icon: GitBranch,     label: 'GitHub',  handle: '@aznos',     href: 'https://github.com/aznos' },
  { icon: Mail,          label: 'Email',   handle: 'maddox.hughes.111@gmail.com', href: 'mailto:maddox.hughes.111@gmail.com'        },
] satisfies { icon: LucideIcon; label: string; handle: string; href: string }[]

function ContactCard({ icon: Icon, label, handle, href, index }: {
  icon: LucideIcon
  label: string
  handle: string
  href: string
  index: number
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{
          borderColor: '#e84c1e44',
          boxShadow: '0 0 30px #e84c1e33, inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
        transition={{ duration: 0.2 }}
        className="relative bg-bg-secondary border border-border rounded-lg p-6 text-center cursor-pointer overflow-hidden"
      >
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent-primary opacity-60" />
        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent-primary opacity-60" />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent-primary opacity-60" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent-primary opacity-60" />

        <div
          className="mx-auto mb-4 inline-flex items-center justify-center w-12 h-12 rounded-md bg-bg-tertiary"
          style={{ boxShadow: '0 0 16px #e84c1e55' }}
        >
          <Icon size={28} className="text-accent-primary" />
        </div>

        <p className="font-display text-sm uppercase tracking-widest text-text-primary mb-1">{label}</p>
        <p className="font-mono text-xs text-text-muted">{handle}</p>
      </motion.div>
    </motion.a>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-20 bg-bg-primary overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(232,76,30,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6">
        <header className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-accent-primary tracking-widest text-sm mb-3"
          >
            {'// contact'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-text-primary"
          >
            GET IN TOUCH
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CONTACT_LINKS.map((link, i) => (
            <ContactCard key={link.label} {...link} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="font-mono text-xs text-text-muted">
            © 2026 Maddox H. - Built with ❤️
          </p>
        </motion.div>
      </div>
    </section>
  )
}
