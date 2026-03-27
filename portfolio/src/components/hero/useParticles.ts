import { useEffect, type RefObject } from 'react'

interface Particle {
    x: number; y: number
    vx: number; vy: number
    opacity: number; size: number
}

const COUNT = 70
const LINK_DIST = 140
const GRAB_DIST = 160
const SPEED = 0.45

function make(w: number, h: number): Particle {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        opacity: 0.12 + Math.random() * 0.28,
        size: 1 + Math.random() * 1.5,
    }
}

export function useParticles(canvasRef: RefObject<HTMLCanvasElement | null>) {
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let w = canvas.offsetWidth
        let h = canvas.offsetHeight
        canvas.width = w
        canvas.height = h

        const particles: Particle[] = Array.from({ length: COUNT }, () => make(w, h))
        const cursor = { x: -9999, y: -9999 }

        const onMove = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect()
            cursor.x = e.clientX - r.left
            cursor.y = e.clientY - r.top
        }
        const onLeave = () => { cursor.x = -9999; cursor.y = -9999 }
        const onClick = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect()
            const cx = e.clientX - r.left
            const cy = e.clientY - r.top
            for (let i = 0; i < 3; i++) {
                const p = make(w, h)
                p.x = cx; p.y = cy
                particles.push(p)
            }
            while (particles.length > COUNT + 60) particles.shift()
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        window.addEventListener('click', onClick)

        let animId: number
        function draw() {
            ctx!.clearRect(0, 0, w, h)

            // Particle-to-particle links
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < LINK_DIST) {
                        ctx!.beginPath()
                        ctx!.strokeStyle = `rgba(232,76,30,${0.1 * (1 - d / LINK_DIST)})`
                        ctx!.lineWidth = 1
                        ctx!.moveTo(particles[i].x, particles[i].y)
                        ctx!.lineTo(particles[j].x, particles[j].y)
                        ctx!.stroke()
                    }
                }
            }

            // Grab lines from cursor
            for (const p of particles) {
                const dx = p.x - cursor.x
                const dy = p.y - cursor.y
                const d = Math.sqrt(dx * dx + dy * dy)
                if (d < GRAB_DIST) {
                    ctx!.beginPath()
                    ctx!.strokeStyle = `rgba(232,76,30,${0.45 * (1 - d / GRAB_DIST)})`
                    ctx!.lineWidth = 1
                    ctx!.moveTo(cursor.x, cursor.y)
                    ctx!.lineTo(p.x, p.y)
                    ctx!.stroke()
                }
            }

            // Move and draw particles
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0) p.x += w; if (p.x > w) p.x -= w
                if (p.y < 0) p.y += h; if (p.y > h) p.y -= h
                ctx!.beginPath()
                ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx!.fillStyle = `rgba(255,255,255,${p.opacity})`
                ctx!.fill()
            }

            animId = requestAnimationFrame(draw)
        }
        draw()

        const observer = new ResizeObserver(() => {
            w = canvas.offsetWidth; h = canvas.offsetHeight
            canvas.width = w; canvas.height = h
        })
        observer.observe(canvas)

        return () => {
            cancelAnimationFrame(animId)
            observer.disconnect()
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('click', onClick)
        }
    }, [canvasRef])
}
