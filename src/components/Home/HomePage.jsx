import React from "react";
import HeroSection from "./HeroSection";

import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import Featuredproducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of the latest iPhone 14 with our most
      Pro camera ever."
        link="/product/663be9adba6ef53fccb76258"
        image={iphone}
      />
      <Featuredproducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="Experience the iPhone 14 with our most
      Pro camera ever."
        link="/product/663be9adba6ef53fccb76264"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
