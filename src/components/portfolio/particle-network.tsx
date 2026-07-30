'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

/**
 * Floating yellow circle particles connected by dashed white lines.
 * Rendered behind the hero content with low opacity.
 * Respects prefers-reduced-motion (renders a single static frame).
 */
export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let raf = 0
    let running = true

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // density scales with area, capped for performance
      const count = Math.min(
        60,
        Math.max(20, Math.floor((width * height) / 26000)),
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: 1.5 + Math.random() * 2.2,
      }))
    }

    const linkDistance = 130

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      // particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 247, 0, 0.5)'
        ctx.fill()
      }

      // dashed links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.3
            ctx.beginPath()
            ctx.setLineDash([3, 4])
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = 1
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.setLineDash([])

      raf = requestAnimationFrame(draw)
    }

    setup()

    if (prefersReducedMotion) {
      draw()
      running = false
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      cancelAnimationFrame(raf)
      running = false
      setup()
      if (!prefersReducedMotion) {
        running = true
        raf = requestAnimationFrame(draw)
      } else {
        draw()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.45 }}
      aria-hidden
    />
  )
}
