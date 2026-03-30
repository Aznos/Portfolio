import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function GithubButton() {
    const ref = useRef<HTMLAnchorElement>(null)
    const mouseX = useMotionValue(-999)
    const mouseY = useMotionValue(-999)
    const spotlightOpacity = useMotionValue(0)
    const [hovered, setHovered] = useState(false)

    const spotlightBg = useTransform(
        [mouseX, mouseY],
        ([x, y]: number[]) =>
            `radial-gradient(circle 100px at ${x}px ${y}px, rgba(232,76,30,0.22) 0%, transparent 70%)`
    )

    return (
        <motion.a
            ref={ref}
            href="https://github.com/aznos"
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={(e) => {
                if (!ref.current) return
                const r = ref.current.getBoundingClientRect()
                mouseX.set(e.clientX - r.left)
                mouseY.set(e.clientY - r.top)
            }}
            onMouseEnter={() => { setHovered(true); animate(spotlightOpacity, 1, { duration: 0.2 }) }}
            onMouseLeave={() => { setHovered(false); animate(spotlightOpacity, 0, { duration: 0.25 }) }}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
                rest:  { y: 0,  boxShadow: '0 3px 0 #060606, 0 4px 14px rgba(0,0,0,0.38)' },
                hover: { y: -5, boxShadow: '0 6px 0 #060606, 0 10px 26px rgba(0,0,0,0.42), 0 0 22px rgba(232,76,30,0.1)' },
                tap:   { y: 2, scale: 0.98, boxShadow: '0 1px 0 #060606, 0 2px 8px rgba(0,0,0,0.3)' },
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="relative overflow-hidden px-7 py-3 rounded-2xl font-mono text-sm text-text-primary cursor-pointer select-none"
            style={{
                background: '#111111',
                borderWidth: '2.5px',
                borderStyle: 'dotted',
                borderColor: hovered ? 'rgba(232,76,30,0.55)' : '#2a2a2a',
                transition: 'border-color 0.22s ease',
            }}
        >
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: spotlightBg, opacity: spotlightOpacity }}
            />
            <span className="relative z-10">GitHub</span>
        </motion.a>
    )
}
