import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../assets/styles/hero-section.css";

export default function HeroSection({
  title,
  paragraphs,
  buttonText,
  buttonLink,
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
        {paragraphs &&
          paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
        }
        {buttonText && buttonLink && (
          <Link to={buttonLink} className="hero-catalog-button">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  title: PropTypes.node,
  paragraphs: PropTypes.arrayOf(PropTypes.node),
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  backgroundType: PropTypes.oneOf(["video", "image"]).isRequired,
  backgroundSrc: PropTypes.string.isRequired,
  backgroundAlt: PropTypes.string,
  overlay: PropTypes.bool,
};
