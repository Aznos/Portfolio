import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const FULL_TEXT = 'Full-Stack Developer'
const TYPE_MS = 75
const DELETE_MS = 40
const PAUSE_AFTER_TYPE = 2800
const PAUSE_AFTER_DELETE = 500

const TITLE_CHARS = 'MADDOX H.'.split('')

function ViewWorkButton() {
    return (
        <motion.button
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
                rest: {
                    y: 0,
                    boxShadow: [
                        'inset 0 1px 0 rgba(255,255,255,0.22)',
                        'inset 0 -1px 0 rgba(0,0,0,0.18)',
                        '0 4px 0 #6b1c06',
                        '0 6px 18px rgba(232,76,30,0.28)',
                        '0 10px 32px rgba(0,0,0,0.38)',
                    ].join(', '),
                },
                hover: {
                    y: -5,
                    boxShadow: [
                        'inset 0 1px 0 rgba(255,255,255,0.28)',
                        'inset 0 -1px 0 rgba(0,0,0,0.18)',
                        '0 7px 0 #6b1c06',
                        '0 12px 32px rgba(232,76,30,0.5)',
                        '0 16px 44px rgba(0,0,0,0.48)',
                    ].join(', '),
                },
                tap: {
                    y: 2,
                    boxShadow: [
                        'inset 0 1px 0 rgba(255,255,255,0.15)',
                        'inset 0 -1px 0 rgba(0,0,0,0.18)',
                        '0 2px 0 #6b1c06',
                        '0 3px 10px rgba(232,76,30,0.2)',
                        '0 4px 16px rgba(0,0,0,0.3)',
                    ].join(', '),
                },
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="relative overflow-hidden px-7 py-3 rounded-2xl font-mono text-sm text-white cursor-pointer select-none"
            style={{
                background: 'linear-gradient(180deg, #f26535 0%, #e84c1e 52%, #bf3a12 100%)',
                border: '1px solid rgba(232,76,30,0.7)',
                borderBottom: '0px',
            }}
        >
            <span className="relative z-10">View My Work</span>
        </motion.button>
    )
}

function GithubButton() {
    const ref = useRef<HTMLButtonElement>(null)
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
        <motion.button
            ref={ref}
            onMouseMove={(e) => {
                if (!ref.current) return
                const r = ref.current.getBoundingClientRect()
                mouseX.set(e.clientX - r.left)
                mouseY.set(e.clientY - r.top)
            }}
            onMouseEnter={() => {
                setHovered(true)
                animate(spotlightOpacity, 1, { duration: 0.2 })
            }}
            onMouseLeave={() => {
                setHovered(false)
                animate(spotlightOpacity, 0, { duration: 0.25 })
            }}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
                rest: {
                    y: 0,
                    boxShadow: '0 3px 0 #060606, 0 4px 14px rgba(0,0,0,0.38)',
                },
                hover: {
                    y: -5,
                    boxShadow: '0 6px 0 #060606, 0 10px 26px rgba(0,0,0,0.42), 0 0 22px rgba(232,76,30,0.1)',
                },
                tap: {
                    y: 2,
                    scale: 0.98,
                    boxShadow: '0 1px 0 #060606, 0 2px 8px rgba(0,0,0,0.3)',
                },
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
        </motion.button>
    )
}

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    opacity: number
    size: number
}

const PARTICLE_COUNT = 70
const LINK_DISTANCE = 140
const GRAB_DISTANCE = 160
const SPEED = 0.45

function makeParticle(w: number, h: number): Particle {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        opacity: 0.12 + Math.random() * 0.28,
        size: 1 + Math.random() * 1.5,
    }
}

