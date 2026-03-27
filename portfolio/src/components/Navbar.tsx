export default function Navbar() {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 rounded-b-2xl bg-bg-secondary border border-border border-t-0 px-6 py-3 flex items-center gap-8">
      <a href="#about" className="text-text-secondary hover:text-text-primary text-sm transition-colors">About</a>
      <a href="#projects" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Projects</a>
      <a href="#skills" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Skills</a>
      <a href="#contact" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Contact</a>
    </nav>
  )
}
