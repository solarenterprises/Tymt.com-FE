import React from "react";
import HomeSection from "./Home";
import FeaturedSection from "./Featured";
import InstallSection from "./Install";
import Coming from "./Coming";

const HomePage = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <HomeSection />
      <FeaturedSection />
      <Coming />
      <InstallSection />
    </div>
  );
};

export default HomePage;
