import { useEffect } from 'react'

const PARTNERS = [
  ['amoment.png','Amoment','https://www.instagram.com/reel/DKeYhuvzSVc/'],
  ['bunpo.png','Bunpo','https://www.instagram.com/reel/DHiahPmT5ym/'],
  ['casetify.webp','Casetify','https://www.instagram.com/reel/DScM48ek5js/'],
  ['may-clinic.webp','May Clinic','https://www.instagram.com/reel/DE7C2QSTY8q/'],
  ['musinsa.png','Musinsa','https://www.instagram.com/p/DUF1h6AEz2J/'],
  ['orcar.webp','Orcar','https://www.instagram.com/reel/DQ85W54k4yC/'],
  ['parkjun.png','Parkjun','https://www.instagram.com/reel/DER2I9Fz62e/'],
  ['pilates.webp','Pilates','https://www.instagram.com/reel/DJoT4k1Th7A/'],
  ['sido-place.png','Sido Place','https://www.instagram.com/reel/DJWSR_iTspz/'],
  ['timeleft.png','Timeleft','https://www.instagram.com/reel/DGaUT00TcUs/'],
]

export default function PartnershipsSection() {
  useEffect(() => {
    let partnershipsAnimated = false
    const partnershipsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !partnershipsAnimated) {
          partnershipsAnimated = true
          const metric = entry.target.querySelector('.partnerships-metric')
          if (metric) {
            const target = parseInt(metric.getAttribute('data-target'), 10)
            const startTime = performance.now()
            const animate = (ct) => {
              const progress = Math.min((ct - startTime) / 1200, 1)
              metric.textContent = '+' + Math.round(progress * target) + ' Projects'
              if (progress < 1) requestAnimationFrame(animate)
            }
            requestAnimationFrame(animate)
          }
          partnershipsObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.35 })
    const partnershipsSection = document.getElementById('partnerships')
    if (partnershipsSection) partnershipsObserver.observe(partnershipsSection)
  }, [])

  const allPartners = [...PARTNERS, ...PARTNERS]

  return (
    <section id="partnerships" className="relative bg-light-bg py-24 flex items-center min-h-[50vh]">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col gap-12">
        <h3 className="text-center leading-snug">Selected Brand Partnerships</h3>

        <div className="w-full overflow-hidden relative py-8">
          <div className="partnerships-strip">
            {allPartners.map(([img, alt, href], i) => (
              <a key={i} href={href} target="_blank" rel="noopener" className="partnership-logo">
                <img src={`/assets/images/${img}`} alt={alt} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h2 className="partnerships-metric leading-none" data-target="25">+25 Projects</h2>
          <p className="font-medium opacity-85 text-center">Concept · Strategy · Production · Publishing</p>
        </div>
      </div>
    </section>
  )
}
