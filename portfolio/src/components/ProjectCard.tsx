import type { ProjectData } from './projects/types'
import { motion } from 'framer-motion'
import { GitBranch, ExternalLink, Download, Star } from 'lucide-react'

interface ProjectCardProps {
  data: ProjectData
  side: 'left' | 'right'
  index: number
}

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

export default function ProjectCard({ data, side, index }: ProjectCardProps) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { type: 'spring', damping: 20, stiffness: 120, delay: index * 0.1 },
      }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { type: 'spring', damping: 15, stiffness: 200 } }}
    >
      <div
        className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: '0 0 20px #e84c1e44, 0 0 40px #e84c1e22' }}
      />

      <div className="relative w-full rounded-lg border border-border bg-bg-secondary p-4 overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #e84c1e55, transparent)' }}
        />

        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="font-display text-sm font-bold text-text-primary leading-tight">
            {data.name}
          </span>
          {data.year !== undefined && (
            <span className="font-mono text-xs text-text-muted shrink-0 mt-0.5">
              {data.year}
            </span>
          )}
        </div>

        {data.featured && (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-accent-primary border border-border-accent rounded px-1.5 py-0.5 mb-2">
            <Star size={9} />
            FEATURED
          </span>
        )}

        {data.description && (
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mt-1 mb-2">
            {data.description}
          </p>
        )}

        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {data.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[10px] border border-border bg-bg-tertiary text-text-muted px-2 py-0.5 rounded hover:border-border-accent hover:text-accent-primary transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(data.githubUrl !== undefined || data.liveUrl !== undefined || data.downloads !== undefined) && (
          <div className="pt-3 border-t border-border flex items-center gap-2 flex-wrap">
            {data.githubUrl !== undefined && (
              <a
                href={data.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border border-border bg-bg-tertiary text-text-secondary hover:border-border-accent hover:text-accent-primary transition-colors"
              >
                <GitBranch size={13} />
                GitHub
              </a>
            )}
            {data.liveUrl !== undefined && (
              <a
                href={data.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border border-border-accent bg-bg-tertiary text-accent-primary hover:bg-accent-primary hover:text-bg-primary transition-colors"
              >
                <ExternalLink size={13} />
                Live
              </a>
            )}
            {data.downloads !== undefined && (
              <span className="ml-auto flex items-center gap-1 font-mono text-xs text-text-muted">
                <Download size={11} />
                {formatDownloads(data.downloads)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
