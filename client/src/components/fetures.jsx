import React from "react";
import { features } from "../assets/assets";

function Feature() {
  // Assign features to specific positions
  const leftTopFeature = features[0];     // Fastest Delivery
  const leftBottomFeature = features[1];  // Freshness Guaranteed
  const rightTopFeature = features[2];    // Affordable Prices
  const rightBottomFeature = features[3]; // Trusted by Thousands

  // Component to render each feature card
  const FeatureCard = ({ feature, bgColor }) => (
    <div className={`${bgColor} h-full w-full flex flex-col items-center justify-center p-4 text-center`}>
      {/* Icon */}
      <div className="text-3xl sm:text-5xl mb-2 sm:mb-4">
        <img src={feature.icon} alt={feature.title} className="w-10 h-10 sm:w-auto sm:h-auto" />
      </div>
      
      {/* Title */}
      <h3 className="text-base sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
        {feature.title}
      </h3>
      
      {/* Description */}
      <p className="text-xs sm:text-md text-gray-600 text-center px-2 sm:px-0">
        {feature.description}
      </p>
    </div>
  );

  return (
    <>
      {/* Mobile Layout (visible only on small screens) */}
      <div className="block md:hidden min-h-screen w-full px-4 py-6">
        {/* Mobile: Show image first */}
        <div className="w-full mb-8">
          <img
            src="./main1.png"
            alt="Fresh groceries"
            className="w-full h-auto max-h-[300px] object-contain"
          />
        </div>
        
        {/* Mobile: Show all 4 features in 2x2 grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48">
            <FeatureCard feature={leftTopFeature} bgColor="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl" />
          </div>
          <div className="h-48">
            <FeatureCard feature={rightTopFeature} bgColor="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl" />
          </div>
          <div className="h-48">
            <FeatureCard feature={leftBottomFeature} bgColor="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl" />
          </div>
          <div className="h-48">
            <FeatureCard feature={rightBottomFeature} bgColor="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Desktop Layout (visible only on large screens) - EXACTLY as you had */}
      <div className="hidden md:flex h-screen w-full overflow-hidden px-6 md:px-16 lg:px-20 xl:px-25">
        {/* LEFT SECTION - w-20 (20% width) */}
        <div className="w-[20%] h-full flex flex-col">
          {/* Top half - 50% height */}
          <div className="h-1/2">
            <FeatureCard feature={leftTopFeature} bgColor="" />
          </div>
          {/* Bottom half - 50% height */}
          <div className="h-1/2">
            <FeatureCard feature={leftBottomFeature} bgColor="" />
          </div>
        </div>

        {/* MIDDLE SECTION - w-60 (60% width) */}
        <div className="w-[60%] h-full flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <img
              src="./main1.png"
              alt="Fresh groceries"
              className="w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT SECTION - w-20 (20% width) */}
        <div className="w-[20%] h-full flex flex-col">
          {/* Top half - 50% height */}
          <div className="h-1/2">
            <FeatureCard feature={rightTopFeature} bgColor="" />
          </div>
          {/* Bottom half - 50% height */}
          <div className="h-1/2">
            <FeatureCard feature={rightBottomFeature} bgColor="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Feature;