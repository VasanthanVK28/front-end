import React, { useEffect, useState } from "react";
import { FaThLarge, FaList, FaTrash,FaShoppingBag } from "react-icons/fa";
import NavbarWithSidebar from "./NavbarWithSidebar";

const MyBag = () => {
  const [myBag, setMyBag] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    const saved = localStorage.getItem("myBag");
    setMyBag(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFromBag = (asin) => {
    const updated = myBag.filter((item) => item.asin !== asin);
    localStorage.setItem("myBag", JSON.stringify(updated));
    setMyBag(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithSidebar />
      <div className="max-w-6xl mx-auto p-6">
        {/* ---------- Header ---------- */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
  <FaShoppingBag className="text-indigo-600 text-2xl" />
  <div>
    <h2 className="text-2xl font-bold text-gray-800">MyBag</h2>
    <p className="text-gray-500 text-sm">
      {myBag.length} {myBag.length === 1 ? "item" : "items"} saved
    </p>
  </div>
</div>


          {/* ---------- View Mode Toggle ---------- */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border transition ${
                viewMode === "grid"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              title="Grid View"
            >
              <FaThLarge />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border transition ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              title="List View"
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* ---------- Content ---------- */}
        {myBag.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            No products in your bag yet.
          </p>
        ) : viewMode === "grid" ? (
          // ✅ GRID VIEW
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBag.map((p) => (
              <div
                key={p.asin}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
              >
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm mb-1">{p.brand}</p>
                <p className="text-lg font-bold text-gray-900">₹{p.price}</p>

                <div className="flex justify-between mt-5 items-center">
                  <a
                    href={p.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    Buy Now
                  </a>

                  <button
                    onClick={() => removeFromBag(p.asin)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <FaTrash size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // ✅ LIST VIEW
          <div className="space-y-4">
            {myBag.map((p) => (
              <div
                key={p.asin}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-lg transition"
              >
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-32 h-32 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm mb-1">{p.brand}</p>
                  <p className="text-lg font-bold text-gray-900">₹{p.price}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <a
                    href={p.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    Buy Now
                  </a>
                  <button
                    onClick={() => removeFromBag(p.asin)}
                    className="flex items-center justify-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <FaTrash size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBag;
