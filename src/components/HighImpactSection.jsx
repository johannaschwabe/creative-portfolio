import { useEffect } from 'react'

export default function HighImpactSection() {
  useEffect(() => {
    const highImpactSection = document.querySelector('.high-impact-section')
    const highImpactSteps = document.querySelectorAll('.high-impact-step')
    const highImpactVideos = document.querySelectorAll('.high-impact-video-wrapper')
    let currentHighImpactStep = -1

    function animateStats(statsBlock) {
      statsBlock.querySelectorAll('.stat-number').forEach((num) => {
        if (num.classList.contains('animated')) return
        num.classList.add('animated')
        const target = parseInt(num.getAttribute('data-target'))
        const hasPlus = num.textContent.includes('+')
        const start = Math.max(10, target - 15)
        const duration = 800; const startTime = performance.now()
        const animate = (ct) => {
          const progress = Math.min((ct - startTime) / duration, 1)
          num.textContent = Math.round(start + (target - start) * progress) + 'K' + (hasPlus ? '+' : '')
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      })
    }

    function updateHighImpactStep() {
      if (!highImpactSection || window.innerWidth <= 768) return
      const rect = highImpactSection.getBoundingClientRect()
      const maxScroll = Math.max(1, highImpactSection.offsetHeight - window.innerHeight)
      const stepIndex = Math.min(highImpactSteps.length - 1, Math.floor(Math.max(0, Math.min(1, -rect.top / maxScroll)) * highImpactSteps.length))
      if (stepIndex !== currentHighImpactStep) {
        currentHighImpactStep = stepIndex
        highImpactSteps.forEach(step => step.classList.toggle('active', parseInt(step.getAttribute('data-step'), 10) === currentHighImpactStep))
        document.querySelectorAll('.high-impact-stats').forEach((statsBlock) => {
          const stepAttr = parseInt(statsBlock.getAttribute('data-step'), 10)
          const isActive = stepAttr === currentHighImpactStep
          const wasActive = statsBlock.classList.contains('active')
          statsBlock.classList.toggle('active', isActive)
          if (isActive && !wasActive && stepAttr !== 0 && !statsBlock.hasAttribute('data-animated')) {
            statsBlock.setAttribute('data-animated', 'true')
            setTimeout(() => animateStats(statsBlock), 200)
          }
        })
        highImpactVideos.forEach((wrapper) => {
          const isActive = parseInt(wrapper.getAttribute('data-step')) === currentHighImpactStep
          wrapper.classList.toggle('active', isActive)
          const videoEl = wrapper.querySelector('video')
          if (videoEl) { if (isActive) videoEl.play().catch(() => {}); else videoEl.pause() }
        })
      }
    }

    const highImpactStatsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statsBlock = entry.target
          if (!statsBlock.hasAttribute('data-animated') && statsBlock.classList.contains('active')) {
            statsBlock.setAttribute('data-animated', 'true')
            setTimeout(() => animateStats(statsBlock), 200)
          }
        }
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.high-impact-stats').forEach(block => highImpactStatsObserver.observe(block))

    window.addEventListener('scroll', updateHighImpactStep)
    updateHighImpactStep()

    if (currentHighImpactStep === -1 && highImpactSteps.length && window.innerWidth > 768) {
      currentHighImpactStep = 0
      highImpactSteps.forEach((step, i) => step.classList.toggle('active', i === 0))
      highImpactVideos.forEach((wrapper) => {
        const isActive = wrapper.getAttribute('data-step') === '0'
        wrapper.classList.toggle('active', isActive)
        const videoEl = wrapper.querySelector('video')
        if (videoEl && isActive) videoEl.play().catch(() => {})
      })
    }

    function initMobileHighImpact() {
      if (window.innerWidth > 768) return
      highImpactSteps.forEach(step => step.classList.add('active'))
      document.querySelectorAll('.high-impact-step .mobile-video-wrapper video').forEach(video => {
        const source = video.querySelector('source[data-src]')
        if (source) { source.setAttribute('src', source.getAttribute('data-src')); source.removeAttribute('data-src') }
        video.load(); video.play().catch(() => {})
      })
      const mobileStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const block = entry.target
            if (!block.hasAttribute('data-animated')) { block.setAttribute('data-animated', 'true'); animateStats(block) }
            mobileStatsObserver.unobserve(block)
          }
        })
      }, { threshold: 0.5 })
      document.querySelectorAll('.mobile-stats').forEach(block => mobileStatsObserver.observe(block))
    }
    initMobileHighImpact()

    return () => {
      window.removeEventListener('scroll', updateHighImpactStep)
    }
  }, [])

  return (
    <section className="high-impact-section" id="high-impact">
      <div className="scroll-height-impact">
        <div className="high-impact-wrapper">
          <div className="high-impact-container">
            <div className="high-impact-left">
              <h3 className="high-impact-heading">High-Impact Campaigns</h3>
              <div className="high-impact-step" data-step="0">
                <h3>Eternal Bracelets</h3>
                <h4>Concept</h4>
                <p>A social-first, discovery-style video positioning Arion as the most accessible entry point into permanent jewelry in Vienna.</p>
                <h4>Why it worked</h4>
                <ul>
                  <li>Addressed a clear market gap around affordability</li>
                  <li>Strong hook in first seconds</li>
                  <li>Discovery-style storytelling</li>
                  <li>Time-bound CTA: urgency through limited spots and incentives</li>
                </ul>
                <h4>Result</h4>
                <p>First welding event successfully and strongly attended.</p>
                <div className="mobile-video-wrapper" data-video="welding">
                  <video autoPlay muted loop playsInline preload="none" className="js-lazy-video">
                    <source data-src="/assets/videos/welding-loop.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="mobile-stats">
                  <div className="mobile-stat"><h2 className="stat-number" data-target="225">225K+</h2><p className="stat-label">views on Instagram</p></div>
                  <div className="mobile-stat"><h2 className="stat-number" data-target="163">163K+</h2><p className="stat-label">views on TikTok</p></div>
                </div>
              </div>
              <div className="high-impact-step" data-step="1">
                <h3>Phone Charms</h3>
                <h4>Concept</h4>
                <p>A customer-perspective vlog introducing phone charm making as a new, hands-on experience in Vienna, filmed from a first-person point of view.</p>
                <h4>Why it worked</h4>
                <ul>
                  <li>Presented the experience through a genuine customer lens rather than a brand-led perspective</li>
                  <li>Created curiosity around a new in-store activity</li>
                  <li>Made the process feel approachable and easy to try</li>
                  <li>Lowered the barrier to visiting a less-frequented store location</li>
                </ul>
                <h4>Result</h4>
                <p>Noticeable increase in customers creating phone charms in-store.</p>
                <div className="mobile-video-wrapper" data-video="charms">
                  <video autoPlay muted loop playsInline preload="none" className="js-lazy-video">
                    <source data-src="/assets/videos/charms-loop.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="mobile-stats">
                  <div className="mobile-stat"><h2 className="stat-number" data-target="109">109K+</h2><p className="stat-label">views on TikTok</p></div>
                  <div className="mobile-stat"><h2 className="stat-number" data-target="38">38K+</h2><p className="stat-label">views on Instagram</p></div>
                </div>
              </div>
            </div>
            <div className="high-impact-right">
              <div className="high-impact-video-area">
                {[['0','welding'],['1','charms']].map(([step, vid]) => (
                  <div key={step} className="high-impact-video-wrapper" data-step={step} data-video={vid}>
                    <video muted loop playsInline preload="none" className="js-lazy-video">
                      <source data-src={`/assets/videos/${vid}-loop.mp4`} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
              <div className="high-impact-stats-container">
                <div className="high-impact-stats" data-step="0">
                  <div className="high-impact-stat"><h2 className="stat-number" data-target="225">225K+</h2><p className="stat-label">views on Instagram</p></div>
                  <div className="high-impact-stat"><h2 className="stat-number" data-target="163">163K+</h2><p className="stat-label">views on TikTok</p></div>
                </div>
                <div className="high-impact-stats" data-step="1">
                  <div className="high-impact-stat"><h2 className="stat-number" data-target="109">109K+</h2><p className="stat-label">views on TikTok</p></div>
                  <div className="high-impact-stat"><h2 className="stat-number" data-target="38">38K+</h2><p className="stat-label">views on Instagram</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
