'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import CustomCursor from '@/components/portfolio/custom-cursor'
import Navbar from '@/components/portfolio/navbar'
import Hero from '@/components/portfolio/hero'
import About from '@/components/portfolio/about'
import Marquee from '@/components/portfolio/marquee'
import Works from '@/components/portfolio/works'
import Services from '@/components/portfolio/services'
import Process from '@/components/portfolio/process'
import Testimonials from '@/components/portfolio/testimonials'
import Contact from '@/components/portfolio/contact'
import Footer from '@/components/portfolio/footer'

function ScrollToTopFab() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,247,0,0.4)]"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background film-grain">
      <CustomCursor />
      <Navbar />
      <main className="flex-1 relative">
        <Hero />
        <About />
        <Marquee />
        <Works />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopFab />
    </div>
  )
}
