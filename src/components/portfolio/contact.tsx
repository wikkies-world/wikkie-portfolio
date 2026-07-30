'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Mail,
  Instagram,
  Send,
  Check,
  ExternalLink,
} from 'lucide-react'
import { WhatsAppIcon } from './whatsapp-icon'
import { toast } from 'sonner'

const WHATSAPP_NUMBER = '918374843155'

const socialLinks = [
  {
    icon: Mail,
    href: 'https://mail.google.com/mail/?view=cm&to=wikkies.world@gmail.com',
    label: 'Email',
  },
  {
    icon: WhatsAppIcon,
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Wikkie%2C%20I%27d%20like%20to%20discuss%20a%20project`,
    label: 'WhatsApp',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/wikkie.verse',
    label: 'Instagram',
  },
]

type Status = 'idle' | 'success'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build a pre-filled WhatsApp message from the form data
    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    const lines: string[] = []
    if (name) lines.push(`Hi Wikkie, I'm ${name}.`)
    else lines.push("Hi Wikkie,")
    if (email) lines.push(`My email: ${email}`)
    if (message) lines.push(message)
    const text = encodeURIComponent(lines.join(' '))

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      '_blank',
      'noopener,noreferrer',
    )

    setStatus('success')
    toast.success('Opening WhatsApp…', {
      description: 'Continue your conversation with Wikkie on WhatsApp.',
    })
    setTimeout(() => {
      setStatus('idle')
      setFormData({ name: '', email: '', message: '' })
    }, 2500)
  }

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4 text-brand">
              Get in Touch
            </p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight mb-4">
              Let&apos;s Create Something Together
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  maxLength={80}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  maxLength={120}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                required
                rows={5}
                maxLength={2000}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 text-black font-semibold rounded-full transition-shadow flex items-center justify-center gap-2 bg-brand shadow-[0_0_30px_rgba(255,247,0,0.35)] hover:shadow-[0_0_45px_rgba(255,247,0,0.55)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Opened WhatsApp!</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center gap-4 mt-12"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group transition-colors hover:bg-brand"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-foreground group-hover:text-black transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
