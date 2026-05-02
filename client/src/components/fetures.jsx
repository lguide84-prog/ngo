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
      <div className="text-5xl mb-4">
      <img src={feature.icon} alt={feature.title} />
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {feature.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 text-md text-center">
        {feature.description}
      </p>
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden px-6 md:px-16 lg:px-20 xl:px-25">
      {/* LEFT SECTION - w-20 (20% width) */}
      <div className="w-[20%] h-full flex flex-col">
        {/* Top half - 50% height */}
        <div className="h-1/2 ">
          <FeatureCard feature={leftTopFeature}  />
        </div>
        {/* Bottom half - 50% height */}
        <div className="h-1/2 ">
          <FeatureCard feature={leftBottomFeature} />
        </div>
      </div>

      {/* MIDDLE SECTION - w-60 (60% width) */}
      <div className="w-[60%] h-full flex items-center justify-center ">
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <img
            src="./main1.png"
            alt="Fresh groceries"
            className="w-full max-h-full object-contain "
          />
        
        </div>
      </div>

      {/* RIGHT SECTION - w-20 (20% width) */}
      <div className="w-[20%] h-full flex flex-col">
        {/* Top half - 50% height */}
        <div className="h-1/2 ">
          <FeatureCard feature={rightTopFeature}  />
        </div>
        {/* Bottom half - 50% height */}
        <div className="h-1/2 ">
          <FeatureCard feature={rightBottomFeature}  />
        </div>
      </div>
    </div>
  );
}

export default Feature;