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

  const fetchListing = async () => {
    try {
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        return;
      }
      console.log(data);
      setListing(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    window.open(`mailto:${listing.userRef}`, '_blank')
  }

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <main>
      {listing && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[300px] w-[900px] mx-auto"
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
      {listing && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-3 items-center mb-4">
            <h1 className="text-3xl font-bold">{listing.name}</h1>
            {listing.offer ? (
              <>
                <p className="text-xl">${listing.discountPrice}</p>
                <p className="text-sm text-gray-500 line-through">
                  {" "}
                  ${listing.regularPrice}
                </p>
              </>
            ) : (
              <p className="text-xl">${listing.regularPrice}</p>
            )}
          </div>

          <p className="text-gray-700 mb-4">{listing.address}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-300 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p>{listing.description}</p>
            </div>
            <div className="border border-gray-300 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Details</h2>
              <p>Type: {listing.type}</p>
              <p>Bedrooms: {listing.bedrooms}</p>
              <p>Bathrooms: {listing.bathrooms}</p>
              <p>Parking: {listing.parking ? "Yes" : "No"}</p>
              <p>Furnished: {listing.furnished ? "Yes" : "No"}</p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Contact Us
          </button>
        </div>
      )}
    </main>
  );
}
