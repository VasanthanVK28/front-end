import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaThLarge,
  FaList,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { FiShare2 } from "react-icons/fi";
import { TbShoppingBagHeart } from "react-icons/tb";
import { useTranslation } from "react-i18next";

import NavbarWithSidebar from "./NavbarWithSidebar";

// Pagination Component
const Pagination = ({ currentPage, lastPage, onPrev, onNext, onPageSelect,t }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", lastPage);
      } else if (currentPage > lastPage - 4) {
        pages.push(1, "...", lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", lastPage);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-indigo-600 hover:text-white border-gray-300"
        }`}
      >
        {t("prev")}

      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageSelect(page)}
            className={`px-3 py-1 rounded-md text-sm font-medium border transition-all duration-200 ${
              page === currentPage
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={onNext}
        disabled={currentPage === lastPage}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 ${
          currentPage === lastPage
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-indigo-600 hover:text-white border-gray-300"
        }`}
      >
        {t("next")}

      </button>
    </div>
  );
};

// Category Products Component
const CategoryProducts = () => {
  const { category } = useParams();
  const { t } = useTranslation();
  const itemsPerPage = 10;

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortOrder, setSortOrder] = useState("title-asc");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandPage, setBrandPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile

  // Fetch category products
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        if (selectedBrands.length === 0) {
          const res = await api.get(
            `/external/products/filter?category=${category}&page=${currentPage}`
          );
          const { data, brand_counts, current_page, per_page, total } = res.data;
          setProducts(data || []);
          setBrands(Object.entries(brand_counts || {}));
          setCurrentPage(current_page || 1);
          setLastPage(Math.ceil(total / per_page));
          setTotalProducts(total || 0);
        } else {
          let allData = [];
          let page = 1;
          let hasMore = true;

          while (hasMore) {
            const res = await api.get(
              `/external/products/filter?category=${category}&page=${page}`
            );
            const { data, brand_counts, total, per_page } = res.data;
            allData = [...allData, ...data];
            setBrands(Object.entries(brand_counts || {}));
            if (data.length < per_page) hasMore = false;
            page++;
          }
          setProducts(allData);
          setTotalProducts(allData.length);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [category, currentPage, selectedBrands]);

  // Brand filter
  const handleBrandChange = (brand) => {
    const b = brand.toLowerCase();
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };

  // Filter & sort products
  useEffect(() => {
    let filtered = [...products];
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.includes(p.brand?.trim().toLowerCase())
      );
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    if (sortOrder === "title-asc") filtered.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOrder === "title-desc") filtered.sort((a, b) => b.title.localeCompare(a.title));
    else if (sortOrder === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sortOrder === "price-desc") filtered.sort((a, b) => b.price - a.price);

    setFilteredProducts(filtered);
    setBrandPage(1);
  }, [selectedBrands, priceRange, sortOrder, products]);

  const paginatedBrandProducts =
    selectedBrands.length > 0
      ? filteredProducts.slice((brandPage - 1) * itemsPerPage, brandPage * itemsPerPage)
      : filteredProducts;

  // Pagination handlers
  const handlePrevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNextPage = () => currentPage < lastPage && setCurrentPage((p) => p + 1);

  // Add to Bag
  const addToBag = (product) => {
    const userId = localStorage.getItem("user_unique_id");
    if (!userId) {
      Swal.fire({
        icon: t("login_warning.icon"),
        title: t("login_warning.title"),
        text: t("login_warning.text"),
        confirmButtonColor: t("login_warning.confirmButtonColor"),
      });
      return;
    }
    const key = `mybag_${userId}`;
    let bag = JSON.parse(localStorage.getItem(key)) || [];
    if (bag.find((item) => item.asin === product.asin)) {
      Swal.fire({
        icon: t("already_in_bag.icon"),
        title: t("already_in_bag.title"),
        text: t("already_in_bag.text"),
        confirmButtonColor: t("already_in_bag.confirmButtonColor"),
      });
      return;
    }
    bag.push(product);
    localStorage.setItem(key, JSON.stringify(bag));
    Swal.fire({
      icon: t("added_to_bag.icon"),
      title: t("added_to_bag.title"),
      text: `${product.title.substring(0, 40)}...`,
      confirmButtonColor: t("added_to_bag.confirmButtonColor"),
      timer: t("added_to_bag.timer"),
      showConfirmButton: t("added_to_bag.showConfirmButton"),
    });
  };

  // Share Product
  const shareProduct = async (product) => {
    const shareData = {
      title: product.title,
      text: "Check out this product!",
      url: window.location.origin + "/product/" + product.asin,
    };
    if (navigator.share) await navigator.share(shareData);
    else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link Copied!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithSidebar />

      {/* MOBILE SIDEBAR TOGGLE */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <h2 className="font-bold text-lg">{t(category.toLowerCase())}</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-white p-5 border-r border-gray-200 shadow-md fixed top-0 bottom-0 left-0 z-40 w-64 overflow-y-auto transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{t("filter_by_brand")}</h3>
          <ul className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {brands.map(([brand, count]) => (
              <li key={brand} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={brand}
                    checked={selectedBrands.includes(brand.toLowerCase())}
                    onChange={() => handleBrandChange(brand.toLowerCase())}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={brand} className="text-gray-700 cursor-pointer hover:text-indigo-600 capitalize">
                    {t(brand)}
                  </label>
                </div>
                <span className="text-gray-500 text-xs">({count})</span>
              </li>
            ))}
          </ul>

          {/* Price Range */}
          <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                    {t("filter_by_price")}
                  </h3>

                  {/* Min & Max Values */}
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>₹{priceRange.min}</span>
                    <span>₹{priceRange.max}</span>
                  </div>

                  {/* Material UI Slider */}
                  <Slider
                    value={[priceRange.min, priceRange.max]}
                    onChange={(e, newValue) =>
                      setPriceRange({ min: newValue[0], max: newValue[1] })
                    }
                    min={0}
                    max={100000}
                    step={500}
                    valueLabelDisplay="auto"
                    sx={{
                      color: "#6366f1", // Tailwind indigo-500
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#fff",
                        border: "2px solid #6366f1",
                      },
                      "& .MuiSlider-valueLabel": {
                        background: "#6366f1",
                      },
                    }}
                  />
                </div>

        </aside>

        {/* Products Section */}
        <main class="flex-1 p-4 md:p-10">
          {/* Top Bar + Sort/View/Pagination */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-semibold">{filteredProducts.length}</span> of{" "}
                <span className="font-semibold">{totalProducts}</span> products
              </p>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  onChange={(e) => setSortOrder(e.target.value)}
                  value={sortOrder}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="title-asc">{t("name_asc")}</option>
                  <option value="title-desc">{t("name_desc")}</option>
                  <option value="price-asc">{t("price_asc")}</option>
                  <option value="price-desc">{t("price_desc")}</option>
                </select>
              </div>

              {/* View */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("grid")}
                  title="Grid View"
                  className={`p-2 rounded-md border text-sm transition-colors duration-200 ${
                    view === "grid"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <FaThLarge size={16} />
                </button>

                <button
                  onClick={() => setView("list")}
                  title="List View"
                  className={`p-2 rounded-md border text-sm transition-colors duration-200 ${
                    view === "list"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <FaList size={16} />
                </button>
              </div>
            </div>

            {/* Pagination */}
            {selectedBrands.length === 0 ? (
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
                onPageSelect={(page) => setCurrentPage(page)}
                t={t}
              />
            ) : (
              filteredProducts.length > itemsPerPage && (
                <Pagination
                  currentPage={brandPage}
                  lastPage={Math.ceil(filteredProducts.length / itemsPerPage)}
                  onPrev={() => setBrandPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setBrandPage((p) =>
                      Math.min(Math.ceil(filteredProducts.length / itemsPerPage), p + 1)
                    )
                  }
                  onPageSelect={(page) => setBrandPage(page)}
                  t={t}
                />
              )
            )}
          </div>

          {/* Products List */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
              <span className="mt-4 text-gray-500 text-lg font-medium">Loading products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No products found.</p>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {paginatedBrandProducts.map((p) => {
                const fullStars = Math.floor(p.rating);
                const hasHalfStar = p.rating % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                return (
                  <Link
                    to={`/product/${p.asin}`}
                    key={p.asin}
                    onClick={() => {
                      api.post("/analytics/track-click", {
                        product_id: p._id?.$oid || p.asin || p._id,
                        page_url: window.location.href,
                      }).catch((err) => console.error("Click error:", err));
                    }}
                    className={`block hover:shadow-lg transition-all duration-300 ${
                      view === "grid"
                        ? "bg-white rounded-xl shadow-sm p-4 border border-gray-200"
                        : "flex flex-col sm:flex-row bg-white rounded-xl shadow-sm p-4 border border-gray-200"
                    }`}
                  >
                    {/* Product Image */}
                    <div
                      className={
                        view === "grid"
                          ? "w-full flex justify-center mb-4"
                          : "sm:w-1/3 flex justify-center items-center"
                      }
                    >
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className={`object-contain rounded-md ${
                          view === "grid" ? "w-48 h-48" : "w-64 h-64"
                        }`}
                      />
                    </div>

                    {/* Product Info */}
                    <div
                      className={
                        view === "grid"
                          ? "flex flex-col items-center"
                          : "sm:w-2/3 mt-4 sm:mt-0 sm:pl-6 flex flex-col justify-between"
                      }
                    >
                      <h3
                        className={`font-semibold text-gray-800 hover:text-indigo-600 ${
                          view === "grid" ? "text-base" : "text-lg"
                        } line-clamp-2`}
                      >
                        {p.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {t(p.brand ? p.brand.toLowerCase() : "Unknown")}
                      </p>

                      <div
                        className={`flex items-center mt-2 ${
                          view === "grid" ? "justify-center" : ""
                        }`}
                      >
                        <div className="flex text-yellow-400 mr-2">
                          {[...Array(fullStars)].map((_, i) => (
                            <FaStar key={`f-${i}`} />
                          ))}
                          {hasHalfStar && <FaStarHalfAlt />}
                          {[...Array(emptyStars)].map((_, i) => (
                            <FaRegStar key={`e-${i}`} />
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm">
                          {p.rating.toFixed(1)} ({p.reviews})
                        </span>
                      </div>

                      {/* Price & Actions */}
                      <div
                        className={`relative mt-3 w-full ${
                          view === "grid"
                            ? "flex flex-col items-start min-h-[150px]"
                            : "flex flex-col sm:flex-row sm:items-center sm:justify-between min-h-[120px]"
                        }`}
                      >
                        <div className="flex flex-col items-start">
                          <p className="text-2xl font-semibold text-gray-900">₹{p.price}</p>
                          {p.discount && <p className="text-green-600 font-medium">{p.discount}% off</p>}

                          <div
                            className={`flex gap-3 mt-3 ${
                              view === "grid" ? "justify-start" : "justify-start sm:justify-start"
                            }`}
                          >
                            <a
                              href={p.product_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                              {t("buy_now")}
                            </a>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                addToBag(p);
                              }}
                              className="flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-400 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow"
                            >
                              <TbShoppingBagHeart className="text-xl" />
                              <span>{t("my_bag")}</span>
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            shareProduct(p);
                          }}
                          className="absolute bottom-2 right-2 p-3 rounded-full bg-gray-200 hover:bg-indigo-600 hover:text-white text-gray-700 shadow transition-all"
                        >
                          <FiShare2 className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination Bottom */}
          {selectedBrands.length === 0 ? (
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
              onPageSelect={(page) => setCurrentPage(page)}
              t={t}
            />
          ) : (
            filteredProducts.length > itemsPerPage && (
              <Pagination
                currentPage={brandPage}
                lastPage={Math.ceil(filteredProducts.length / itemsPerPage)}
                onPrev={() => setBrandPage((p) => Math.max(1, p - 1))}
                onNext={() =>
                  setBrandPage((p) =>
                    Math.min(Math.ceil(filteredProducts.length / itemsPerPage), p + 1)
                  )
                }
                onPageSelect={(page) => setBrandPage(page)}
                t={t}
              />
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryProducts;
