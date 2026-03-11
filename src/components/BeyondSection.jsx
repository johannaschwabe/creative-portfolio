export default function BeyondSection() {
  return (
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
              <h3 className="beyond-band-heading">On-Set Photographer Collaboration</h3>
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
  )
}
