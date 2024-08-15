import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig"; // Adjust the import path as needed

function HeroSection() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch images from Firebase
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "bannerImages"));
        const imageUrls = querySnapshot.docs.map((doc) => doc.data().url);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (images.length > 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [images]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            className="w-full h-full object-cover flex-shrink-0"
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
