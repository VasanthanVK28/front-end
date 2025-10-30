import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Laptop = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const res = await api.get("/external/products/filter?category=laptop");
        setLaptops(res.data.products || []); // assuming your Laravel returns { products: [...] }
      } catch (error) {
        console.error("Error fetching laptops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading laptops...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        💻 Laptop Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {laptops.map((laptop, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition-all"
          >
            <img
              src={laptop.image}
              alt={laptop.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{laptop.name}</h3>
            <p className="text-gray-500">{laptop.brand}</p>
            <p className="font-bold text-indigo-600 mt-2">${laptop.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laptop;
