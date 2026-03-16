import { useEffect, useState } from 'react'

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })

    // Hero word cycling
    const word1 = document.getElementById('word1')
    const word2 = document.getElementById('word2')
    let elapsed = 0
    let lastTime = null
    const textTimings = {
      fadeOutStart: 3, fadeOutEnd: 3.5, fadeInStart: 3.8, fadeInEnd: 4.3,
      reverseFadeOutStart: 7.3, reverseFadeOutEnd: 7.8, reverseFadeInStart: 8.1,
      reverseFadeInEnd: 8.6, cycleDuration: 8.6
    }
    let rafId
    function updateTitlesLoop(timestamp) {
      if (lastTime === null) lastTime = timestamp
      elapsed += (timestamp - lastTime) / 1000
      lastTime = timestamp
      const t = elapsed % textTimings.cycleDuration
      if (t < textTimings.fadeOutStart) { word1.style.opacity = '1'; word2.style.opacity = '0' }
      else if (t < textTimings.fadeOutEnd) { const p = (t - textTimings.fadeOutStart) / (textTimings.fadeOutEnd - textTimings.fadeOutStart); word1.style.opacity = String(1 - p); word2.style.opacity = '0' }
      else if (t < textTimings.fadeInStart) { word1.style.opacity = '0'; word2.style.opacity = '0' }
      else if (t < textTimings.fadeInEnd) { const p = (t - textTimings.fadeInStart) / (textTimings.fadeInEnd - textTimings.fadeInStart); word1.style.opacity = '0'; word2.style.opacity = String(p) }
      else if (t < textTimings.reverseFadeOutStart) { word1.style.opacity = '0'; word2.style.opacity = '1' }
      else if (t < textTimings.reverseFadeOutEnd) { const p = (t - textTimings.reverseFadeOutStart) / (textTimings.reverseFadeOutEnd - textTimings.reverseFadeOutStart); word1.style.opacity = '0'; word2.style.opacity = String(1 - p) }
      else if (t < textTimings.reverseFadeInStart) { word1.style.opacity = '0'; word2.style.opacity = '0' }
      else if (t < textTimings.reverseFadeInEnd) { const p = (t - textTimings.reverseFadeInStart) / (textTimings.reverseFadeInEnd - textTimings.reverseFadeInStart); word1.style.opacity = String(p); word2.style.opacity = '0' }
      else { word1.style.opacity = '1'; word2.style.opacity = '0' }
      rafId = requestAnimationFrame(updateTitlesLoop)
    }
    rafId = requestAnimationFrame(updateTitlesLoop)

    // Header scroll state
    const header = document.getElementById('mainHeader')
    const heroSection = document.getElementById('home')
    function updateHeaderColor() {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
      if (window.scrollY + 100 > heroBottom) header.classList.add('scrolled')
      else header.classList.remove('scrolled')
    }
    window.addEventListener('scroll', updateHeaderColor)
    updateHeaderColor()

    // Approach animations
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

    // Arion grid animation
    const arionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const gridItems = Array.from(entry.target.querySelectorAll('[data-arion-animate]'))
          for (let i = gridItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [gridItems[i], gridItems[j]] = [gridItems[j], gridItems[i]]
          }
          gridItems.forEach((item, index) => setTimeout(() => item.classList.add('visible'), index * 100))
          arionObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })
    const arionGrid = document.querySelector('.arion-grid')
    if (arionGrid) arionObserver.observe(arionGrid)

    // Case study scroll steps
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

    // Lightbox
    const videoMap = {
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
    let lightboxTriggerElement = null
    function openLightbox(videoId) {
      const src = videoMap[videoId]
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
    document.addEventListener('click', (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return
      if (e.target.closest('#caseLightbox')) return
      const selectors = '.case-study-video-wrapper,.high-impact-video-wrapper,.beyond-video-wrapper,.mobile-video-wrapper,.food-campaign-video-wrapper,.wh-campaign-video-wrapper'
      let wrapper = e.target.closest(selectors)
      if (!wrapper && e.composedPath) wrapper = e.composedPath().find(el => el && el.classList && selectors.split(',').some(s => el.classList.contains(s.trim().slice(1))))
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

    // High impact scroll steps
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

    // Personal section animations
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

    // Partnerships metric animation
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

    // Food campaign stats
    const animatedFoodStats = new Set()
    function animateFoodStats(statsBlock) {
      statsBlock.querySelectorAll('.stat-number').forEach((num) => {
        if (animatedFoodStats.has(num)) return
        animatedFoodStats.add(num)
        const target = parseInt(num.getAttribute('data-target'))
        const hasPlus = num.textContent.includes('+')
        const start = Math.max(10, target - 15)
        const startTime = performance.now()
        const animate = (ct) => {
          const progress = Math.min((ct - startTime) / 800, 1)
          num.textContent = Math.round(start + (target - start) * progress) + 'K' + (hasPlus ? '+' : '')
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      })
    }
    const foodCampaignObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statsBlock = entry.target.querySelector('.food-campaign-stats')
          if (statsBlock) animateFoodStats(statsBlock)
          foodCampaignObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    const foodCampaignSection = document.getElementById('food-campaign')
    if (foodCampaignSection) foodCampaignObserver.observe(foodCampaignSection)

    // WH Campaign scroll steps
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

    // Conceptual image animations
    const conceptualObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); conceptualObserver.unobserve(entry.target) }
      })
    }, { threshold: 0.25 })
    const conceptualMainImage = document.querySelector('.conceptual-main-image')
    if (conceptualMainImage) conceptualObserver.observe(conceptualMainImage)
    document.querySelectorAll('.conceptual-grid-item').forEach((item, i) => setTimeout(() => conceptualObserver.observe(item), i * 200))

    // On camera YouTube fade in
    const onCameraObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); onCameraObserver.unobserve(entry.target) }
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('.on-camera-youtube').forEach((item, i) => setTimeout(() => onCameraObserver.observe(item), i * 200))

    // Lazy video loading
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

    // Hamburger menu
    const hamburgerBtn = document.getElementById('hamburgerBtn')
    const navLinks = document.getElementById('navLinks')
    if (hamburgerBtn && navLinks) {
      hamburgerBtn.addEventListener('click', () => navLinks.classList.toggle('open'))
      navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')))
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', updateHeaderColor)
      window.removeEventListener('scroll', updateCaseStudyStep)
      window.removeEventListener('scroll', updateHighImpactStep)
      window.removeEventListener('scroll', updateWhCampaignStep)
    }
  }, [])

  return (
    <>
      <header id="mainHeader">
        <nav>
          <button className="hamburger" id="hamburgerBtn" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="nav-links" id="navLinks">
            <li><a href="#home">Home</a></li>
            <li><a href="mailto:johanna.schwabe@kabsi.at">Contact</a></li>
            <li><a href="https://www.instagram.com/globaldiariess" target="_blank" rel="noopener noreferrer">Socials</a></li>
            <li><a href="/assets/documents/cv-johanna-schwabe.pdf" target="_blank" rel="noopener noreferrer">CV</a></li>
            <li><a href="#arion">View Work</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="hero">
          <video className="hero-video" autoPlay muted loop playsInline id="heroVideo">
            <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-credit">presented by Johanna Schwabe</div>
          <div className="hero-content">
            <div className="hero-title-wrapper">
              <h1>
                <span className="hero-title-line">
                  <span className="hero-word">
                    <span className="hero-word-content">
                      <span className="word-variant word-variant-1" id="word1">From Creator</span>
                      <span className="word-variant word-variant-2" id="word2">to Creative</span>
                    </span>
                  </span>
                </span>
              </h1>
            </div>
            <p className="hero-subtitle">Creative with a background in brand building,<br />production &amp; social media</p>
          </div>
        </section>

        {/* Approach */}
        <section className="approach-section" id="approach">
          <div className="approach-container">
            <div className="approach-left">
              <div className="approach-visuals">
                <div className="approach-image-wrapper" data-approach-animate="0">
                  <img src="/assets/images/approach-2.jpg" alt="Portrait" />
                </div>
              </div>
            </div>
            <div className="approach-right">
              <h2 className="approach-heading">My Approach</h2>
              <p className="approach-body" data-approach-animate="3">I'm a creative who has lived and worked in South Korea for the past 1.5 years. Working both in front of and behind the camera has shaped how I think end-to-end — from concept and planning to execution and performance. I'm driven by building structure around ideas, organizing creative processes and committing to projects from start to finish. After developing this mindset in Korea, I'm preparing to bring it back to Europe and grow within strategy-led creative teams.</p>
              <h4 className="approach-intro" data-approach-animate="4">Creative work, <span style={{ color: '#9A5858' }}>built with intention.</span></h4>
            </div>
          </div>
        </section>

        {/* Arion */}
        <section className="arion-section" id="arion">
          <div className="arion-container">
            <div className="arion-left">
              <div className="arion-title-area">
                <h2>Arion – From <img src="/assets/images/arion-logo.png" alt="Arion Jewelry" className="arion-logo" /><br />Concept to Impact</h2>
              </div>
              <div className="arion-subchapter">
                <h3>At a Glance</h3>
                <div className="arion-info-box-1">
                  <div className="arion-info-row">
                    <div className="arion-info-item"><h4>Brand:</h4><p>Arion Jewelry</p></div>
                    <div className="arion-info-item"><h4>Timeframe:</h4><p>2.5 Years</p></div>
                  </div>
                  <div className="arion-role-item">
                    <h4>My Role:</h4>
                    <ul className="arion-role-list">
                      <li>Content Creation &amp; Creative Direction</li>
                      <li>Video Production (Filming, Editing, Publishing)</li>
                      <li>Social Media Strategy &amp; Community Building</li>
                    </ul>
                  </div>
                </div>
                <div className="arion-info-box-2">
                  <p className="arion-description">
                    <span className="arion-desc-line">Arion Jewelry is a Vienna-based East-meets-West jewelry brand</span>
                    <span className="arion-desc-line">combining cultural influences with modern design and accessible quality.</span>
                  </p>
                  <div className="arion-goals">
                    <h4>Brand goals</h4>
                    <ul>
                      <li>Cultural storytelling</li>
                      <li>Consistent social media presence</li>
                      <li>Community-driven content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="arion-right">
              <div className="arion-grid">
                {[
                  ['arion-intro-4.jpg','4'],['arion-intro-1.jpg','1'],['arion-intro-3.jpg','3'],
                  ['arion-intro-6.jpg','6'],['arion-intro-5.jpg','5'],['arion-intro-7.jpg','7'],
                  ['arion-intro-2.jpg','2'],['arion-intro-8.jpg','8'],['arion-intro-9.jpg','9'],
                ].map(([file, num], i) => (
                  <div key={i} className="arion-grid-item" data-arion-animate={String(i)}>
                    <img src={`/assets/images/${file}`} alt={`Arion work ${num}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Study */}
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

        {/* High Impact */}
        <section className="high-impact-section" id="high-impact">
          <div className="scroll-height-impact">
            <div className="high-impact-wrapper">
              <div className="high-impact-container">
                <div className="high-impact-left">
                  <h3 className="high-impact-heading">High-Impact Campaigns</h3>
                  <div className="high-impact-step" data-step="0">
                    <h4>Eternal Bracelets</h4>
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
                    <h4>Phone Charms</h4>
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

        {/* Beyond */}
        <section className="beyond-section" id="beyond">
          <div className="beyond-spacer">
            <div className="beyond-wrapper">
              <div className="beyond-container">
                <h3 className="beyond-title">Beyond Campaigns</h3>
                <p className="beyond-band-subtitle">Testing formats and evolving the brand's visual language.</p>
                <div className="beyond-band beyond-band-top">
                  <div className="beyond-timeline beyond-timeline-left">
                    <div className="beyond-timeline-track">
                      {['beyond1','beyond2','beyond3','beyond5','beyond4','beyond6','beyond1','beyond2','beyond3','beyond5','beyond4','beyond6'].map((vid, i) => (
                        <div key={i} className="beyond-video-wrapper" data-video={vid}>
                          <video autoPlay muted loop playsInline preload="none" className="js-lazy-video">
                            <source data-src={`/assets/videos/beyond-video-${vid.replace('beyond','')}-loop.mp4`} type="video/mp4" />
                          </video>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="beyond-band beyond-band-bottom">
                  <h4 className="beyond-band-heading">On-Set Photographer Collaboration</h4>
                  <div className="beyond-text-content">
                    <h4>My Responsibilities</h4>
                    <ul>
                      <li>Content creation alongside the photographer during photoshoots</li>
                      <li>Supporting on-set workflows and creative execution</li>
                      <li>Producing behind-the-scenes photo and video content</li>
                    </ul>
                  </div>
                  <div className="beyond-timeline beyond-timeline-right">
                    <div className="beyond-timeline-track">
                      {[
                        {type:'img',n:1},{type:'vid',n:1},{type:'img',n:2},{type:'vid',n:2},{type:'img',n:3},{type:'vid',n:3},
                        {type:'img',n:1},{type:'vid',n:1},{type:'img',n:2},{type:'vid',n:2},{type:'img',n:3},{type:'vid',n:3},
                      ].map((item, i) => (
                        item.type === 'img' ? (
                          <div key={i} className="beyond-bts-item">
                            <img src={`/assets/images/beyond-photo-${item.n}.jpg`} alt="Behind the scenes" />
                          </div>
                        ) : (
                          <div key={i} className="beyond-bts-item">
                            <video autoPlay muted loop playsInline preload="none" className="js-lazy-video">
                              <source data-src={`/assets/videos/beyond-bts-${item.n}.mp4`} type="video/mp4" />
                            </video>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal */}
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

        {/* Partnerships */}
        <section className="partnerships-section" id="partnerships">
          <div className="partnerships-container">
            <h3 className="partnerships-heading">Selected Brand Partnerships</h3>
            <div className="partnerships-strip-wrapper">
              <div className="partnerships-strip">
                {[
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
                ].map(([img, alt, href], i) => (
                  <a key={i} href={href} target="_blank" rel="noopener" className="partnership-logo">
                    <img src={`/assets/images/${img}`} alt={alt} />
                  </a>
                ))}
              </div>
            </div>
            <div className="partnerships-footer">
              <h2 className="partnerships-metric" data-target="25">+25 Projects</h2>
              <p className="partnerships-caption">Concept · Strategy · Production · Publishing</p>
            </div>
          </div>
        </section>

        {/* Food Campaign */}
        <section className="food-campaign-section" id="food-campaign">
          <div className="food-campaign-wrapper">
            <div className="food-campaign-container">
              <div className="food-campaign-left">
                <div className="food-campaign-stats-container">
                  <div className="food-campaign-stats">
                    <div className="food-campaign-stat"><h2 className="stat-number" data-target="252">252K+</h2><p className="stat-label">views on Instagram</p></div>
                    <div className="food-campaign-stat"><h2 className="stat-number" data-target="51">51K+</h2><p className="stat-label">views on TikTok</p></div>
                  </div>
                </div>
                <div className="food-campaign-video-area">
                  <div className="food-campaign-video-wrapper active" data-video="food">
                    <video autoPlay muted loop playsInline preload="none" className="js-lazy-video">
                      <source data-src="/assets/videos/food-video-loop.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
              <div className="food-campaign-right">
                <h3>High-Impact Campaign</h3>
                <h4>Concept</h4>
                <p>A value-driven restaurant video designed for international audiences, positioning a new restaurant location as an approachable, must-save destination through a first-person unlimited BBQ experience.</p>
                <h4>Why It Worked</h4>
                <ul>
                  <li>Clear value proposition: unlimited BBQ and wide meat selection</li>
                  <li>Authentic, first-person storytelling lowered friction</li>
                  <li>Tourist-friendly location increased relevance and saves</li>
                  <li>Strong food visuals captured attention quickly</li>
                </ul>
                <h4>Result</h4>
                <p>Delivered strong reach and engagement within the target audience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WH Campaign */}
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

        {/* On Camera */}
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

        {/* Conceptual */}
        <section className="conceptual-section" id="conceptual">
          <div className="conceptual-container">
            <div className="conceptual-left">
              <h2>Conceptual Campaign</h2>
              <h3>In Between</h3>
              <div className="conceptual-content">
                <h4>Insight</h4>
                <p>We spend more time in between than arriving.</p>
                <h4>Creative Idea</h4>
                <p>A minimalist fashion campaign focused on moments of pause, movement and presence — not defined by arrival, but by what happens in between.</p>
                <h4>Creative Rule</h4>
                <p>Each visual presents a look that feels intentionally unfinished — styled to suggest transition rather than completion.</p>
                <h4>Campaign System</h4>
                <ul>
                  <li>Unfinished styling (open coats, undone buttons, loose layers)</li>
                  <li>Cropped or incomplete framing (faces partially out of frame, bodies cut mid-movement)</li>
                </ul>
                <h4>Why this works as a campaign</h4>
                <ul>
                  <li>Focuses on an ongoing, universal state</li>
                  <li>Unfinished visuals allow identification without narrative direction</li>
                  <li>A simple visual rule creates recognition and consistency</li>
                </ul>
              </div>
            </div>
            <div className="conceptual-right">
              <div className="conceptual-main-image">
                <img src="/assets/images/conceptual-1.jpg" alt="Conceptual campaign" loading="lazy" />
              </div>
              <div className="conceptual-grid">
                {[2,3,4,5].map((n) => (
                  <div key={n} className="conceptual-grid-item">
                    <img src={`/assets/images/conceptual-${n}.jpg`} alt="Conceptual campaign" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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

      {/* Privacy Policy Modal */}
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

      {/* Lightbox */}
      <div className="case-lightbox" id="caseLightbox">
        <div className="case-lightbox-content">
          <button className="case-lightbox-close" id="lightboxClose">×</button>
          <div className="video-wrapper">
            <iframe
              className="case-lightbox-video"
              id="lightboxVideo"
              src=""
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  )
}
