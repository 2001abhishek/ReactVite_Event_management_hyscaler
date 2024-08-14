import React, { useState, useEffect } from "react";

function Herosection() {
  const images = [
    "https://raw.githubusercontent.com/2001abhishek/private_repo/main/Hero_page.JPG",
    "https://images.nvidia.com/aem-dam/Solutions/geforce/news/geforce-rtx-3060/nvidia-geforce-rtx-game-on-jan-2021-titles-key-visual-with-text.jpg",
    "https://www.nvidia.com/content/dam/en-zz/Solutions/drivers/home/promo-banners/us/geforce-ada-40-series-web-nv-sfg-2560x1440.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [currentImageIndex, images.length]);

  return (
    <div>
      <img className="w-[500px] h-[150px] md:w-[1920px] md:h-[400px] object-cover" src={images[currentImageIndex]} alt="" />
    </div>
  );
}

export default Herosection;