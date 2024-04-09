import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState();
  console.log(listing)
  
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data);
          return;
        }
        setListing(data);
        
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchListing();
    },[]);
    
 
  return (
    <main>
      {listing && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[300px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}  
      <div className="bg-white shadow-md rounded-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{listing && listing.name}</h2>
      <p className="text-gray-600 mb-4">{listing && listing.description}</p>
      <div className="flex items-center mb-4">
        <span className="text-gray-800 font-bold mr-2">${listing && listing.regularPrice}</span>
        {listing && listing.discountedPrice && <span className="text-red-500 font-bold">${listing && listing.discountedPrice}</span>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Bedrooms</p>
          <p className="font-bold">{listing && listing.bedrooms}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bathrooms</p>
          <p className="font-bold">{listing && listing.bathrooms}</p>
        </div>
      </div>
    </div>    
    </main>
    
  );
}
