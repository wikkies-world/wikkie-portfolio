'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Navbar from '@/components/portfolio/navbar'
import Hero from '@/components/portfolio/hero'

const CustomCursor = dynamic(() => import('@/components/portfolio/custom-cursor'), {
  ssr: false,
  loading: () => null,
})
const About = dynamic(() => import('@/components/portfolio/about'), { ssr: false })
const Marquee = dynamic(() => import('@/components/portfolio/marquee'), { ssr: false })
const Works = dynamic(() => import('@/components/portfolio/works'), { ssr: false })
const Services = dynamic(() => import('@/components/portfolio/services'), { ssr: false })
const Process = dynamic(() => import('@/components/portfolio/process'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/portfolio/testimonials'), { ssr: false })
const Contact = dynamic(() => import('@/components/portfolio/contact'), { ssr: false })
const Footer = dynamic(() => import('@/components/portfolio/footer'), { ssr: false })

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
