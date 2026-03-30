import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface TrunkSVGProps {
  containerW: number
  trunkX: number
  firstNodeY: number
  cardSpacingY: number
  branchReach: number
  projectCount: number
  totalHeight: number
}

const CROWN_ANGLES = [-70, -48, -25, 0, 25, 48, 70]
const CROWN_LENGTH = 55

export default function TrunkSVG({
  containerW,
  trunkX,
  firstNodeY,
  cardSpacingY,
  branchReach,
  projectCount,
  totalHeight,
}: TrunkSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useInView(svgRef as React.RefObject<Element>, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      void controls.start('visible')
    }
  }, [inView, controls])

  const crownOriginY = firstNodeY - 80
  const lastNodeY = firstNodeY + Math.max(0, projectCount - 1) * cardSpacingY
  const trunkEnd = lastNodeY + 50
  const midY = (crownOriginY + trunkEnd) / 2
  const rootBaseY = trunkEnd
  const trunkPath = `M ${trunkX} ${crownOriginY} C ${trunkX - 25} ${midY} ${trunkX + 25} ${midY} ${trunkX} ${trunkEnd}`
  const rootPoints = [
    { dx: -60, dy: 38 },
    { dx: -28, dy: 52 },
    { dx: 28, dy: 52 },
    { dx: 60, dy: 38 },
  ]

  return (
    <svg
      ref={svgRef}
      width={containerW}
      height={totalHeight}
      className="absolute inset-0 pointer-events-none"
      overflow="visible"
    >
      <defs>
        <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e84c1e" />
          <stop offset="60%" stopColor="#e84c1e22" />
          <stop offset="100%" stopColor="#e84c1e00" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {rootPoints.map((r, i) => (
        <line
          key={i}
          x1={trunkX}
          y1={rootBaseY}
          x2={trunkX + r.dx}
          y2={rootBaseY + r.dy}
          stroke="#a33510"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
      ))}

      <motion.path
        d={trunkPath}
        stroke="url(#trunkGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { duration: 1.6, ease: 'easeInOut' } },
        }}
        initial="hidden"
        animate={controls}
      />

      {CROWN_ANGLES.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const endX = trunkX + CROWN_LENGTH * Math.sin(rad)
        const endY = crownOriginY - CROWN_LENGTH * Math.cos(rad)
        return (
          <motion.line
            key={i}
            x1={trunkX}
            y1={crownOriginY}
            x2={endX}
            y2={endY}
            stroke="#e84c1e"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: { duration: 0.5, delay: 0.3 + i * 0.07 },
              },
            }}
            initial="hidden"
            animate={controls}
          />
        )
      })}

      {Array.from({ length: projectCount }, (_, i) => {
        const nodeY = firstNodeY + i * cardSpacingY
        const isLeft = i % 2 === 0
        const bx = isLeft ? trunkX - branchReach - 6 : trunkX + branchReach + 6
        const cp1x = isLeft ? trunkX - branchReach * 0.25 : trunkX + branchReach * 0.25
        const cp2x = isLeft ? trunkX - branchReach * 0.7 : trunkX + branchReach * 0.7
        const branchPath = `M ${trunkX} ${nodeY} C ${cp1x} ${nodeY} ${cp2x} ${nodeY - 10} ${bx} ${nodeY}`

        return (
          <g key={i}>
            <motion.path
              d={branchPath}
              stroke="#e84c1e"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 0.4, delay: 0.9 + i * 0.15 },
                },
              }}
              initial="hidden"
              animate={controls}
            />
            <motion.circle
              cx={trunkX}
              cy={nodeY}
              r={6}
              fill="#e84c1e"
              filter="url(#glow)"
              variants={{
                hidden: { scale: 0 },
                visible: {
                  scale: 1,
                  transition: { type: 'spring', delay: 0.9 + i * 0.15 + 0.3 },
                },
              }}
              initial="hidden"
              animate={controls}
            />
          </g>
        )
      })}
    </svg>
  )
}
