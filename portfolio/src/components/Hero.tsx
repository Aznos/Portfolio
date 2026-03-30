import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import ViewWorkButton from './hero/ViewWorkButton'
import GithubButton from './hero/GithubButton'
import { useParticles } from './hero/useParticles'
import { useTypewriter } from './hero/useTypewriter'

const TITLE_CHARS = 'MADDOX H.'.split('')

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const displayed = useTypewriter()

    useParticles(canvasRef)

    const mouseXPx   = useMotionValue(0)
    const mouseYPx   = useMotionValue(0)
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

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!heroRef.current) return
        const r = heroRef.current.getBoundingClientRect()
        mouseXPx.set(e.clientX - r.left)
        mouseYPx.set(e.clientY - r.top)
        mouseXNorm.set((e.clientX - r.left) / r.width - 0.5)
        mouseYNorm.set((e.clientY - r.top) / r.height - 0.5)
    }

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            onMouseMove={onMouseMove}
        >
            {/* Backgrounds */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.028 }}>
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
                    <feColorMatrix type="saturate" values="0"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)"/>
            </svg>
            <motion.div
                className="hidden md:block absolute pointer-events-none rounded-full"
                style={{
                    left: mouseXPx, top: mouseYPx,
                    translateX: '-50%', translateY: '-50%',
                    width: '900px', height: '900px',
                    background: 'radial-gradient(circle, rgba(232,76,30,0.1) 0%, transparent 65%)',
                }}
            />
            <div className="absolute pointer-events-none" style={{
                width: '600px', height: '600px',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -60%)',
                background: 'radial-gradient(circle, rgba(232,76,30,0.05) 0%, transparent 70%)',
            }} />

            {/* Title */}
            <motion.div style={{ x: titleX, y: titleY }} className="relative flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono select-none border border-accent-primary/25 bg-accent-primary/5 text-accent-primary"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                    Available for work
                </motion.div>
                <motion.h1
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055 } } }}
                    initial="hidden" animate="visible"
                    className="text-center text-5xl sm:text-7xl font-display font-bold text-text-primary tracking-widest select-none"
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

            {/* Typewriter */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ x: typewriterX, y: typewriterY }}
                className="relative mt-4 h-9 flex items-center justify-center"
            >
                <h2 className="text-xl sm:text-3xl font-display font-bold text-text-secondary">
                    {displayed}<span className="animate-pulse text-accent-primary ml-0.5">|</span>
                </h2>
            </motion.div>

            {/* Info card */}
            <motion.div style={{ x: cardX, y: cardY }}>
                <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-6 sm:mt-10 rounded-2xl cursor-default overflow-hidden"
                    style={{
                        background: 'linear-gradient(160deg, rgba(22,22,22,0.95) 0%, rgba(14,14,14,0.95) 100%)',
                        border: '1px solid rgba(255,255,255,0.055)',
                        boxShadow: '0 2px 0 rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e84c1e55] to-transparent" />
                    <div className="px-5 py-4 sm:px-8 sm:py-5 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <span className="shrink-0 text-accent-primary" style={{ fontSize: '9px', lineHeight: 1 }}>{'>'}</span>
                            <p className="text-sm font-sans text-text-secondary">Building fast web apps, open-source tools, and games.</p>
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

            {/* Buttons */}
            <motion.div style={{ x: buttonsX, y: buttonsY }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-row mt-6 sm:mt-10 gap-5"
                >
                    <ViewWorkButton />
                    <GithubButton />
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </motion.div>
        </div>
    )
}
