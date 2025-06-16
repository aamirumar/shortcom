// import React, { useState, useEffect } from 'react';
// import './HeroSlider.css';

// const images = [
//   '/Img/mutton-bonless.png',
//   '/Img/fish-bonless.png',
//   '/Img/prawns.png'
// ];

// const HeroSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Rotate every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="hero-slider">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`slide ${index === currentIndex ? 'active' : ''}`}
//           style={{ backgroundImage: `url(${image})` }}
//         ></div>
//       ))}
//     </div>
//   );
// };

// export default HeroSlider;

import React, { useState, useEffect } from 'react';
import './HeroSliderStyle.css';

const images = [
  '/Img/mutton-bonless.png',
  '/Img/fish-bonless.png',
  '/Img/prawns.png'
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBallClick = () => {
    window.location.href = '/products';
  };

  return (
    <div className="hero-slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}

      
      <div className="rolling-ball-container">
        <img
          src="/Img/fish.png"
          alt="Explore Products"
          className="rolling-ball"
          onClick={handleBallClick}
        />
      </div>
    </div>
  );
};

export default HeroSlider;
