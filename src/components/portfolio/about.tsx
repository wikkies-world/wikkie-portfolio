'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Film, Clock, Users } from 'lucide-react'

const stats = [
  { icon: Clock, value: 2, suffix: '+', label: 'Years Editing' },
  { icon: Film, value: 100, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 50, suffix: '+', label: 'Happy Clients' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let current = 0
    const increment = value / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      className="pt-16 pb-24 lg:pt-20 lg:pb-32 bg-background relative overflow-hidden"
    >
      {/* subtle accent glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand/5 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-foreground/5 to-foreground/10 overflow-hidden relative border border-border group"
              data-heart-trigger
            >
              {/* Real portrait photo */}
              <img
                src="/wikkie-portrait.webp"
                alt="Wikkie — Video Editor"
                width={1122}
                height={1402}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* subtle gradient at bottom for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              {/* filmstrip top/bottom accents */}
              <div className="absolute top-0 inset-x-0 h-6 bg-black/40 backdrop-blur-sm flex items-center gap-2 px-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm bg-background/60" />
                ))}
              </div>
              <div className="absolute bottom-0 inset-x-0 h-6 bg-black/40 backdrop-blur-sm flex items-center gap-2 px-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm bg-background/60" />
                ))}
              </div>
              {/* name tag */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand text-black text-xs font-bold tracking-wide shadow-lg">
                WIKKIE
              </div>
            </div>
            {/* Decorative element */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl -z-10"
              style={{ backgroundColor: 'rgba(255, 247, 0, 0.25)' }}
            />
            {/* rotating ring accent */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-6 -left-6 w-16 h-16 rounded-full border-2 border-dashed border-brand/40 pointer-events-none"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4 text-brand">
              About Me
            </p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight mb-6">
              Turning Raw Footage Into Visual Stories
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed">
              <p>
                I&apos;m Wikkie, a video editor specializing in event highlight
                reels, talking-head content, and motion graphics. My approach
                combines technical precision with creative storytelling —
                ensuring every project connects with its audience.
              </p>
              <p>
                From cinematic wedding recaps to engaging talking-head content,
                I bring a meticulous eye for detail and a deep understanding of
                pacing, rhythm, and visual flow. Every cut is intentional,
                every transition meaningful.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-brand" />
                  <div className="text-3xl lg:text-4xl font-bold text-foreground">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
