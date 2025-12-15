import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Slider from "@mui/material/Slider";
import {
  FaStar,
  FaFilter,
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaCheck,
  FaChevronDown,
  FaSortAmountDown
} from "react-icons/fa";
import { FiShare2, FiGrid, FiList } from "react-icons/fi";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import NavbarWithSidebar from "./NavbarWithSidebar";

// ✨ ANIMATION VARIANTS
const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const Pagination = ({ currentPage, lastPage, onPrev, onNext, onPageSelect, t }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, "...", lastPage);
      else if (currentPage > lastPage - 4) pages.push(1, "...", lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
      else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastPage);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12 py-4">
      <button onClick={onPrev} disabled={currentPage === 1} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium text-sm">
        {t("prev")}
      </button>
      <div className="flex gap-1">
        {getPageNumbers().map((page, idx) => (
          typeof page === 'number' ? (
            <button
              key={idx}
              onClick={() => onPageSelect(page)}
              className={`w-9 h-9 rounded-lg font-medium text-sm transition-all ${page === currentPage ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ) : <span key={idx} className="w-9 h-9 flex items-center justify-center text-gray-400">...</span>
        ))}
      </div>
      <button onClick={onNext} disabled={currentPage === lastPage} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium text-sm">
        {t("next")}
      </button>
    </div>
  )
}

const CategoryProducts = () => {
  const { category } = useParams();
  const { t } = useTranslation();
  const itemsPerPage = 12;

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Price Range: Actual filter applied to API
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  // Slider Value: Visual state for the slider UI (prevents API spam)
  const [sliderValue, setSliderValue] = useState([0, 100000]);

  const [sortOrder, setSortOrder] = useState(""); // Default empty or set a specific default like 'title-asc'
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync sliderValue with priceRange when priceRange changes externally (optional, but good practice)
  useEffect(() => {
    setSliderValue([priceRange.min, priceRange.max]);
  }, [priceRange]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        // Build Query Parameters
        const params = new URLSearchParams();
        params.append("category", category);
        params.append("page", currentPage);
        // Assuming API supports comma-separated brands
        if (selectedBrands.length > 0) {
          params.append("brand", selectedBrands.join(","));
        }
        params.append("min_price", priceRange.min);
        params.append("max_price", priceRange.max);
        if (sortOrder) {
          const [field, direction] = sortOrder.split("-");
          params.append("sort_by", field);
          params.append("order", direction);
        }

        const res = await api.get(`/external/products/filter?${params.toString()}`);

        const data = res.data?.data || [];
        const brand_counts = res.data?.brand_counts || {};
        const total = res.data?.total || 0;
        const per_page = res.data?.per_page || itemsPerPage;

        setProducts(data);
        // Only update brands list if we want to show all available brands for the category 
        // regardless of current filters, OR if the API returns refined facets.
        // We'll trust the API returns relevant brand counts.
        setBrands(Object.entries(brand_counts));

        setCurrentPage(res.data?.current_page || 1);
        setLastPage(Math.ceil(total / per_page));
        setTotalProducts(total);
      } catch (err) {
        console.error("Error fetching", err);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce or just rely on dependencies. 
    // Since we separated sliderValue and priceRange, this is safe.
    fetchCategoryProducts();
  }, [category, currentPage, selectedBrands, priceRange, sortOrder]);

  const handleBrandChange = (brand) => {
    // Toggle brand selection
    setSelectedBrands(prev => {
      const isSelected = prev.includes(brand);
      if (isSelected) return prev.filter(b => b !== brand);
      return [...prev, brand];
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePriceChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handlePriceCommit = (event, newValue) => {
    setPriceRange({ min: newValue[0], max: newValue[1] });
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  }

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNextPage = () => currentPage < lastPage && setCurrentPage(p => p + 1);

  const addToBag = (product) => {
    const userId = localStorage.getItem("user_unique_id");
    if (!userId) {
      return Swal.fire({
        title: 'Please Login',
        text: 'You need to login to add items to your bag.',
        icon: 'info',
        confirmButtonColor: '#000',
        confirmButtonText: 'Okay'
      });
    }

    const key = `mybag_${userId}`;
    let bag = JSON.parse(localStorage.getItem(key)) || [];
    if (bag.find(i => i.asin === product.asin)) {
      return Swal.fire({
        title: 'Already in Bag',
        text: 'This item is already available in your cart.',
        icon: 'warning',
        confirmButtonColor: '#000',
        toast: true,
        position: 'bottom-end',
        timer: 3000,
        showConfirmButton: false
      });
    }

    bag.push(product);
    localStorage.setItem(key, JSON.stringify(bag));

    // Modern Toast
    Swal.fire({
      icon: 'success',
      title: 'Added to Bag',
      text: product.title,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      background: '#fff',
      color: '#000',
      iconColor: '#10b981'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <NavbarWithSidebar />

      {/* 🏛️ MODERN HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-3 block"
          >
            Collection 2025
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 capitalize tracking-tight mb-4"
          >
            {t(category) || category}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-lg mx-auto text-lg font-light leading-relaxed"
          >
            Explore our premium range of {category}, curated for quality and style.
          </motion.p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-12 relative">

        {/* 🎚️ SIDEBAR */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`md:w-64 flex-shrink-0 ${sidebarOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block sticky top-24 self-start'}`}
        >
          <div className="flex md:hidden justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Filters</h3>
            <button onClick={() => setSidebarOpen(false)}><FaTimes size={24} /></button>
          </div>

          {/* Price */}
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">Price</h3>
            <Slider
              value={sliderValue}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceCommit}
              min={0} max={100000} step={1000}
              sx={{
                color: '#000',
                '& .MuiSlider-thumb': {
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  border: '2px solid black'
                },
              }}
            />
            <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
              <span>₹{sliderValue[0]}</span>
              <span>₹{sliderValue[1]}+</span>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">Brands</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {brands.map(([brand, count]) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group select-none">
                  <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-black border-black text-white' : 'border-gray-300 bg-white group-hover:border-gray-500'}`}>
                    {selectedBrands.includes(brand) && <FaCheck size={10} />}
                  </div>
                  <input type="checkbox" className="hidden" onChange={() => handleBrandChange(brand)} checked={selectedBrands.includes(brand)} />
                  <span className={`text-sm capitalize ${selectedBrands.includes(brand) ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{brand}</span>
                  <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* 🛍️ MAIN GRID */}
        <main className="flex-1">

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-6 border-b border-gray-200">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-bold text-sm"><FaFilter /> FILTER</button>

            <p className="hidden md:block text-sm text-gray-500">Showing <span className="font-bold text-gray-900">{totalProducts}</span> results</p>

            <div className="flex items-center gap-4 ml-auto">
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="appearance-none bg-transparent pl-2 pr-8 py-1 text-sm font-semibold cursor-pointer focus:outline-none hover:text-gray-600 transition-colors"
                >
                  <option value="">Sort By</option>
                  <option value="title-asc">Alphabetical A-Z</option>
                  <option value="title-desc">Alphabetical Z-A</option>
                  <option value="price-asc">Price Low-High</option>
                  <option value="price-desc">Price High-Low</option>
                </select>
                <FaSortAmountDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              </div>

              <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setView('grid')} className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}><FiGrid /></button>
                <button onClick={() => setView('list')} className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}><FiList /></button>
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={n} className="aspect-[4/5] bg-gray-200 rounded-xl animate-pulse"></div>)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4 opacity-30">🔍</div>
              <h3 className="text-lg font-bold text-gray-900">No products match your criteria.</h3>
              <button onClick={() => { setSelectedBrands([]); setPriceRange({ min: 0, max: 100000 }); setSliderValue([0, 100000]); }} className="mt-4 text-sm font-bold text-indigo-600 hover:underline">Clear all filters</button>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={view === 'grid' ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10" : "space-y-6"}
            >
              <AnimatePresence>
                {products.map((p) => (
                  <motion.div
                    layout
                    variants={fadeInUp}
                    key={p.asin || p.id}
                    className={`group relative ${view === 'list' ? 'flex bg-white p-4 rounded-xl border border-gray-100 gap-6' : ''}`}
                  >
                    {/* Image Wrapper */}
                    <div className={`relative overflow-hidden bg-white rounded-xl mb-3 ${view === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-[4/5] p-6'}`}>
                      <Link to={`/product/${p.asin}`} className="block w-full h-full">
                        <img
                          src={p.image_url || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                          alt={p.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"; }}
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {p.discount && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">-{p.discount}%</span>}
                        {/* {p.rating >= 4.5 && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200">Top Rated</span>} */}
                      </div>

                      {/* Hover Actions (Desktop) */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={() => addToBag(p)}
                          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                          title="Add to Bag"
                        >
                          <FaShoppingCart size={14} />
                        </button>
                        <button
                          className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform hover:text-red-500"
                          title="Wishlist"
                        >
                          <FaHeart size={14} />
                        </button>
                        <button
                          onClick={() => navigator.share({ title: p.title, url: window.location.href })}
                          className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform hover:text-blue-500"
                          title="Share"
                        >
                          <FiShare2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className={view === 'list' ? 'flex-1 py-2' : ''}>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{p.brand || "Brand"}</p>
                      <Link to={`/product/${p.asin}`}>
                        <h3 className="text-sm font-medium text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {p.title}
                        </h3>
                      </Link>

                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-base font-bold text-gray-900">₹{p.price}</span>
                        {p.original_price && <span className="text-xs text-gray-400 line-through">₹{p.original_price}</span>}
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400 text-[10px]">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(p.rating || 4) ? "text-yellow-400" : "text-gray-200"} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">({p.reviews || 0})</span>
                      </div>

                      {view === 'list' && (
                        <div className="mt-4">
                          <button onClick={() => addToBag(p)} className="px-6 py-2 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-colors">Add to Bag</button>
                        </div>
                      )}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination */}
          {products.length > 0 && lastPage > 1 && (
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
              onPageSelect={setCurrentPage}
              t={t}
            />
          )}

        </main>
      </div>

    </div>
  );
};

export default CategoryProducts;
