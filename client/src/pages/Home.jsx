import React from "react";

import MainBanner from "../components/MainBanner";

import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";
import OurStory from "../components/OurStory";
import Reviews from "../components/Reviews";
import Categories from "../components/Categories";
import FloatingButtons from "../components/FloatingButtons";
import Feature from "../components/fetures";


function Home() {
  return (
    <>
      <div className="">
    
        <MainBanner />
        <Categories />
        <BestSeller />
        <OurStory />
        <Feature/>
        <Reviews />

        <FloatingButtons />
      </div>
    </>
  );
}
export default Home;