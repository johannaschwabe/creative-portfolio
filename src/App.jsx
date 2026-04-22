import { useEffect, useState, lazy, Suspense } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Lightbox from './components/Lightbox'

const ApproachSection = lazy(() => import('./components/ApproachSection'))
const ArionSection = lazy(() => import('./components/ArionSection'))
const CaseStudySection = lazy(() => import('./components/CaseStudySection'))
const HighImpactSection = lazy(() => import('./components/HighImpactSection'))
const BeyondSection = lazy(() => import('./components/BeyondSection'))
const PersonalSection = lazy(() => import('./components/PersonalSection'))
const PartnershipsSection = lazy(() => import('./components/PartnershipsSection'))
const FoodCampaignSection = lazy(() => import('./components/FoodCampaignSection'))
const WHCampaignSection = lazy(() => import('./components/WHCampaignSection'))
const OnCameraSection = lazy(() => import('./components/OnCameraSection'))
const ConceptualSection = lazy(() => import('./components/ConceptualSection'))

const VIDEO_MAP = {
  '1': 'https://www.youtube.com/embed/Z15yr6iA9AY?rel=0&modestbranding=1&controls=1&autoplay=1',
  '4': 'https://www.youtube.com/embed/UVKuK5KKfy4?rel=0&modestbranding=1&controls=1&autoplay=1',
  '2': 'https://www.youtube.com/embed/H4WRrZAg1bg?rel=0&modestbranding=1&controls=1&autoplay=1',
  'welding': 'https://www.youtube.com/embed/N8Zt4RWaYQk?rel=0&modestbranding=1&controls=1&autoplay=1',
  'charms': 'https://www.youtube.com/embed/7weE8Sq4ygw?rel=0&modestbranding=1&controls=1&autoplay=1',
  'beyond1': 'https://www.youtube.com/embed/NbbxWNe8Dqk?rel=0&modestbranding=1&controls=1&autoplay=1',
  'beyond2': 'https://www.youtube.com/embed/WWGjRPvqExE?rel=0&modestbranding=1&controls=1&autoplay=1',
  'beyond3': 'https://www.youtube.com/embed/VattR88gioE?rel=0&modestbranding=1&controls=1&autoplay=1',
  'beyond4': 'https://www.youtube.com/embed/jxvz9QxAvng?rel=0&modestbranding=1&controls=1&autoplay=1',
  'beyond5': 'https://www.youtube.com/embed/4XryKEoL1z0?rel=0&modestbranding=1&controls=1&autoplay=1',
  'beyond6': 'https://www.youtube.com/embed/GECJ6PszICs?rel=0&modestbranding=1&controls=1&autoplay=1',
  'food': 'https://www.youtube.com/embed/x2xMSptReNE?rel=0&modestbranding=1&controls=1&autoplay=1',
  'wh1': 'https://www.youtube.com/embed/xfoYZqajDkM?rel=0&modestbranding=1&controls=1&autoplay=1',
  'wh3': 'https://www.youtube.com/embed/BeHwGrCJXcA?rel=0&modestbranding=1&controls=1&autoplay=1',
  'wh4': 'https://www.youtube.com/embed/2W78tkcDFsw?rel=0&modestbranding=1&controls=1&autoplay=1',
}

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = privacyOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [privacyOpen])
  useEffect(() => {
    // Lightbox
    let lightboxTriggerElement = null

    function openLightbox(videoId) {
      const src = VIDEO_MAP[videoId]
      if (!src) return
      const lightbox = document.getElementById('caseLightbox')
      const lightboxVideo = document.getElementById('lightboxVideo')
      if (!lightbox || !lightboxVideo) return
      lightboxTriggerElement = document.activeElement
      lightboxVideo.src = ''
      lightboxVideo.src = src
      lightbox.classList.add('active')
      const closeBtn = document.getElementById('lightboxClose')
      if (closeBtn) closeBtn.focus()
    }

    function closeLightbox() {
      const lightbox = document.getElementById('caseLightbox')
      const lightboxVideo = document.getElementById('lightboxVideo')
      if (lightbox && lightboxVideo) {
        lightbox.classList.remove('active')
        lightboxVideo.src = ''
        if (lightboxTriggerElement) { lightboxTriggerElement.focus(); lightboxTriggerElement = null }
      }
    }

    const VIDEO_WRAPPER_SELECTORS = '.case-study-video-wrapper,.high-impact-video-wrapper,.beyond-video-wrapper,.mobile-video-wrapper,.food-campaign-video-wrapper,.wh-campaign-video-wrapper'

    document.addEventListener('click', (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return
      if (e.target.closest('#caseLightbox')) return
      let wrapper = e.target.closest(VIDEO_WRAPPER_SELECTORS)
      if (!wrapper && e.composedPath) wrapper = e.composedPath().find(el => el && el.classList && VIDEO_WRAPPER_SELECTORS.split(',').some(s => el.classList.contains(s.trim().slice(1))))
      if (!wrapper) return
      e.preventDefault(); e.stopImmediatePropagation()
      openLightbox(wrapper.getAttribute('data-video'))
    }, true)

    document.addEventListener('click', (e) => {
      if (e.target && typeof e.target.closest === 'function') {
        if (e.target.closest('#lightboxClose')) closeLightbox()
        const lb = document.getElementById('caseLightbox')
        if (e.target === lb) closeLightbox()
      }
    })

    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('caseLightbox')
      if (!lightbox || !lightbox.classList.contains('active')) return
      if (e.key === 'Escape') { closeLightbox(); return }
      if (e.key === 'Tab') {
        const focusable = lightbox.querySelector('.case-lightbox-content').querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')
        const first = focusable[0]; const last = focusable[focusable.length - 1]
        if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
        else { if (document.activeElement === last) { e.preventDefault(); first.focus() } }
      }
    })

    // Lazy video loading (cross-section: beyond videos preload on high-impact scroll)
    const lazyVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target
          const source = video.querySelector('source[data-src]')
          if (source) { source.setAttribute('src', source.getAttribute('data-src')); source.removeAttribute('data-src') }
          video.load(); video.play().catch(() => {})
          lazyVideoObserver.unobserve(video)
        }
      })
    }, { rootMargin: '300px' })

    const beyondVideos = []
    document.querySelectorAll('.js-lazy-video').forEach((video) => {
      if (video.closest('.beyond-section')) beyondVideos.push(video)
      else lazyVideoObserver.observe(video)
    })

    const highImpactTrigger = document.querySelector('.high-impact-section')
    if (highImpactTrigger) {
      const beyondPreloader = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { beyondVideos.forEach(v => lazyVideoObserver.observe(v)); beyondPreloader.disconnect() }
        })
      }, { threshold: 0 })
      beyondPreloader.observe(highImpactTrigger)
    } else {
      beyondVideos.forEach(v => lazyVideoObserver.observe(v))
    }
  }, [])

  return (
    <>
      <Header />
      <main className="flex flex-col gap-12">
        <HeroSection />
        <Suspense fallback={null}>
          <ApproachSection />
          <ArionSection />
          <CaseStudySection />
          <HighImpactSection />
          <BeyondSection />
          <PersonalSection />
          <PartnershipsSection />
          <FoodCampaignSection />
          <WHCampaignSection />
          <OnCameraSection />
          <ConceptualSection />
        </Suspense>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <button className="footer-privacy-btn" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button>
            <span className="footer-divider">·</span>
            <a className="footer-contact" href="mailto:johanna.schwabe@kabsi.at">johanna.schwabe@kabsi.at</a>
          </div>
          <p className="footer-disclaimer">This portfolio is intended for job application purposes only. Selected images are used for reference or illustrative purposes and are not my original work.</p>
        </div>
      </footer>

      {privacyOpen && (
        <div className="privacy-modal-overlay" onClick={() => setPrivacyOpen(false)}>
          <div className="privacy-modal" onClick={e => e.stopPropagation()}>
            <button className="privacy-modal-close" onClick={() => setPrivacyOpen(false)}>×</button>
            <h3>Privacy Policy</h3>
            <p>This website is a personal portfolio created for job application purposes.</p>
            <h4>Server Log Files</h4>
            <p>The website hosting provider may automatically collect and store information in server log files that your browser transmits automatically. This may include information such as browser type, operating system, referring URL, IP address, and time of the request. This data is used to ensure the proper functioning and security of the website and is not combined with other data sources.</p>
            <h4>Embedded YouTube Videos</h4>
            <p>This website includes embedded videos from YouTube. YouTube is operated by Google Ireland Limited. When you visit a page containing an embedded YouTube video, your browser may establish a connection to YouTube's servers. As a result, YouTube may receive information about your visit to this website. If you are logged into your YouTube account, YouTube may associate your browsing behavior with your personal profile. For more information, please refer to YouTube's privacy policy.</p>
            <h4>Contact</h4>
            <p>If you contact me via email, your message and contact details will only be used for the purpose of responding to your inquiry.</p>
          </div>
        </div>
      )}

      <Lightbox />
    </>
  )
}
