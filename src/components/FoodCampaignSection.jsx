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
    <section className="food-campaign-section" id="food-campaign">
      <div className="food-campaign-wrapper">
        <div className="food-campaign-container">
          <div className="food-campaign-left">
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
          <div className="food-campaign-right">
            <h3>High-Impact Campaign</h3>
            <h4>Concept</h4>
            <p>A value-driven restaurant video designed for international audiences, positioning a new restaurant location as an approachable, must-save destination through a first-person unlimited BBQ experience.</p>
            <h4>Why It Worked</h4>
            <ul>
              <li>Clear value proposition: unlimited BBQ and wide meat selection</li>
              <li>Authentic, first-person storytelling lowered friction</li>
              <li>Tourist-friendly location increased relevance and saves</li>
              <li>Strong food visuals captured attention quickly</li>
            </ul>
            <h4>Result</h4>
            <p>Delivered strong reach and engagement within the target audience.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
