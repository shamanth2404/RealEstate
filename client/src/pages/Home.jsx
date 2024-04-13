import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/house-1836070_1280.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { Link } from "react-router-dom";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [featuredListings, setFeaturedListings] = useState([]);
  const fetchfeaturedListings = async () => {
    try {
      const res = await fetch(`/api/listing/get`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        return;
      }
      setFeaturedListings(data);
    } catch (error) {
      console.log(error);
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetchfeaturedListings();
  }, []);
  return (
    <div className="bg-slate-100">
      <div
        className="relative bg-cover bg-center h-96 md:h-screen flex items-center "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-slate-900 opacity-50"></div>
        <div className="container mx-auto px-6 text-white text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Your Real Estate Agency
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Find your dream home with us
          </p>
          <button
            onClick={() => {
              // Handle button click logic here, such as scrolling to a specific section
              window.location.href = "#featuredListings";
            }}
            className="bg-white text-slate-800 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:bg-slate-100 cursor-pointer"
          >
            View Listings
          </button>
        </div>
      </div>
      <div id="featuredListings" className="container mx-auto px-9 mt-4">
        <h2 className="text-slate-800 text-2xl font-bold mb-4">Featured Listings</h2>
        <Swiper navigation slidesPerView={3}>
          {featuredListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <Link to={`listing/${listing._id}`}>
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200"                
              >
                <img
                  className="w-full"
                  src={listing.imageUrls[0]}
                  alt={"title"}
                />
                <div className="px-6 py-4">
                  <div className="text-slate-900 font-bold text-xl mb-2">{listing.name}</div>
                  <p className="text-slate-800 text-base">{listing.address}</p>
                  <p className="text-slate-700 text-base">
                    {listing.discountPrice}
                  </p>
                </div>
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-8 flex flex-col items-center mb-4">
        <p className="text-lg text-slate-800 mb-2">Looking to sell your property?</p>
        <Link to="/create-listing" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg">
          Add Your Property for Sale
        </Link>
      </div>
      <footer className="bg-slate-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 Your Real Estate Agency. All rights reserved.</p>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-slate-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
