import React from "react";
import { NavLink } from 'react-router-dom';
import Layout from "../components/Layout/Layout";

function AboutUs() {
  return (
    <Layout>
      <div className="banner-container">
        <div className="banner-image">
          <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" alt="banner-image"/>
        </div>
        <div className="banner-info">
          <div className="banner-text">
            <p className="banner-text-heading">About Us</p>
            <p>Welcome to Recipe Haven, your go-to destination for finding and sharing the simplest recipes online. We understand that finding the right recipe can often be a hassle, especially when most options cater to high-end meals. That is why we created Recipe Haven, a platform dedicated to bringing you straightforward, affordable, and delicious recipes that can be easily prepared in any kitchen</p>
          </div>

          <div className="banner-footer">
            <div className="footer-icons">
              <img src="https://img.freepik.com/premium-vector/black-eco-friendly-icon-with-v-shaped-leaves-5-white-background_95164-12265.jpg" />
              <p>Eco-Frinedly</p>
            </div>
            <div className="footer-icons">
              <img src="https://www.shutterstock.com/image-vector/spoon-fork-icon-symbol-vector-260nw-1673884297.jpg" />
              <p>Dietary Preferences</p>
            </div>
            <div className="footer-icons">
              <img src="https://www.shutterstock.com/image-vector/24-hours-7-days-week-260nw-1426474208.jpg" />
              <p>24/7 Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-info">
        <p className="about-info-conatainers">
        At Recipe Haven, we believe cooking should be enjoyable and accessible for everyone. Our mission is to simplify your culinary journey by providing recipes that are easy to follow and require ingredients commonly found in most households. Whether you're a beginner or an experienced cook, Recipe Haven has something for everyone.
        </p>
        <p className="about-info-conatainers">
        Our platform features a wide range of recipes, each detailing the ingredients, procedure, and the number of people served. We also empower our community to share their own recipes, creating a collaborative space where home cooks and food enthusiasts can inspire and learn from each other.
        </p>
        <p className="about-info-conatainers">
        In addition to discovering and sharing recipes, registered users can engage with the community by commenting on, bookmarking, and rating their favorite recipes. This interactive feature allows you to keep track of your go-to dishes and see what others are saying about the recipes you love.
        </p>
        <p className="about-info-conatainers">
        At Recipe Haven, we are more than just a recipe website – we are a community of food lovers dedicated to making cooking simple, enjoyable, and accessible for everyone. Join us today and start your culinary adventure with recipes that fit your lifestyle.
        </p>
      </div>

      <div className="join-banner">
        <div className="join-banner-content">
          <p className="join-banner-heading">Join Now</p>
          <p className="join-banner-info">Become a part of our vibrant community and start your culinary adventure today!</p>
          <NavLink to="/auth/login" className="join-banner-button">
            <button className="button-content">Join Now</button>
          </NavLink>
        </div>
      </div>

    </Layout>
  )
}

export default AboutUs;
