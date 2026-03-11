import { useEffect } from 'react'

export default function PersonalSection() {
  useEffect(() => {
    const personalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-personal-animate]').forEach((el) => {
            setTimeout(() => el.classList.add('visible'), parseInt(el.getAttribute('data-personal-animate'), 10) * 150)
          })
          const phoneScreen = document.getElementById('personalPhoneScreen')
          if (phoneScreen) setTimeout(() => phoneScreen.classList.add('active'), 800)
          personalObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.25, rootMargin: '0px 0px -15% 0px' })
    const personalSection = document.getElementById('personal')
    if (personalSection) personalObserver.observe(personalSection)
  }, [])

  return (
    <section className="personal-section" id="personal">
      <div className="personal-container">
        <div className="personal-text-column">
          <div className="personal-header">
            <h2>Personal Brand:<br />Built From Scratch</h2>
            <h3>At a Glance</h3>
          </div>
          <div className="personal-text">
            <ul>
              <li>Built over the past 1.5 years in South Korea</li>
              <li>Niche: Educational, experience-led content about living in South Korea — helping others navigate daily life, work and cultural differences</li>
              <li>Grown organically, with multiple videos reaching 500K+ views</li>
              <li>Growth driven by strong hooks, story-led formats and consistent publishing informed by performance analysis</li>
            </ul>
          </div>
        </div>
        <div className="personal-media-column">
          <div className="personal-images-stack">
            {[['personal-1.jpg','0'],['personal-3.jpg','1'],['personal-2.jpg','2']].map(([img, n]) => (
              <div key={n} className="personal-image-wrapper" data-personal-animate={n}>
                <img src={`/assets/images/${img}`} alt="Personal brand work" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="personal-phone-mockup">
            <div className="personal-phone-screen" id="personalPhoneScreen">
              <div className="personal-screen-content">
                <div className="personal-screen-bio"><img src="/assets/images/personal-bio.jpg" alt="Instagram bio" /></div>
                <div className="personal-screen-feed"><img src="/assets/images/personal-feed.jpg" alt="Instagram feed" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
