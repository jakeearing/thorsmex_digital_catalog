import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/home.css';
import '../assets/styles/home.css';

import image1 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image2 from '../assets/images/product-images/1301-04000/1301-04000 BLISTER TPD BLANCO C.20 PZS main.jpg';
import image4 from '../assets/images/product-images/2102-07240/2102-07240 JUEGO DE FIJACIÓN 7-10 main.jpg';
import image5 from '../assets/images/product-images/2105-04100/2105-04100 SUJETHOR TK 20-26 main.jpg';
import image6 from '../assets/images/product-images/3209-00300/3209-00300 main.jpg';
import image8 from '../assets/images/product-images/5001-01250/5001-01250 Canal TMK 0812 Blanco 1.10 m.jpg';
import image9 from '../assets/images/product-images/5020-02001/5020-02001 ESQ. INT. 0812 CN 3 PZS main.jpg';
import image10 from '../assets/images/product-images/5301-01250/5301-01250 CANAL TMK 1735 BCO DE 2.50 MTS main.jpg';
import image11 from '../assets/images/product-images/9300-01252/9300-01252 FLEXIDUCTHO CAFE ROLLO 2.5 MTS main.jpg';
import image12 from '../assets/images/product-images/9480-02001/9480-02001 PZA. UNION MEDIA CAÑA BCO main.jpg';

export default function Home() {

  const productImages = [
    image1,
    image2,
    image4,
    image5,
    image6,
    image8,
    image9,
    image10,
    image11,
    image12
  ];

  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    // Define the number of slidesToShow based on screen width
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setSlidesToShow(2);
    } else if (screenWidth <= 1100) {
      setSlidesToShow(3);
    } else {
      // Default number of slides for larger screens
      setSlidesToShow(4);
    }

    // Handle window resize to update the number of slidesToShow
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth <= 768) {
        setSlidesToShow(2);
      } else if (newScreenWidth <= 1100) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    slidesToShow: slidesToShow,
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Get high-quality hardware at affordable prices</h2>
        <div className="home-buttons">
          <Link to="/products">
            <button className="home-button">Browse Catalog</button>
          </Link>
          <Link to="/contact-us">
            <button className="home-button">Contact Us</button>
          </Link>
        </div>
      </div>
      <div className="carousel">
      <Link to="/products">
        <Slider {...settings}>
          {productImages.map((image, index) => (
            <div key={index} className="carousel-image-container">
              <img src={image} alt={`Product ${index}`} />
            </div>
          ))}
        </Slider>
        </Link>
      </div>
    </div>
  );
}
