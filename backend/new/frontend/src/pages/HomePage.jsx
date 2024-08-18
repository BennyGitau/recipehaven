import React from "react";
import Layout from "../components/Layout/Layout";
import Banner from "../components/Home/Banner";
import PromoVideo from "../components/Home/Video";
import WorldWide from "../components/Home/WorldWide";
import Testimonials from "../components/Home/Testimonials";

function HomePage() {
  return (
    <Layout>
      <Banner />
      <PromoVideo />
      <WorldWide />
      <Testimonials />
    </Layout>
  );
}

export default HomePage;
