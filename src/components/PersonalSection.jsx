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
    <section id="personal" className="relative bg-light-bg py-24">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-start">
        {/* Text column */}
        <div className="flex flex-col gap-10 md:pl-12">
          <div>
            <h2 className="leading-[0.96] mb-8">Personal Brand:<br />Built From Scratch</h2>
            <h3 className="mb-6 leading-snug">At a Glance</h3>
          </div>
          <div className="leading-[1.7]">
            <ul className="list-disc list-inside leading-[1.8] pl-0">
              <li className="mb-2">Built over the past 1.5 years in South Korea</li>
              <li className="mb-2">Niche: Educational, experience-led content about living in South Korea — helping others navigate daily life, work and cultural differences</li>
              <li className="mb-2">Grown organically, with multiple videos reaching 500K+ views</li>
              <li className="mb-2">Growth driven by strong hooks, story-led formats and consistent publishing informed by performance analysis</li>
            </ul>
          </div>
        </div>

        {/* Media column */}
        <div className="flex flex-col items-center md:flex-row md:items-stretch justify-center gap-8 md:pr-12">
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
