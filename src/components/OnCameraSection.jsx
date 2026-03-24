import { useEffect } from 'react'

export default function OnCameraSection() {
  useEffect(() => {
    const onCameraObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); onCameraObserver.unobserve(entry.target) }
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('.on-camera-youtube').forEach((item, i) => setTimeout(() => onCameraObserver.observe(item), i * 200))
  }, [])

  return (
    <section id="on-camera" className="relative bg-light-bg py-24">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1.5fr] gap-12 items-start">
        {/* Left: image grid */}
        <div className="flex items-center justify-end">
          <div className="on-camera-grid">
            {['on-camera-1.jpeg','on-camera-2.jpeg','on-camera-3.jpg','on-camera-4.jpg'].map((img, i) => (
              <div key={i} className="on-camera-image">
                <img src={`/assets/images/${img}`} alt="On-camera work" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Center: text */}
        <div className="flex flex-col gap-8 max-w-[350px]">
          <h2 className="leading-[0.96] mb-8">On-Camera Experience</h2>
          <div>
            <h4 className="mb-3">What this adds</h4>
            <ul className="list-disc list-inside leading-[1.8] pl-0 m-0">
              <li className="mb-2">On-camera presence and confidence</li>
              <li className="mb-2">Moderation and improvisation within scripted formats</li>
              <li className="mb-2">Understanding of set workflows, direction and timing</li>
            </ul>
          </div>
        </div>

        {/* Right: YouTube thumbnails */}
        <div className="flex flex-col gap-6 max-w-[440px]">
          <a href="https://youtu.be/V22sz72V04E" target="_blank" rel="noopener" className="on-camera-youtube">
            <img src="https://img.youtube.com/vi/V22sz72V04E/maxresdefault.jpg" alt="YouTube video" />
          </a>
          <a href="https://youtu.be/hHNzZd6Gn_0" target="_blank" rel="noopener" className="on-camera-youtube">
            <img src="https://img.youtube.com/vi/hHNzZd6Gn_0/maxresdefault.jpg" alt="YouTube video" />
          </a>
        </div>
      </div>
    </section>
  )
}