export default function Hero() {
    const [displayed, setDisplayed] = useState('')
    const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('typing')
    const heroRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const mouseXPx = useMotionValue(0)
    const mouseYPx = useMotionValue(0)

    const mouseXNorm = useMotionValue(0)
    const mouseYNorm = useMotionValue(0)

    const titleX      = useTransform(mouseXNorm, v => v * -18)
    const titleY      = useTransform(mouseYNorm, v => v * -12)
    const typewriterX = useTransform(mouseXNorm, v => v * -10)
    const typewriterY = useTransform(mouseYNorm, v => v * -7)
    const cardX       = useTransform(mouseXNorm, v => v * 8)
    const cardY       = useTransform(mouseYNorm, v => v * 5)
    const buttonsX    = useTransform(mouseXNorm, v => v * 5)
    const buttonsY    = useTransform(mouseYNorm, v => v * 3)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = canvas.offsetWidth
        let height = canvas.offsetHeight
        canvas.width = width
        canvas.height = height

        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(width, height))

        const cursor = { x: -9999, y: -9999 }
        const onMouseMove = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect()
            cursor.x = e.clientX - r.left
            cursor.y = e.clientY - r.top
        }
        const onMouseLeave = () => { cursor.x = -9999; cursor.y = -9999 }
        const onClick = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect()
            const cx = e.clientX - r.left
            const cy = e.clientY - r.top
            for (let i = 0; i < 3; i++) {
                const p = makeParticle(width, height)
                p.x = cx
                p.y = cy
                particles.push(p)
            }

            while (particles.length > PARTICLE_COUNT + 60) particles.shift()
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseleave', onMouseLeave)
        window.addEventListener('click', onClick)

        let animId: number

        function draw() {
            ctx!.clearRect(0, 0, width, height)

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < LINK_DISTANCE) {
                        const alpha = 0.1 * (1 - dist / LINK_DISTANCE)
                        ctx!.beginPath()
                        ctx!.strokeStyle = `rgba(232,76,30,${alpha})`
                        ctx!.lineWidth = 1
                        ctx!.moveTo(particles[i].x, particles[i].y)
                        ctx!.lineTo(particles[j].x, particles[j].y)
                        ctx!.stroke()
                    }
                }
            }

            for (const p of particles) {
                const dx = p.x - cursor.x
                const dy = p.y - cursor.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < GRAB_DISTANCE) {
                    const alpha = 0.45 * (1 - dist / GRAB_DISTANCE)
                    ctx!.beginPath()
                    ctx!.strokeStyle = `rgba(232,76,30,${alpha})`
                    ctx!.lineWidth = 1
                    ctx!.moveTo(cursor.x, cursor.y)
                    ctx!.lineTo(p.x, p.y)
                    ctx!.stroke()
                }
            }

            for (const p of particles) {
                p.x += p.vx
                p.y += p.vy
                if (p.x < 0) p.x += width
                if (p.x > width) p.x -= width
                if (p.y < 0) p.y += height
                if (p.y > height) p.y -= height

                ctx!.beginPath()
                ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx!.fillStyle = `rgba(255,255,255,${p.opacity})`
                ctx!.fill()
            }

            animId = requestAnimationFrame(draw)
        }

        draw()

        const observer = new ResizeObserver(() => {
            width = canvas.offsetWidth
            height = canvas.offsetHeight
            canvas.width = width
            canvas.height = height
        })
        observer.observe(canvas)

        return () => {
            cancelAnimationFrame(animId)
            observer.disconnect()
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseleave', onMouseLeave)
            window.removeEventListener('click', onClick)
        }
    }, [])

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>

        if (phase === 'typing') {
            if (displayed.length < FULL_TEXT.length) {
                t = setTimeout(() => setDisplayed(FULL_TEXT.slice(0, displayed.length + 1)), TYPE_MS)
            } else {
                setPhase('pausing')
            }
        } else if (phase === 'pausing') {
            t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
        } else if (phase === 'deleting') {
            if (displayed.length > 0) {
                t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_MS)
            } else {
                setPhase('waiting')
            }
        } else {
            t = setTimeout(() => setPhase('typing'), PAUSE_AFTER_DELETE)
        }

        return () => clearTimeout(t)
    }, [displayed, phase])

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            onMouseMove={(e) => {
                if (!heroRef.current) return
                const r = heroRef.current.getBoundingClientRect()
                mouseXPx.set(e.clientX - r.left)
                mouseYPx.set(e.clientY - r.top)
                mouseXNorm.set((e.clientX - r.left) / r.width - 0.5)
                mouseYNorm.set((e.clientY - r.top) / r.height - 0.5)
            }}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />

            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.028 }}>
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
                    <feColorMatrix type="saturate" values="0"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)"/>
            </svg>

            <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                    left: mouseXPx,
                    top: mouseYPx,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: '900px',
                    height: '900px',
                    background: 'radial-gradient(circle, rgba(232,76,30,0.1) 0%, transparent 65%)',
                }}
            />

            <div
                className="absolute pointer-events-none"
                style={{
                    width: '600px',
                    height: '600px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -60%)',
                    background: 'radial-gradient(circle, rgba(232,76,30,0.05) 0%, transparent 70%)',
                }}
            />

            <motion.div style={{ x: titleX, y: titleY }} className="relative flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono select-none"
                    style={{
                        border: '1px solid rgba(74,222,128,0.25)',
                        background: 'rgba(74,222,128,0.05)',
                        color: 'rgba(134,239,172,0.9)',
                    }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available for work
                </motion.div>

                <motion.h1
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.055 } },
                    }}
                    initial="hidden"
                    animate="visible"
                    className="text-center text-7xl font-display font-bold text-text-primary tracking-widest select-none"
                >
                    {TITLE_CHARS.map((ch, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                hidden: { y: -35, opacity: 0 },
                                visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 14 } },
                            }}
                            style={{ display: 'inline-block' }}
                        >
                            {ch === ' ' ? '\u00a0' : ch}
                        </motion.span>
                    ))}
                </motion.h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ x: typewriterX, y: typewriterY }}
                className="relative mt-4 h-9 flex items-center justify-center"
            >
                <h2 className="text-2xl font-display font-bold text-text-secondary">
                    {displayed}
                    <span className="animate-pulse text-accent-primary ml-0.5">|</span>
                </h2>
            </motion.div>

            <motion.div style={{ x: cardX, y: cardY }}>
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-10 rounded-2xl cursor-default overflow-hidden"
                    style={{
                        background: 'linear-gradient(160deg, rgba(22,22,22,0.95) 0%, rgba(14,14,14,0.95) 100%)',
                        border: '1px solid rgba(255,255,255,0.055)',
                        boxShadow: '0 2px 0 rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e84c1e55] to-transparent" />

                    <div className="px-8 py-5 flex flex-col gap-3 min-w-[320px]">
                        <div className="flex items-center gap-3">
                            <span className="shrink-0 text-accent-primary" style={{ fontSize: '9px', lineHeight: 1 }}>{'>'}</span>
                            <p className="text-sm font-sans text-text-secondary">
                                Building fast web apps, open-source tools, and games.
                            </p>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-[#282828] to-transparent" />
                        <div className="flex items-center gap-3">
                            <span className="shrink-0 text-text-muted" style={{ fontSize: '9px', lineHeight: 1 }}>-</span>
                            <p className="text-sm font-sans text-text-muted">
                                Bachelor's CS &nbsp;·&nbsp; Master's CS{' '}
                                <span className="text-xs italic opacity-60">(in progress)</span>
                            </p>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent" />
                </motion.div>
            </motion.div>

            <motion.div style={{ x: buttonsX, y: buttonsY }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-row mt-10 gap-5"
                >
                    <ViewWorkButton />
                    <GithubButton />
                </motion.div>
            </motion.div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-text-muted">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </div>
        </div>
    )
}