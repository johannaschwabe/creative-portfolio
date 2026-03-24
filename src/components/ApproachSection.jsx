import { useEffect } from 'react'

export default function ApproachSection() {
  useEffect(() => {
    const approachObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-approach-animate]').forEach(el => el.classList.add('visible'))
          ;['approach-heading', 'approach-body', 'approach-intro'].forEach(cls => {
            const el = entry.target.querySelector('.' + cls)
            if (el) el.classList.add('visible')
          })
        }
      })
    }, { threshold: 0.1 })
    const approachSection = document.getElementById('approach')
    if (approachSection) {
      approachObserver.observe(approachSection)
      const fallbackCheck = () => {
        const rect = approachSection.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.9) {
          approachSection.querySelectorAll('[data-approach-animate]').forEach((el) => {
            const order = parseInt(el.getAttribute('data-approach-animate'), 10)
            setTimeout(() => el.classList.add('visible'), order * 150)
          })
          ;['approach-heading', 'approach-body', 'approach-intro'].forEach(cls => {
            const el = approachSection.querySelector('.' + cls)
            if (el) el.classList.add('visible')
          })
          approachObserver.unobserve(approachSection)
        }
      }
      fallbackCheck()
      setTimeout(fallbackCheck, 100)
    }
  }, [])

  return (
    <section id="approach" className="relative flex items-center bg-light-bg md:h-screen py-24 md:overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row md:justify-between md:items-center gap-12 md:gap-8 md:h-full">
        <div className="flex flex-col items-center w-full md:basis-[48%] md:shrink-0 md:pr-16 justify-center md:pt-28">
          <div className="approach-visuals">
            <div className="approach-image-wrapper" data-approach-animate="0">
              <img src="/assets/images/approach-2.jpg" alt="Portrait" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start text-left w-full md:max-w-[550px] gap-8 justify-center md:pt-28">
          <h2 className="approach-heading">My Approach</h2>
          <p className="approach-body" data-approach-animate="3">I'm a creative who has lived and worked in South Korea for the past 1.5 years. Working both in front of and behind the camera has shaped how I think end-to-end — from concept and planning to execution and performance. I'm driven by building structure around ideas, organizing creative processes and committing to projects from start to finish. After developing this mindset in Korea, I'm preparing to bring it back to Europe and grow within strategy-led creative teams.</p>
          <h4 className="approach-intro" data-approach-animate="4">Creative work, <span style={{ color: '#9A5858' }}>built with intention.</span></h4>
        </div>
      </div>
    </section>
  )
}
