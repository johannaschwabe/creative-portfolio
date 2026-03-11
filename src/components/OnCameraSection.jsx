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
    <section className="on-camera-section" id="on-camera">
      <div className="on-camera-container">
        <div className="on-camera-left">
          <div className="on-camera-grid">
            {['on-camera-1.jpeg','on-camera-2.jpeg','on-camera-3.jpg','on-camera-4.jpg'].map((img, i) => (
              <div key={i} className="on-camera-image">
                <img src={`/assets/images/${img}`} alt="On-camera work" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <div className="on-camera-center">
          <h2>On-Camera Experience</h2>
          <h4>What this adds</h4>
          <ul>
            <li>On-camera presence and confidence</li>
            <li>Moderation and improvisation within scripted formats</li>
            <li>Understanding of set workflows, direction and timing</li>
          </ul>
        </div>
        <div className="on-camera-right">
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
