'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, MessageSquare, Sparkles, ArrowUpRight } from 'lucide-react'

const services = [
  {
    icon: Calendar,
    title: 'Event Edits',
    description:
      'Cinematic highlight reels for weddings, birthdays, corporate events, and special occasions. Emotional storytelling with perfect pacing.',
  },
  {
    icon: MessageSquare,
    title: 'Talking Head Editing',
    description:
      'Professional short-form content for professionals. Clear, engaging videos optimized for social media with dynamic cuts and captions.',
  },
  {
    icon: Sparkles,
    title: 'Motion Graphics',
    description:
      'Eye-catching animations, logo reveals, and visual effects. Basic to intermediate level — currently expanding this skillset.',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Dotted background */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(120,120,120,0.6) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
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
            What I Offer
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
            Services
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative p-6 lg:p-8 rounded-3xl bg-card border border-border transition-all duration-500 hover:bg-brand hover:border-transparent overflow-hidden"
            >
              {/* corner arrow */}
              <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground group-hover:text-black transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl mb-5 lg:mb-6 transition-colors duration-500 flex items-center justify-center bg-brand/10 group-hover:bg-black/10">
                <service.icon className="w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-500 group-hover:text-black text-brand" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-foreground group-hover:text-black mb-2 lg:mb-3 transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-black/70 text-sm leading-relaxed transition-colors duration-500">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
