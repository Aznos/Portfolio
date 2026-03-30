import { motion } from 'framer-motion'
import { PROJECTS } from './projects/types'
import TrunkSVG from './projects/TrunkSVG'
import ProjectCard from './ProjectCard'

const CONTAINER_W = 900
const FIRST_NODE_Y = 100
const CARD_SPACING_Y = 260
const BRANCH_REACH = 160
const CARD_WIDTH = 240
const TRUNK_X = CONTAINER_W / 2

export default function Projects() {
  const totalHeight = FIRST_NODE_Y + Math.max(0, PROJECTS.length - 1) * CARD_SPACING_Y + 200

  return (
    <section id="projects" className="relative w-full py-24 bg-bg-primary overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(232,76,30,0.04) 0%, transparent 60%)',
        }}
      />

      <header className="relative text-center mb-16 px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-accent-primary tracking-widest text-sm mb-3"
        >
          {'// my-work'}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl font-bold text-text-primary"
        >
          MY WORK
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

      <div
        className="hidden md:block relative mx-auto"
        style={{ width: CONTAINER_W, height: totalHeight }}
      >
        <TrunkSVG
          containerW={CONTAINER_W}
          trunkX={TRUNK_X}
          firstNodeY={FIRST_NODE_Y}
          cardSpacingY={CARD_SPACING_Y}
          branchReach={BRANCH_REACH}
          projectCount={PROJECTS.length}
          totalHeight={totalHeight}
        />
        {PROJECTS.map((p, i) => {
          const nodeY = FIRST_NODE_Y + i * CARD_SPACING_Y
          const isLeft = i % 2 === 0
          const cardLeft = isLeft
            ? TRUNK_X - BRANCH_REACH - CARD_WIDTH
            : TRUNK_X + BRANCH_REACH
          return (
            <div
              key={p.id}
              className="absolute"
              style={{ left: cardLeft, top: nodeY, transform: 'translateY(-50%)', width: CARD_WIDTH }}
            >
              <ProjectCard data={p} side={isLeft ? 'left' : 'right'} index={i} />
            </div>
          )
        })}
      </div>

      <div className="md:hidden flex flex-col gap-6 px-4">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} data={p} side="left" index={i} />
        ))}
      </div>
    </section>
  )
}
