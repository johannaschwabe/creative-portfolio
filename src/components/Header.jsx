import { useEffect } from 'react'

export default function Header() {
  useEffect(() => {
    // Header scroll state
    const header = document.getElementById('mainHeader')
    const heroSection = document.getElementById('home')
    function updateHeaderColor() {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
      if (window.scrollY + 100 > heroBottom) header.classList.add('scrolled')
      else header.classList.remove('scrolled')
    }
    window.addEventListener('scroll', updateHeaderColor)
    updateHeaderColor()

    // Hamburger menu
    const hamburgerBtn = document.getElementById('hamburgerBtn')
    const navLinks = document.getElementById('navLinks')
    if (hamburgerBtn && navLinks) {
      hamburgerBtn.addEventListener('click', () => navLinks.classList.toggle('open'))
      navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')))
    }

    return () => {
      window.removeEventListener('scroll', updateHeaderColor)
    }
  }, [])

  return (
    <header id="mainHeader">
      <nav>
        <button className="hamburger" id="hamburgerBtn" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="nav-links" id="navLinks">
          <li><a href="#home">Home</a></li>
          <li><a href="mailto:johanna.schwabe@kabsi.at">Contact</a></li>
          <li><a href="https://www.instagram.com/globaldiariess" target="_blank" rel="noopener noreferrer">Socials</a></li>
          <li><a href="/assets/documents/cv-johanna-schwabe.pdf" target="_blank" rel="noopener noreferrer">CV</a></li>
          <li><a href="#arion">View Work</a></li>
        </ul>
      </nav>
    </header>
  )
}
