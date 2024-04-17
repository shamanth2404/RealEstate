import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Search() {
    const params = useParams();
    const [searchResults,setSearchResults] = useState([]);   

    const fetchSearchResults = async () => {
      try {
        const res = await fetch('/api/listing/search',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({searchTerm: params.searchTerm})
        });
        const data = await res.json();
        if(data.success === false){
          console.log(data.success);
          return;
        }
        setSearchResults(data);
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      console.log(searchResults)
      fetchSearchResults();
    },[params.searchTerm]);
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="max-w-4xl mx-auto ">          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <img
                  src={result.imageUrls[0]}
                  alt={result.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg font-semibold">{result.name}</h3>
                <p className="text-gray-500">{result.location}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-700">${result.price}</span>
                  <Link to={`/listing/${result._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
