import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TechStack from './components/TechStack/TechStack'
import Pricing from './components/Pricing/Pricing'
import Process from './components/Process/Process'
import Work from './components/Work/Work'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { initSectionMotionGate } from './lib/sectionMotionGate'
import { initPremiumScrollMotion } from './lib/premiumScrollMotion'
import './index.css'

function App() {
  useSmoothScroll()

  useEffect(() => {
    const disconnectMotionGate = initSectionMotionGate()
    const disconnectPremiumMotion = initPremiumScrollMotion()
    return () => {
      disconnectMotionGate()
      disconnectPremiumMotion()
    }
  }, [])

  return (
    <>
      <div className="grid-spotlight-layer animatedLayer" aria-hidden="true">
        <div className="grid-spotlight-glow animatedLayer" />
        <div className="cursor-glow-ring animatedLayer" />
      </div>
      <Navbar />
      <main className="site-shell">
        <Hero />
        <TechStack />
        <Pricing />
        <Process />
        <Work />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
