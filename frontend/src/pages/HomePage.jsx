import React from "react";
import Layout from "../components/Layout/Layout";
import Banner from "../components/Home/Banner";
import PromoVideo from "../components/Home/Video";
import WorldWide from "../components/Home/WorldWide";
import Testimonials from "../components/Home/Testimonials";

function HomePage() {
  return (
    <Layout>
      <section className="w-full bg-gray-300">
        <div className="max-w-5xl xl:max-w-[85rem] mx-auto">
          <Banner />
          <PromoVideo />
          <WorldWide />
          <Testimonials />
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;
