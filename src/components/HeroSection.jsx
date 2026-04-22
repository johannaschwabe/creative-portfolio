import { useEffect } from 'react'

export default function HeroSection() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })

    // Hero word cycling
    const word1 = document.getElementById('word1')
    const word2 = document.getElementById('word2')
    let elapsed = 0
    let lastTime = null
    const textTimings = {
      fadeOutStart: 3, fadeOutEnd: 3.5, fadeInStart: 3.8, fadeInEnd: 4.3,
      reverseFadeOutStart: 7.3, reverseFadeOutEnd: 7.8, reverseFadeInStart: 8.1,
      reverseFadeInEnd: 8.6, cycleDuration: 8.6
    }
    let rafId
    function updateTitlesLoop(timestamp) {
      if (lastTime === null) lastTime = timestamp
      elapsed += (timestamp - lastTime) / 1000
      lastTime = timestamp
      const t = elapsed % textTimings.cycleDuration
      if (t < textTimings.fadeOutStart) { word1.style.opacity = '1'; word2.style.opacity = '0' }
      else if (t < textTimings.fadeOutEnd) { const p = (t - textTimings.fadeOutStart) / (textTimings.fadeOutEnd - textTimings.fadeOutStart); word1.style.opacity = String(1 - p); word2.style.opacity = '0' }
      else if (t < textTimings.fadeInStart) { word1.style.opacity = '0'; word2.style.opacity = '0' }
      else if (t < textTimings.fadeInEnd) { const p = (t - textTimings.fadeInStart) / (textTimings.fadeInEnd - textTimings.fadeInStart); word1.style.opacity = '0'; word2.style.opacity = String(p) }
      else if (t < textTimings.reverseFadeOutStart) { word1.style.opacity = '0'; word2.style.opacity = '1' }
      else if (t < textTimings.reverseFadeOutEnd) { const p = (t - textTimings.reverseFadeOutStart) / (textTimings.reverseFadeOutEnd - textTimings.reverseFadeOutStart); word1.style.opacity = '0'; word2.style.opacity = String(1 - p) }
      else if (t < textTimings.reverseFadeInStart) { word1.style.opacity = '0'; word2.style.opacity = '0' }
      else if (t < textTimings.reverseFadeInEnd) { const p = (t - textTimings.reverseFadeInStart) / (textTimings.reverseFadeInEnd - textTimings.reverseFadeInStart); word1.style.opacity = String(p); word2.style.opacity = '0' }
      else { word1.style.opacity = '1'; word2.style.opacity = '0' }
      rafId = requestAnimationFrame(updateTitlesLoop)
    }
    rafId = requestAnimationFrame(updateTitlesLoop)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="home" className="hero">
      <video className="hero-video" autoPlay muted loop playsInline id="heroVideo" poster="/assets/images/johanna-schwabe-portfolio.jpg">
        <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-credit">presented by Johanna Schwabe</div>
      <div className="hero-content">
        <div className="hero-title-wrapper">
          <h1>
            <span className="hero-title-line">
              <span className="hero-word">
                <span className="hero-word-content">
                  <span className="word-variant word-variant-1" id="word1">From Creator</span>
                  <span className="word-variant word-variant-2" id="word2">to Creative</span>
                </span>
              </span>
            </span>
          </h1>
        </div>
        <p className="hero-subtitle">Creative with a background in brand building,<br />production &amp; social media</p>
      </div>
    </section>
  )
}
