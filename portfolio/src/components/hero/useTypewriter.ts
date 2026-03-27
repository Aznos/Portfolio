import { useState, useEffect } from 'react'

const FULL_TEXT = 'Full-Stack Developer'
const TYPE_MS = 75
const DELETE_MS = 40
const PAUSE_AFTER_TYPE = 2800
const PAUSE_AFTER_DELETE = 500

type Phase = 'typing' | 'pausing' | 'deleting' | 'waiting'

export function useTypewriter() {
    const [displayed, setDisplayed] = useState('')
    const [phase, setPhase] = useState<Phase>('typing')

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

    return displayed
}
