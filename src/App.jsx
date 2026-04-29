import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Cotizador from './components/Cotizador'
import Services from './components/Services'
import Stats from './components/Stats'
import Gallery from './components/Gallery'
import HowItWorks from './components/HowItWorks'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import WAFloat from './components/WAFloat'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Cotizador />
      <Services />
      <Stats />
      <Gallery />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
      <Footer />
      <WAFloat />
    </>
  )
}
