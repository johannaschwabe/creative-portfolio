import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const heroSection = document.getElementById('home')

    function updateScrollState() {
      if (!heroSection) return
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
      setScrolled(window.scrollY + 100 > heroBottom)
    }

    window.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header id="mainHeader" className={scrolled ? 'scrolled' : ''}>
      <nav>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          id="hamburgerBtn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li><a href="#home" onClick={closeMenu}>Home</a></li>
          <li><a href="mailto:johanna.schwabe@kabsi.at" onClick={closeMenu}>Contact</a></li>
          <li><a href="https://www.instagram.com/globaldiariess" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Socials</a></li>
          <li><a href="/assets/documents/cv-johanna-schwabe.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>CV</a></li>
          <li><a href="#arion" onClick={closeMenu}>View Work</a></li>
        </ul>
      </nav>
    </header>
  )
}
