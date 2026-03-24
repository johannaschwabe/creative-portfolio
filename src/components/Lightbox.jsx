export default function Lightbox() {
  return (
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
  )
}
