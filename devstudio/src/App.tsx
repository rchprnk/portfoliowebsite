import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechStack from './components/TechStack'
import Pricing from './components/Pricing'
import Process from './components/Process'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Pricing />
        <Process />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App