import React from "react";
import 'slick-carousel/slick/slick.css';
import Slider from "react-slick";
import HeroSection from "../components/HeroSection";
import ProductOverview from "../components/ProductOverview";
import "../assets/styles/about.css";

const facilityImages = [
  {
    src: "/content-images/about-us/slider/facility1.jpg",
    alt: "Facility 1"
  },
  {
    src: "/content-images/about-us/slider/facility2.jpg",
    alt: "Facility 2"
  },
  {
    src: "/content-images/about-us/slider/facility3.jpg",
    alt: "Facility 3"
  },
  {
    src: "/content-images/about-us/slider/facility4.jpg",
    alt: "Facility 4"
  },
  {
    src: "/content-images/about-us/slider/facility5.jpg",
    alt: "Facility 5"
  },
  {
    src: "/content-images/about-us/slider/facility6.jpg",
    alt: "Facility 6"
  }
];

export default function About() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true
  };
  return (
    <div className="about-page-container">

      <HeroSection
        title={
          <span>
            ABOUT US
          </span>
        }
        paragraphs={[
          <>Leveraging our expertise in precision and innovation, we specialize in providing distinguished private label services, that encompass a range of exceptional manufacturing processes. With expertise in extrusion, injection molding, blow molding, and meticulous packaging methods.</>,
          <>Endorsed by national and international certifying bodies, we guarantee excellence by subjecting each product to rigorous testing. Our commitment to meeting high-performance standards ensures the delivery of top-notch solutions in the market.</>
        ]}
        buttonText="CATALOG"
        buttonLink="/catalog"
        backgroundType="image"
        backgroundSrc="/content-images/about-us/about-us-hero-background.jpg"
        backgroundAlt="Thorsmex Factory"
        overlay={true}
      />

      <ProductOverview />

      <section className="about-certifications-section">
        <div className="certifications-overlay">
          <h2 className="about-section-header yellow">CERTIFICATIONS</h2>
          <ul>
            <li>
              <span className="yellow">THORSMAN, Sweden ISO 9001:2015 No. IQS/1311/2013</span>, accrediting all product design
            </li>
            <li>
              <span className="yellow">THORSMEX, S.A. DE C.V. ISO 9001:2015</span>
            </li>
            <li>
              <span className="yellow">SEMKO & NEMKO</span>, Norway and Sweden, for all conduit accessories
            </li>
            <li>
              <span className="yellow">Product certification by the Canadian Standards Association.</span> No 1162395, year 2009
            </li>
            <li>
              The conduit systems have surpassed accredited tests with CSA international certification ensuring compliance with regulation for the Electrical Sector and Construction Industry
            </li>
          </ul>
        </div>
      </section>

      <section className="about-logo-section">
        <img src="/content-images/logos/thorsman-logo.png" alt="ThorsmexUSA Logo" className="about-logo-img" />
      </section>

      <section className="about-facilities-section">
        <div className="about-facilities-carousel">
          <Slider {...sliderSettings}>
            {facilityImages.map((img, idx) => (
              <div key={idx} className="facility-slide">
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="facilities-content">
          <h3 className="facilities-title">Our Facilities</h3>
          <div className="facilities-desc">
            Take a look at our modern offices, fully equipped production plant, and state-of-the-art installations — designed to ensure quality, efficiency, and innovation in every process.
          </div>
        </div>
      </section>
    </div>
  );
}
