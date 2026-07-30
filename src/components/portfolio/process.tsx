'use client'

import { MessageSquare, Scissors, Sparkles, Send } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const steps = [
  {
    icon: MessageSquare,
    title: 'Brief',
    description:
      'We discuss your vision, goals, and references. I learn your style and the story you want to tell.',
  },
  {
    icon: Scissors,
    title: 'Edit',
    description:
      'I assemble the cut — pacing, rhythm, and structure. Every frame earns its place in the timeline.',
  },
  {
    icon: Sparkles,
    title: 'Polish',
    description:
      'Color grading, sound design, motion graphics, and captions. The details that make it sing.',
  },
  {
    icon: Send,
    title: 'Deliver',
    description:
      'You review, we refine, and I deliver in every format you need — optimized for each platform.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section
      id="process"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* dotted texture */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(140,140,140,0.5) 1px, transparent 1px)',
          backgroundSize: '5px 5px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4 text-brand">
            How It Works
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
            My Editing Process
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A clear, collaborative workflow from first chat to final delivery.
          </p>
        </motion.div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* horizontal connecting line (desktop) */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const isHovered = hoveredStep === index
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative text-center"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Icon circle */}
                  <div className="relative inline-flex mb-6">
                    <div
                      className={`w-[72px] h-[72px] rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isHovered
                          ? 'border-brand bg-brand'
                          : 'border-border bg-card'
                      }`}
                    >
                      <step.icon
                        className={`w-7 h-7 transition-colors duration-500 ${
                          isHovered ? 'text-black' : 'text-brand'
                        }`}
                      />
                    </div>
                    {/* step number badge */}
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand text-black text-xs font-bold flex items-center justify-center section-num">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
