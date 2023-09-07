import React, { useEffect, useState } from 'react';
import image1 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image2 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image3 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image4 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image5 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image6 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image7 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image8 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image9 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image10 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image11 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import image12 from '../assets/images/product-images/1101-01100/1101-01100 Thorquete tpo Bco main.jpg';
import '../assets/styles/home.css';

export default function Home() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const animationDuration = 50;
  const animationInterval = 1000 / 30;

  useEffect(() => {
    const frameCount = Math.ceil((animationDuration * 1000) / animationInterval);
    let frame = 0;

    const animate = () => {
      setCurrentProductIndex(frame % productImages.length);
      frame = (frame + 1) % frameCount;
    };

    const animationIntervalId = setInterval(animate, animationInterval);

    return () => clearInterval(animationIntervalId);
  }, [productImages]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Get high-quality parts at affordable prices</h2>
        <div className="home-buttons">
          <button className="home-button">Browse Catalog</button>
          <button className="home-button">Contact Us</button>
        </div>
      </div>
      <div className="conveyor-belt">
        <div className="scrolling-images">
          {productImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index}`}
              className={`product-image-scroll ${
                index === currentProductIndex ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
