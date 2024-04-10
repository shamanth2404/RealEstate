import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/house-1836070_1280.jpg";

export default function Home() {
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
  useEffect(() => {
    fetchfeaturedListings();
  }, []);
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-96 md:h-screen flex items-center -z-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-50 -z-10"></div>
        <div className="container mx-auto px-6 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Your Real Estate Agency
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Find your dream home with us
          </p>
          <a
            href="#"
            className="bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:bg-gray-100"
          >
            View Listings
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-4">
        <h2 className="text-2xl font-bold mb-4">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {featuredListings.map((listing) => (
          
            <div
            className="max-w-sm rounded overflow-hidden shadow-lg"
            key={listing._id}
          >
            <img className="w-full" src={listing.imageUrls[0]} alt={"title"} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{listing.name}</div>
              <p className="text-gray-700 text-base">{listing.address}</p>
              <p className="text-gray-700 text-base">{listing.discountPrice}</p>
              
            </div>
          </div>
          
        ))}
      </div>
      </div>
    </div>
  );
}
