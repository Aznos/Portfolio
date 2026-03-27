import Navbar from './components/Navbar'
import Hero from "./components/Hero.tsx";

function App() {
  return (
    <>
        <div className="min-h-screen w-full flex flex-col bg-bg-primary">
            <Navbar />
            <Hero />
        </div>
    </>
  )
}

export default App
