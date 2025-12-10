// src/components/ProductCount.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductCount() {
  const [totalCount, setTotalCount] = useState(0);
  const [productCounts, setProductCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products to aggregate counts
    axios
      .get("http://127.0.0.1:8000/api/scraped-products")
      .then((response) => {
        if (response.data.success) {
          const products = response.data.data;
          setTotalCount(products.length);

          // Aggregate by Product Title
          const counts = {};
          products.forEach((p) => {
            const key = p.title ? p.title.trim() : "Unknown Product";
            counts[key] = (counts[key] || 0) + 1;
          });
          setProductCounts(counts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-72 p-4 bg-white rounded-xl shadow-lg animate-pulse flex flex-col gap-4">
        <div className="h-10 w-1/2 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[400px]">
      {/* Header with Total */}
      <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shrink-0">
        <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80">
          Total Products
        </h3>
        <div className="flex items-end justify-between mt-1">
          <span className="text-3xl font-bold">{totalCount}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </div>

      {/* Product Breakdown */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Product Breakdown
        </h4>
        <div className="space-y-3">
          {Object.entries(productCounts).length === 0 ? (
            <p className="text-sm text-gray-500">No products found.</p>
          ) : (
            Object.entries(productCounts)
              .sort(([, a], [, b]) => b - a) // Sort by count descending
              .map(([title, count], idx) => (
                <div key={idx} className="flex justify-between items-center group">
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[80%]" title={title}>
                    {title}
                  </span>
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 rounded-full">
                    {count}
                  </span>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
