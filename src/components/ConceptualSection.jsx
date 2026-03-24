import { useEffect } from 'react'

export default function ConceptualSection() {
  useEffect(() => {
    const conceptualObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); conceptualObserver.unobserve(entry.target) }
      })
    }, { threshold: 0.1 })
    const conceptualMainImage = document.querySelector('.conceptual-main-image')
    if (conceptualMainImage) conceptualObserver.observe(conceptualMainImage)
    document.querySelectorAll('.conceptual-grid-item').forEach((item, i) => setTimeout(() => conceptualObserver.observe(item), i * 200))
  }, [])

  return (
    <section className="conceptual-section" id="conceptual">
      <div className="conceptual-container">
        <div className="conceptual-left">
          <h2>Conceptual Campaign</h2>
          <h3>In Between</h3>
          <div className="conceptual-content">
            <h4>Insight</h4>
            <p>We spend more time in between than arriving.</p>
            <h4>Creative Idea</h4>
            <p>A minimalist fashion campaign focused on moments of pause, movement and presence — not defined by arrival, but by what happens in between.</p>
            <h4>Creative Rule</h4>
            <p>Each visual presents a look that feels intentionally unfinished — styled to suggest transition rather than completion.</p>
            <h4>Campaign System</h4>
            <ul>
              <li>Unfinished styling (open coats, undone buttons, loose layers)</li>
              <li>Cropped or incomplete framing (faces partially out of frame, bodies cut mid-movement)</li>
            </ul>
            <h4>Why this works as a campaign</h4>
            <ul>
              <li>Focuses on an ongoing, universal state</li>
              <li>Unfinished visuals allow identification without narrative direction</li>
              <li>A simple visual rule creates recognition and consistency</li>
            </ul>
          </div>
        </div>
        <div className="conceptual-right">
          <div className="conceptual-main-image">
            <img src="/assets/images/conceptual-1.jpg" alt="Conceptual campaign" loading="lazy" />
          </div>
          <div className="conceptual-grid">
            {[2,3,4,5].map((n) => (
              <div key={n} className="conceptual-grid-item">
                <img src={`/assets/images/conceptual-${n}.jpg`} alt="Conceptual campaign" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
