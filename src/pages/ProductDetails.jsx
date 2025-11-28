import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { TbShoppingBagHeart } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import NavbarWithSidebar from "./NavbarWithSidebar";
import StarIcon from "@mui/icons-material/Star";

const ProductDetail = () => {
  const { asin } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/external/products/${asin}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [asin]);

  if (loading)
    return (
      <div>
        <NavbarWithSidebar />
        <div className="flex flex-col justify-center items-center h-96 mt-20">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading product...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div>
        <NavbarWithSidebar />
        <p className="text-center mt-20 text-lg text-gray-600">Product not found</p>
      </div>
    );

  // ⭐ Rating display
  const fullStars = Math.floor(product.rating || 0);
  const hasHalfStar = (product.rating || 0) % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // ⭐ Add to My Bag
  const addToBag = (product) => {
    const userId = localStorage.getItem("user_unique_id");

    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You must log in to add items to your bag.",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    const key = `mybag_${userId}`;
    let bag = JSON.parse(localStorage.getItem(key)) || [];

    if (bag.find((item) => item.asin === product.asin)) {
      Swal.fire({
        icon: "info",
        title: "Already in My Bag",
        text: "This product is already added.",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    bag.push(product);
    localStorage.setItem(key, JSON.stringify(bag));

    Swal.fire({
      icon: "success",
      title: "Added to My Bag!",
      text: `${product.title.substring(0, 40)}...`,
      confirmButtonColor: "#10b981",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // ⭐ Share Product
  const shareProduct = async (product) => {
    const shareData = {
      title: product.title,
      text: "Check out this product!",
      url: window.location.origin + "/product/" + product.asin,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      Swal.fire({
        icon: "success",
        title: "Link Copied!",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      {/* 🧭 Navbar */}
      <NavbarWithSidebar />

      {/* 🏷 Product Details */}
      <div className="max-w-6xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT: Product Image */}
          <div className="md:w-1/2 flex flex-col items-center">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-96 h-96 object-contain mb-4 rounded-lg shadow-sm"
            />
          </div>

          {/* RIGHT: Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-semibold text-gray-800 leading-snug mb-2">
              {product.title}
            </h1>
            <p className="text-indigo-600 text-sm mb-2">
  {product.brand ? t(product.brand) : t("Unknown")}
</p>


            {/* Ratings */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(fullStars)].map((_, i) => (
                  <FaStar key={`full-${i}`} />
                ))}
                {hasHalfStar && <FaStarHalfAlt />}
                {[...Array(emptyStars)].map((_, i) => (
                  <FaRegStar key={`empty-${i}`} />
                ))}
              </div>
              <span className="inline-flex items-center text-sm">
  {/* Rating Badge */}
  <span className="inline-flex items-center bg-lime-300 text-cyan-800 font-semibold px-2 py-1 rounded-md">
    <span className="mr-1">{product.rating.toFixed(1)}</span>
    <StarIcon className="w-4 h-4" />
  </span>

  {/* Reviews Count */}
  <span className="ml-2 text-gray-600">
    ({product.reviews} Reviews)
  </span>
</span>


            </div>

            {/* Price */}
            <div className="my-4">
              {product.discount && (
                <p className="text-red-600 text-xl font-semibold mb-1">
                  -{product.discount}% <span className="text-gray-800">₹{product.price}</span>
                </p>
              )}
              <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
              {product.original_price && (
                <p className="text-sm text-gray-500 line-through">M.R.P: ₹{product.original_price}</p>
              )}
            </div>

            {/* Delivery */}
            <div className="text-sm text-gray-700 mb-5">
              <p>
                FREE delivery{" "}
                <span className="font-semibold text-gray-900">Tomorrow, 31 Oct</span>
              </p>
              <p>Or fastest delivery Today</p>
            </div>

            {/* Buy + My Bag + Share Buttons */}
            <div className="flex flex-wrap gap-4 mt-6 items-center">
              {/* Buy Now */}
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 
                           text-white px-6 py-2 rounded-full font-semibold shadow-md 
                           hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
               {t("buy_now")}
              </a>

              {/* My Bag */}
              <button
                onClick={() => addToBag(product)}
                className="flex items-center gap-2 px-6 py-2 rounded-full border border-indigo-400 
                           text-indigo-600 hover:bg-indigo-600 hover:text-white 
                           transition-all shadow"
              >
                <TbShoppingBagHeart className="text-xl" />
                <span>{t("my_bag")}</span>
              </button>

              {/* Share */}
              <button
                onClick={() => shareProduct(product)}
                className="p-3 rounded-full bg-gray-200 hover:bg-indigo-600 hover:text-white 
                           text-gray-700 shadow transition-all"
              >
                <FiShare2 className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🦶 Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 mt-20">
        {/* Gradient Top Border */}
        <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500"></div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
  <h3 className="text-lg font-semibold text-white mb-4">
  {t("contact_us")}
</h3>
  <p className="text-sm mb-1">{t("company_name")}</p>
  <p className="text-sm mb-1">{t("company_cin")}</p>
  <p className="text-sm mb-1">
    {t("company_address")}
  </p>
  <p className="text-sm mb-1">
    {t("company_email_label")}{" "} <a href="mailto:query@trendymart.com" className="text-yellow-400 hover:underline">query@trendymart.com</a>
  </p>
  
</div>


          <div>
          <h3 className="text-lg font-semibold text-white mb-4">
  {t("shop_non_stop")}
</h3>

          <p className="text-sm text-gray-400 mb-1">{t("trusted_by_indians")}</p>
          <p className="text-sm text-gray-400">{t("delivery_info")}</p>
        </div>


          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
  {t("customer_service")}
</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">{t("help_center")}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">{t("returns")}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">{t("shipping_info")}</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">{t("privacy_policy")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
  {t("follow_us")}
</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-sky-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-red-500 transition"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-700 py-4 text-center text-sm">
          <p>© {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">TrendyMart</span>. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default ProductDetail;
