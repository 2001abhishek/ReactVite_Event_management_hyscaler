import React, { useState, useEffect } from "react";

function Herosection() {
  const images = [
    "https://img.freepik.com/free-psd/music-festival-horizontal-banner-template_23-2148947805.jpg?w=1380&t=st=1723654348~exp=1723654948~hmac=c86ee9760062c4012c024cd4d708bcacdc2192cc7ec7e5eddbc9220250b52692",
    "https://img.freepik.com/free-psd/workout-concept-banner-template-design_23-2148617048.jpg?t=st=1723654436~exp=1723658036~hmac=c312458da0bc6f15c9afd258293b01e685556a03b46137728e222d58f096235b&w=1380",
    "https://img.freepik.com/free-vector/social-media-post-template-racing-tournament_23-2150229918.jpg?t=st=1723654493~exp=1723658093~hmac=b3f2cc8f57605bfd7c31f433d86706357ec7e7994942eb4e7d6c52044b1372e1&w=1060",
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