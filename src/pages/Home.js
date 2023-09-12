import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Import Slider from react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/home.css';
import '../assets/styles/home.css';

import image1 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image2 from '../assets/images/product-images/1105-03000/1105-03000 main.jpg';
import image3 from '../assets/images/product-images/1301-04000/1301-04000 BLISTER TPD BLANCO C.20 PZS main.jpg';
import image4 from '../assets/images/product-images/2102-07240/2102-07240 JUEGO DE FIJACIÓN 7-10 main.jpg';
import image5 from '../assets/images/product-images/2105-04100/2105-04100 SUJETHOR TK 20-26 main.jpg';
import image6 from '../assets/images/product-images/3209-00300/3209-00300 main.jpg';
import image7 from '../assets/images/product-images/3701-01000/3701-01000 Kit de fijación panel yeso.jpg';
import image8 from '../assets/images/product-images/4700-06285/4700-06285 main.jpg';
import image9 from '../assets/images/product-images/5020-02001/5020-02001 ESQ. INT. 0812 CN 3 PZS main.jpg';
import image10 from '../assets/images/product-images/5301-01250/5301-01250 CANAL TMK 1735 BCO DE 2.50 MTS main.jpg';
import image11 from '../assets/images/product-images/9300-01252/9300-01252 FLEXIDUCTHO CAFE ROLLO 2.5 MTS main.jpg';
import image12 from '../assets/images/product-images/9480-02001/9480-02001 PZA. UNION MEDIA CAÑA BCO main.jpg';

export default function Home() {

  const productImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12
  ];

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
        <Slider
          infinite={true}
          slidesToShow={4}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2000}
          arrows={false}
        >
    {productImages.map((image, index) => (
      <div key={index} className="carousel-image-container">
        <img src={image} alt={`Product ${index}`} />
      </div>
    ))}
  </Slider>
</div>
    </div>
  );
}
