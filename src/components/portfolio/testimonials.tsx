'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Star, Quote } from 'lucide-react'

type Testimonial = {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

// Static fallback (used immediately + if API is unavailable)
const fallbackTestimonials: Testimonial[] = [
  {
    id: 'fallback-1',
    name: 'Dr. Vinay Raj',
    role: 'Vinay Dental',
    content:
      'Wikkie edited our patient testimonial, awareness, and informational videos with great attention to detail. His edits were clean, engaging, and professional, helping us communicate better with our audience. Reliable, creative, and easy to work with.',
    rating: 5,
  },
  {
    id: 'fallback-2',
    name: 'House of Chaos',
    role: 'Brand',
    content:
      "Wikkie has been an important part of our team as a full-time Graphic Designer and Video Editor. His minimal yet impactful editing style perfectly matched our brand, and his consistency, creativity, and quality made him a valuable addition to our startup.",
    rating: 5,
  },
  {
    id: 'fallback-3',
    name: 'Dr. Akhilesh Kumar Singh',
    role: 'Principal, Vashista Degree College',
    content:
      "Wikkie created a memorable video for our Silver Jubilee celebration, beautifully capturing 25 years of our college's journey. His storytelling, attention to detail, and creative editing made the video meaningful and well appreciated by everyone at the event.",
    rating: 5,
  },
]

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

const avatarColors = [
  'from-amber-400 to-yellow-600',
  'from-rose-400 to-pink-600',
  'from-emerald-400 to-teal-600',
  'from-violet-400 to-purple-600',
  'from-sky-400 to-cyan-600',
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    fallbackTestimonials,
  )
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/testimonials', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.items) && data.items.length > 0) {
          setTestimonials(data.items)
        }
      })
      .catch(() => {
        /* keep fallback */
      })
      .finally(() => !cancelled && setLoaded(true))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-brand/5 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4 text-brand">
            Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
            Client Stories
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative p-8 rounded-3xl bg-card border border-border transition-all duration-500 hover:border-brand/40 hover:-translate-y-1 glow-brand"
            >
              {/* gradient top accent */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
              <Quote
                className="absolute top-6 right-6 w-10 h-10"
                style={{ color: 'rgba(255, 247, 0, 0.18)' }}
              />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-brand"
                    style={{ fill: '#fff700', color: '#fff700' }}
                  />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {/* avatar with initials */}
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {initials(testimonial.name)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-muted-foreground/70 text-sm mt-8"
        >
          {loaded ? '' : 'Loading latest client reviews…'}
        </motion.p>
      </div>
    </section>
  )
}
