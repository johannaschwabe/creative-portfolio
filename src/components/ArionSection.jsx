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
    <section id="arion" className="relative flex items-center bg-light-bg py-24 md:py-24">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
        {/* Left column */}
        <div className="flex flex-col gap-10 px-6 md:pl-12 md:pr-4">
          <div className="flex items-start justify-between gap-8">
            <h2 className="leading-[0.96] shrink-0">Arion – From <img src="/assets/images/arion-logo.png" alt="Arion Jewelry" className="arion-logo" /><br />Concept to Impact</h2>
          </div>

          <div className="arion-subchapter">
            <h3 className="mb-6 leading-snug">At a Glance</h3>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex gap-8 flex-wrap">
                <div className="flex gap-3 items-baseline"><h4>Brand:</h4><p>Arion Jewelry</p></div>
                <div className="flex gap-3 items-baseline"><h4>Timeframe:</h4><p>2.5 Years</p></div>
              </div>
              <div className="flex flex-col gap-2">
                <h4>My Role:</h4>
                <ul className="arion-role-list">
                  <li>Content Creation &amp; Creative Direction</li>
                  <li>Video Production (Filming, Editing, Publishing)</li>
                  <li>Social Media Strategy &amp; Community Building</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="arion-description">
                <span className="arion-desc-line">Arion Jewelry is a Vienna-based East-meets-West jewelry brand</span>
                <span className="arion-desc-line">combining cultural influences with modern design and accessible quality.</span>
              </p>
              <div className="mt-1">
                <h4 className="mb-3">Brand goals</h4>
                <ul className="list-disc list-inside leading-[1.8] pl-0">
                  <li className="mb-[0.35rem]">Cultural storytelling</li>
                  <li className="mb-[0.35rem]">Consistent social media presence</li>
                  <li className="mb-[0.35rem]">Community-driven content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex items-start px-6 md:pr-12">
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
