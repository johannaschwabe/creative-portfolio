import { useEffect } from 'react'

export default function FoodCampaignSection() {
  useEffect(() => {
    const animatedFoodStats = new Set()
    function animateFoodStats(statsBlock) {
      statsBlock.querySelectorAll('.stat-number').forEach((num) => {
        if (animatedFoodStats.has(num)) return
        animatedFoodStats.add(num)
        const target = parseInt(num.getAttribute('data-target'))
        const hasPlus = num.textContent.includes('+')
        const start = Math.max(10, target - 15)
        const startTime = performance.now()
        const animate = (ct) => {
          const progress = Math.min((ct - startTime) / 800, 1)
          num.textContent = Math.round(start + (target - start) * progress) + 'K' + (hasPlus ? '+' : '')
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      })
    }

    const foodCampaignObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statsBlock = entry.target.querySelector('.food-campaign-stats')
          if (statsBlock) animateFoodStats(statsBlock)
          foodCampaignObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    const foodCampaignSection = document.getElementById('food-campaign')
    if (foodCampaignSection) foodCampaignObserver.observe(foodCampaignSection)
  }, [])

  return (
    <section id="food-campaign" className="relative bg-light-bg py-24">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
        {/* Left: video + stats */}
        <div className="flex items-start justify-center gap-12">
          <div className="food-campaign-stats-container">
            <div className="food-campaign-stats">
              <div className="food-campaign-stat"><h2 className="stat-number" data-target="252">252K+</h2><p className="stat-label">views on Instagram</p></div>
              <div className="food-campaign-stat"><h2 className="stat-number" data-target="51">51K+</h2><p className="stat-label">views on TikTok</p></div>
            </div>
          </div>
          <div className="food-campaign-video-area">
            <div className="food-campaign-video-wrapper active" data-video="food">
              <video autoPlay muted loop playsInline preload="none" className="js-lazy-video">
                <source data-src="/assets/videos/food-video-loop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Right: text */}
        <div className="flex flex-col max-w-[600px]">
          <h3 className="mb-8 leading-[0.96]">High-Impact Campaign</h3>
          <h4 className="mb-3">Concept</h4>
          <p className="leading-[1.7] mb-2">A value-driven restaurant video designed for international audiences, positioning a new restaurant location as an approachable, must-save destination through a first-person unlimited BBQ experience.</p>
          <h4 className="mb-3 mt-8">Why It Worked</h4>
          <ul className="list-disc list-inside leading-[1.8] pl-0 mb-2">
            <li className="mb-2">Clear value proposition: unlimited BBQ and wide meat selection</li>
            <li className="mb-2">Authentic, first-person storytelling lowered friction</li>
            <li className="mb-2">Tourist-friendly location increased relevance and saves</li>
            <li className="mb-2">Strong food visuals captured attention quickly</li>
          </ul>
          <h4 className="mb-3 mt-8">Result</h4>
          <p className="leading-[1.7] mb-2">Delivered strong reach and engagement within the target audience.</p>
        </div>
      </div>
    </section>
  )
}
