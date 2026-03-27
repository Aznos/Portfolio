import { useState, useEffect } from 'react'

const FULL_TEXT = 'Full-Stack Developer'
const TYPE_MS = 75
const DELETE_MS = 40
const PAUSE_AFTER_TYPE = 2800
const PAUSE_AFTER_DELETE = 500

export default function Hero() {
    const [displayed, setDisplayed] = useState('')
    const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('typing')

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>

        if(phase === 'typing') {
            if(displayed.length < FULL_TEXT.length) {
                t = setTimeout(() => setDisplayed(FULL_TEXT.slice(0, displayed.length + 1)), TYPE_MS)
            } else {
                setPhase('pausing')
            }
        } else if(phase === 'pausing') {
            t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
        } else if(phase === 'deleting') {
            if(displayed.length > 0) {
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
        <div className="relative min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-center text-7xl font-display font-bold text-text-primary tracking-widest select-none">
                MADDOX H.
            </h1>

            <div className="mt-4 h-9 flex items-center justify-center">
                <h2 className="text-2xl font-display font-bold text-text-secondary">
                    {displayed}
                    <span className="animate-pulse text-accent-primary ml-0.5">|</span>
                </h2>
            </div>

            <div className="mt-10 border border-border bg-bg-secondary px-6 py-4 rounded-2xl hover:border-border-accent hover:bg-bg-tertiary transition-all duration-300 cursor-default">
                <p className="text-sm font-sans text-text-secondary text-center">
                    Building fast web apps, open-source tools, and games.
                </p>
                <p className="text-sm font-sans text-text-muted text-center mt-1">
                    Bachelor's CS &amp; Master's CS (in progress)
                </p>
            </div>

            <div className="flex flex-row mt-10 gap-5">
                <button className="bg-accent-primary px-7 py-3 rounded-2xl border border-border-accent
                                   text-text-primary font-mono text-sm
                                   hover:bg-accent-dim hover:-translate-y-0.5
                                   hover:shadow-[0_0_24px_#e84c1e55,0_0_48px_#e84c1e22]
                                   active:translate-y-0 transition-all duration-200">
                    View My Work
                </button>
                <button className="bg-bg-secondary px-7 py-3 rounded-2xl border border-border
                                   text-text-primary font-mono text-sm
                                   hover:bg-bg-tertiary hover:border-border-accent hover:-translate-y-0.5
                                   active:translate-y-0 transition-all duration-200">
                    GitHub
                </button>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-text-muted">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </div>
        </div>
    )
}