import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../assets/styles/hero-section.css";

export default function HeroSection({
  title,
  paragraphs,
  buttons,
  backgroundType,
  backgroundSrc,
  backgroundAlt,
  overlay = true,
}) {
  return (
    <section className="hero-section">
      {backgroundType === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-background"
        >
          <source src={backgroundSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={backgroundSrc}
          alt={backgroundAlt}
          className="hero-background"
        />
      )}

      {overlay && <div className="hero-overlay-filter" />}
      <div className="hero-overlay-content">
        {title && <h1>{title}</h1>}
        {paragraphs && paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}

        {/* Render multiple buttons if provided */}
        {Array.isArray(buttons) && buttons.length > 0 && (
          <div className="hero-buttons">
            {buttons.map((btn, i) =>
              btn.text && btn.link ? (
                <Link
                  key={i}
                  to={btn.link}
                  className="default-button hero-catalog-button"
                >
                  {btn.text}
                </Link>
              ) : null
            )}
          </div>
        )}
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  title: PropTypes.node,
  paragraphs: PropTypes.arrayOf(PropTypes.node),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  backgroundType: PropTypes.oneOf(["video", "image"]).isRequired,
  backgroundSrc: PropTypes.string.isRequired,
  backgroundAlt: PropTypes.string,
  overlay: PropTypes.bool,
};
