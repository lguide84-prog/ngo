import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar

function MainBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array of banner images for desktop and mobile
  const slides = [
    {
      id: 1,
      desktop: "/ok1.jpg",
      mobile: "/ok1.jpg",
    },
    {
      id: 2,
      desktop: "/ok2.jpg",
      mobile: "/ok2.jpg",
    },
    {
      id: 3,
      desktop: "/ok3.jpg",
      mobile: "/ok3.jpg",
    },
    {
      id: 4,
      desktop: "/ok4.jpg",
      mobile: "/ok4.jpg",
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

 

  return (
    <div className="relative w-full h-screen">
      {/* Navbar inside banner - Absolutely positioned on top */}
      <Navbar />
      
      {/* Slider Container - Full height */}
      <div className="relative w-full h-full overflow-hidden">
        <div 
          className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative w-full h-full flex-shrink-0">
              {/* Desktop Image */}
              <img
                src={slide.desktop}
                alt={`Banner ${index + 1}`}
                className="w-full h-full hidden md:block object-cover object-center"
              />
              {/* Mobile Image */}
              <img
                src={slide.mobile}
                alt={`Banner ${index + 1}`}
                className="w-full h-full md:hidden object-cover object-center"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-6 md:px-16 lg:px-24 bg-black/40">
                <div className="text-center md:text-left mt-20 md:mt-30 ">
                  <h2 className="text-3xl md:text-5xl lg:text-5xl font-semibold park tracking-tight text-black mb-4 drop-shadow-lg">
                    Welcome To<span className="text-green-500"> Aayushmanbhava Store</span> 
                                      </h2>
                  <p className="text-base md:text-xl lg:text-3xl text-white mb-6 md:mb-8 drop-shadow-md">
                   Shop Online For Fresh Groceries
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <Link
                      to="/products"
                      className="flex items-center gap-2 px-8 lg:px-10 py-3 lg:py-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition transform hover:scale-105 text-base lg:text-lg font-semibold shadow-lg"
                    >
                      Shop Now
                      <img
                        src={assets.white_arrow_icon}
                        alt="arrow"
                        className="w-4 h-4"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainBanner;