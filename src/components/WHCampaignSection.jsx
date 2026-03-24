import { useEffect } from 'react'

export default function WHCampaignSection() {
  useEffect(() => {
    const whCampaignSection = document.querySelector('.wh-campaign-section')
    const whCampaignSteps = document.querySelectorAll('.wh-campaign-step')
    const whCampaignVideos = document.querySelectorAll('.wh-campaign-video-wrapper')
    let currentWhStep = -1

    function updateWhCampaignStep() {
      if (!whCampaignSection) return
      const rect = whCampaignSection.getBoundingClientRect()
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (whCampaignSection.offsetHeight - window.innerHeight)))
      const stepIndex = Math.min(whCampaignSteps.length - 1, Math.floor(scrollProgress * whCampaignSteps.length))
      if (stepIndex !== currentWhStep) {
        currentWhStep = stepIndex
        whCampaignSteps.forEach((step, i) => step.classList.toggle('active', i === currentWhStep))
        whCampaignVideos.forEach((wrapper) => {
          const isActive = parseInt(wrapper.getAttribute('data-step')) === currentWhStep
          wrapper.classList.toggle('active', isActive)
          const videoEl = wrapper.querySelector('video')
          if (videoEl) { if (isActive) videoEl.play().catch(() => {}); else videoEl.pause() }
        })
        if (currentWhStep === 2) {
          document.querySelectorAll('.wh-comment').forEach((comment, i) => {
            setTimeout(() => comment.classList.add('visible'), i * 200)
          })
        }
      }
    }

    window.addEventListener('scroll', updateWhCampaignStep)
    updateWhCampaignStep()

    if (currentWhStep === -1 && whCampaignSteps.length && window.innerWidth > 768) {
      currentWhStep = 0
      whCampaignSteps.forEach((step, i) => step.classList.toggle('active', i === 0))
      whCampaignVideos.forEach((wrapper) => {
        const isActive = wrapper.getAttribute('data-step') === '0'
        wrapper.classList.toggle('active', isActive)
        const videoEl = wrapper.querySelector('video')
        if (videoEl && isActive) videoEl.play().catch(() => {})
      })
    }

    return () => {
      window.removeEventListener('scroll', updateWhCampaignStep)
    }
  }, [])

  return (
    <section className="wh-campaign-section" id="wh-campaign">
      <div className="scroll-height-wh">
        <div className="wh-campaign-wrapper">
          <div className="wh-campaign-container">
            <div className="wh-campaign-left">
              <div className="wh-campaign-step" data-step="0">
                <h3>Personal Brand Campaign</h3>
                <p>A self-initiated video series built on my own platform, designed to prioritize trust over reach. Developed independently and without sponsorship, the project focused on building long-term credibility as a basis for future collaborations.</p>
                <h4>Market Gap</h4>
                <ul>
                  <li>Work &amp; Travel in Korea lacked structured content across online platforms.</li>
                  <li>Existing information appeared as isolated posts, with no consistent short-form series combining practical guidance with lived experience.</li>
                </ul>
                <h4>Concept</h4>
                <p>A structured short-form video series addressing key topics around Work &amp; Travel in Korea.</p>
              </div>
              <div className="wh-campaign-step" data-step="1">
                <h4>Each video was designed to:</h4>
                <ul>
                  <li>Address a specific problem through a strong hook</li>
                  <li>Follow a consistent format to encourage return viewing</li>
                  <li>Combine personal insight with practical guidance</li>
                  <li>Work independently while contributing to a larger narrative</li>
                </ul>
                <p>The execution resulted in 18 short-form videos produced as an episodic series. There was no external brief or paid media involved, ensuring full creative ownership from start to finish.</p>
                <h4>Result</h4>
                <p>The campaign generated strong engagement and returning viewers. Despite modest reach, follower growth was strong relative to views, with consistent messages signaling trust and community building.</p>
              </div>
              <div className="wh-campaign-step" data-step="2">
                <div className="wh-step3-layout">
                  <div className="wh-comments">
                    {[1,2,3,4,5].map((n, i) => (
                      <div key={i} className="wh-comment" data-comment={String(i)}>
                        <img src={`/assets/images/wh-comments-${n}.jpg`} alt="Viewer comment" />
                      </div>
                    ))}
                  </div>
                  <div className="wh-comparison-wrapper">
                    <div className="wh-comparison">
                      <div className="wh-comparison-item">
                        <h4>Viral video</h4>
                        <p className="wh-metric">1.3M views</p>
                        <p className="wh-metric">124 followers</p>
                      </div>
                      <div className="wh-comparison-item">
                        <h4>Campaign video</h4>
                        <p className="wh-metric"><span style={{ color: '#9A5858', fontWeight: '700' }}>35K</span> views</p>
                        <p className="wh-metric"><span style={{ color: '#9A5858', fontWeight: '700' }}>322</span> followers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wh-campaign-right">
              {[['0','wh1'],['1','wh3'],['2','wh4']].map(([step, vid]) => (
                <div key={step} className={`wh-campaign-video-wrapper${step === '0' ? ' active' : ''}`} data-step={step} data-video={vid}>
                  <video muted loop playsInline preload="none" className="js-lazy-video">
                    <source data-src={`/assets/videos/${vid.replace('wh','wh-loop-')}.mp4`} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
