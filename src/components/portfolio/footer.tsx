'use client'

import { Mail, Instagram, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { WhatsAppIcon } from './whatsapp-icon'

const socialLinks = [
  {
    icon: Mail,
    href: 'https://mail.google.com/mail/?view=cm&to=wikkies.world@gmail.com',
    label: 'Email',
  },
  {
    icon: WhatsAppIcon,
    href: 'https://wa.me/918374843155?text=Hi%20Wikkie%2C%20I%27d%20like%20to%20discuss%20a%20project',
    label: 'WhatsApp',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/wikkie.verse',
    label: 'Instagram',
  },
]

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Works', href: '#works' },
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollToSection = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3 items-start">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Wikkie<span className="text-brand">.</span>
            </span>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Crafting visual stories with precision — where every frame speaks
              and every cut flows.
            </p>
          </div>

          {/* Quick nav */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3 md:justify-end">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center group transition-colors hover:bg-brand"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4 text-foreground group-hover:text-black transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Wikkie. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to top"
          >
            Back to top
            <span className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-brand">
              <ArrowUp className="w-4 h-4" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
