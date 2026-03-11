import { useEffect } from 'react'

export default function CaseStudySection() {
  useEffect(() => {
    const caseStudySection = document.querySelector('.case-study-section')
    const caseStudySteps = document.querySelectorAll('.case-study-step')
    const caseStudyVideos = document.querySelectorAll('.case-study-video-wrapper')
    let currentStep = -1
    function updateCaseStudyStep() {
      if (!caseStudySection) return
      const rect = caseStudySection.getBoundingClientRect()
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (caseStudySection.offsetHeight - window.innerHeight)))
      const stepIndex = Math.min(caseStudySteps.length - 1, Math.floor(scrollProgress * caseStudySteps.length))
      if (stepIndex !== currentStep) {
        currentStep = stepIndex
        caseStudySteps.forEach((step, i) => step.classList.toggle('active', i === currentStep))
        caseStudyVideos.forEach((wrapper) => {
          const isActive = parseInt(wrapper.getAttribute('data-step')) === currentStep
          wrapper.classList.toggle('active', isActive)
          const videoEl = wrapper.querySelector('video')
          if (videoEl) { if (isActive) videoEl.play().catch(() => {}); else videoEl.pause() }
        })
      }
    }
    window.addEventListener('scroll', updateCaseStudyStep)
    updateCaseStudyStep()

    return () => {
      window.removeEventListener('scroll', updateCaseStudyStep)
    }
  }, [])

  return (
    <section className="case-study-section" id="case-study">
      <div className="scroll-height-case">
        <div className="case-study-wrapper">
          <div className="case-study-container">
            <div className="case-study-left">
              {[['0','1'],['1','4'],['2','2']].map(([step, vid]) => (
                <div key={step} className="case-study-video-wrapper" data-step={step} data-video={vid}>
                  <video muted loop playsInline preload="none" className="js-lazy-video">
                    <source data-src={`/assets/videos/case-video-${vid}-loop.mp4`} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
            <div className="case-study-right">
              <div className="case-study-step" data-step="0">
                <h3>Campaign Case Study — Arion on Air</h3>
                <h4>Goal</h4>
                <p>To make the brand feel more personal and build a strong, loyal community through storytelling.</p>
                <h4>Idea &amp; Concept</h4>
                <p>A video series featuring the founders of Arion Jewelry, designed to highlight the brand's values, inspiration and background. The format combined guided conversations with collaborative elements, using transparency and personal insight to strengthen emotional connection and long-term engagement.</p>
              </div>
              <div className="case-study-step" data-step="1">
                <h4>My Responsibilities</h4>
                <ul>
                  <li>Concept development and series framework</li>
                  <li>Interview planning, moderation and on-set direction</li>
                  <li>Coordination with photographer and shoot planning</li>
                  <li>Video editing, post-production and publishing</li>
                </ul>
                <p className="case-study-note">Executed as a structured, repeatable video series in close collaboration with the photographer.</p>
              </div>
              <div className="case-study-step" data-step="2">
                <h4>Outcome &amp; Learnings</h4>
                <ul>
                  <li>Prioritized brand depth and transparency over short-term reach</li>
                  <li>Generated engaged, high-quality community interactions</li>
                  <li>Strengthened storytelling as a core pillar of Arion's content strategy</li>
                </ul>
                <div className="case-study-bts-grid">
                  {['case-bts-2.jpg','case-bts-1.jpg','case-bts-3.jpg'].map((img, i) => (
                    <div key={i} className="case-study-bts-item">
                      <img src={`/assets/images/${img}`} alt={`Behind the scenes ${i+1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
