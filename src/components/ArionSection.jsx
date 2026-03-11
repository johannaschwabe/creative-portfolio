import { useEffect } from 'react'

export default function ArionSection() {
  useEffect(() => {
    const arionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const gridItems = Array.from(entry.target.querySelectorAll('[data-arion-animate]'))
          for (let i = gridItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [gridItems[i], gridItems[j]] = [gridItems[j], gridItems[i]]
          }
          gridItems.forEach((item, index) => setTimeout(() => item.classList.add('visible'), index * 100))
          arionObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })
    const arionGrid = document.querySelector('.arion-grid')
    if (arionGrid) arionObserver.observe(arionGrid)
  }, [])

  return (
    <section className="arion-section" id="arion">
      <div className="arion-container">
        <div className="arion-left">
          <div className="arion-title-area">
            <h2>Arion – From <img src="/assets/images/arion-logo.png" alt="Arion Jewelry" className="arion-logo" /><br />Concept to Impact</h2>
          </div>
          <div className="arion-subchapter">
            <h3>At a Glance</h3>
            <div className="arion-info-box-1">
              <div className="arion-info-row">
                <div className="arion-info-item"><h4>Brand:</h4><p>Arion Jewelry</p></div>
                <div className="arion-info-item"><h4>Timeframe:</h4><p>2.5 Years</p></div>
              </div>
              <div className="arion-role-item">
                <h4>My Role:</h4>
                <ul className="arion-role-list">
                  <li>Content Creation &amp; Creative Direction</li>
                  <li>Video Production (Filming, Editing, Publishing)</li>
                  <li>Social Media Strategy &amp; Community Building</li>
                </ul>
              </div>
            </div>
            <div className="arion-info-box-2">
              <p className="arion-description">
                <span className="arion-desc-line">Arion Jewelry is a Vienna-based East-meets-West jewelry brand</span>
                <span className="arion-desc-line">combining cultural influences with modern design and accessible quality.</span>
              </p>
              <div className="arion-goals">
                <h4>Brand goals</h4>
                <ul>
                  <li>Cultural storytelling</li>
                  <li>Consistent social media presence</li>
                  <li>Community-driven content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="arion-right">
          <div className="arion-grid">
            {[
              ['arion-intro-4.jpg','4'],['arion-intro-1.jpg','1'],['arion-intro-3.jpg','3'],
              ['arion-intro-6.jpg','6'],['arion-intro-5.jpg','5'],['arion-intro-7.jpg','7'],
              ['arion-intro-2.jpg','2'],['arion-intro-8.jpg','8'],['arion-intro-9.jpg','9'],
            ].map(([file, num], i) => (
              <div key={i} className="arion-grid-item" data-arion-animate={String(i)}>
                <img src={`/assets/images/${file}`} alt={`Arion work ${num}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
