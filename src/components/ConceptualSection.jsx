import { useEffect } from 'react'

export default function ConceptualSection() {
  useEffect(() => {
    const conceptualObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); conceptualObserver.unobserve(entry.target) }
      })
    }, { threshold: 0.25 })
    const conceptualMainImage = document.querySelector('.conceptual-main-image')
    if (conceptualMainImage) conceptualObserver.observe(conceptualMainImage)
    document.querySelectorAll('.conceptual-grid-item').forEach((item, i) => setTimeout(() => conceptualObserver.observe(item), i * 200))
  }, [])

  return (
    <section id="conceptual" className="relative bg-light-bg py-24">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
        <h2 className="leading-[0.96] mb-8 whitespace-normal md:whitespace-nowrap">Conceptual Campaign</h2>
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 md:gap-20 items-start">
        {/* Left: text */}
        <div className="max-w-[650px]">
          <h3 className="mb-8 leading-snug">In Between</h3>
          <div>
            <h4 className="mb-3">Insight</h4>
            <p className="leading-[1.7] mb-1">We spend more time in between than arriving.</p>
            <h4 className="mb-3 mt-8">Creative Idea</h4>
            <p className="leading-[1.7] mb-1">A minimalist fashion campaign focused on moments of pause, movement and presence — not defined by arrival, but by what happens in between.</p>
            <h4 className="mb-3 mt-8">Creative Rule</h4>
            <p className="leading-[1.7] mb-1">Each visual presents a look that feels intentionally unfinished — styled to suggest transition rather than completion.</p>
            <h4 className="mb-3 mt-8">Campaign System</h4>
            <ul className="list-disc list-inside leading-[1.6] pl-0 mb-1">
              <li className="mb-1">Unfinished styling (open coats, undone buttons, loose layers)</li>
              <li className="mb-1">Cropped or incomplete framing (faces partially out of frame, bodies cut mid-movement)</li>
            </ul>
            <h4 className="mb-3 mt-8">Why this works as a campaign</h4>
            <ul className="list-disc list-inside leading-[1.6] pl-0 mb-1">
              <li className="mb-1">Focuses on an ongoing, universal state</li>
              <li className="mb-1">Unfinished visuals allow identification without narrative direction</li>
              <li className="mb-1">A simple visual rule creates recognition and consistency</li>
            </ul>
          </div>
        </div>

        {/* Right: images */}
        <div className="flex flex-col gap-3">
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
      </div>
    </section>
  )
}
