import Navbar from './components/Navbar'
import Hero from "./components/Hero.tsx";
import StatsSection from './components/StatsSection'
import Projects from './components/Projects'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'

function App() {
  return (
    <>
      <div id="about" className="min-h-screen w-full flex flex-col bg-bg-primary">
        <Navbar />
        <Hero />
      </div>
      <StatsSection />
      <Projects />
      <SkillsSection />
      <ContactSection />
    </>
  )
}

export default App
