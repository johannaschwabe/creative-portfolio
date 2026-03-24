export default function BeyondSection() {
  return (
    <section id="beyond" className="beyond-section relative bg-light-bg py-24 z-[5]">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col gap-14">
        <div className="text-center">
          <h3 className="mb-2">Beyond Campaigns</h3>
          <p className="text-center font-medium leading-[1.6]">Testing formats and evolving the brand's visual language.</p>
        </div>

        {/* Scrolling video strip — left */}
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

        {/* BTS section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-center mb-0">On-Set Photographer Collaboration</h3>
          <div className="max-w-[600px] mx-auto mb-6 text-center">
            <h4 className="mb-3">My Responsibilities</h4>
            <ul className="list-disc list-inside leading-[1.8] text-left inline-block">
              <li className="mb-2">Content creation alongside the photographer during photoshoots</li>
              <li className="mb-2">Supporting on-set workflows and creative execution</li>
              <li className="mb-2">Producing behind-the-scenes photo and video content</li>
            </ul>
          </div>

          {/* Scrolling BTS strip — right */}
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
    </section>
  )
}
