'use client'

import { useEffect, useState, useRef } from 'react'
import { Heart } from 'lucide-react'

type Particle = {
  id: number
  x: number
  y: number
  drift: number
  rot: number
  color: string
  size: number
}

const PARTICLE_COLORS = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#fff700', '#ff6b6b']

/**
 * Yellow square cursor for the entire site (mix-blend-mode difference).
 *
 * ONLY when hovering elements marked with `data-heart-trigger` (the portrait
 * photo) does the cursor switch to a red heart icon and emit heart particles.
 * Only activates on fine-pointer (desktop) devices.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [isOverPortrait, setIsOverPortrait] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const posRef = useRef({ x: -100, y: -100 })
  const emittingRef = useRef(false)
  const particleId = useRef(0)

  useEffect(() => {
    const finePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return

    document.documentElement.classList.add('custom-cursor-active')

    const updatePosition = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-heart-trigger]')) {
        emittingRef.current = true
        setIsOverPortrait(true)
        setIsHoveringInteractive(false)
      } else if (
        target.closest(
          'button, a, [role="button"], .cursor-pointer, input, textarea, select, label',
        )
      ) {
        emittingRef.current = false
        setIsOverPortrait(false)
        setIsHoveringInteractive(true)
      } else {
        emittingRef.current = false
        setIsOverPortrait(false)
        setIsHoveringInteractive(false)
      }
    }

    const handleMouseLeave = () => {
      emittingRef.current = false
      setIsOverPortrait(false)
      setIsHoveringInteractive(false)
      setIsVisible(false)
    }
    const handleWindowBlur = () => {
      emittingRef.current = false
      setIsOverPortrait(false)
      setIsVisible(false)
    }

    // Particle emission loop — only emits while hovering the portrait
    const emitInterval = setInterval(() => {
      if (!emittingRef.current) return
      const id = particleId.current++
      const p: Particle = {
        id,
        x: posRef.current.x + (Math.random() - 0.5) * 24,
        y: posRef.current.y + (Math.random() - 0.5) * 10,
        drift: (Math.random() - 0.5) * 80,
        rot: (Math.random() - 0.5) * 60,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        size: 12 + Math.random() * 14,
      }
      setParticles((prev) => [...prev.slice(-25), p])
      setTimeout(() => {
        setParticles((prev) => prev.filter((pp) => pp.id !== id))
      }, 1400)
    }, 90)

    window.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      clearInterval(emitInterval)
      window.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [])

  return (
    <>
      {/* Default: yellow square cursor (entire site).
          Mix-blend-mode difference makes it visible on any background. */}
      {!isOverPortrait && (
        <div
          className={`custom-cursor ${isHoveringInteractive ? 'hover' : ''}`}
          style={{
            left: position.x,
            top: position.y,
            opacity: isVisible ? 1 : 0,
          }}
          aria-hidden
        />
      )}

      {/* Portrait hover: switch to red heart icon */}
      {isOverPortrait && (
        <div
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            opacity: isVisible ? 1 : 0,
            pointerEvents: 'none',
            zIndex: 99999,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.2s ease-out',
          }}
          aria-hidden
        >
          <Heart
            style={{
              width: 28,
              height: 28,
              color: '#ff4d6d',
              fill: '#ff4d6d',
              filter: 'drop-shadow(0 0 8px rgba(255,77,109,0.6))',
            }}
          />
        </div>
      )}

      {/* Heart particles — only while hovering the portrait */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle"
          style={
            {
              left: p.x,
              top: p.y,
              '--drift': `${p.drift}px`,
              '--rot': `${p.rot}deg`,
            } as React.CSSProperties
          }
        >
          <Heart
            style={{
              width: p.size,
              height: p.size,
              color: p.color,
              fill: p.color,
            }}
          />
        </div>
      ))}
    </>
  )
}
