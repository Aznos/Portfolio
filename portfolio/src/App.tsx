import Navbar from './components/Navbar'
import Hero from "./components/Hero.tsx";
import Projects from './components/Projects'

function App() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-bg-primary">
        <Navbar />
        <Hero />
      </div>
      <Projects />
    </>
  )
}

export default App
