import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FaTrash,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import NavbarWithSidebar from "./NavbarWithSidebar";

const MyBag = () => {
  const [bagItems, setBagItems] = useState([]);
const { t, i18n } = useTranslation();
  useEffect(() => {
    const userId = localStorage.getItem("user_unique_id");

    if (!userId) {
      Swal.fire({
        icon: t("not_logged_in.icon"),
        title: t("not_logged_in.title"),
        text: t("not_logged_in.text"),
        confirmButtonColor: t("not_logged_in.confirmButtonColor")
      });
      return;
    }

    const key = `mybag_${userId}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setBagItems(data);
  }, []);

  // ⭐ REMOVE ITEM
  const removeItem = (index) => {
    Swal.fire({
      title:  t("remove_item.title"),
      text:t("remove_item.text"),
      icon: t("remove_item.icon"),
      showCancelButton: true,
      confirmButtonColor: t("remove_item.confirmButtonColor"),
      cancelButtonColor:t("remove_item.cancelButtonColor"),
      confirmButtonText: t("remove_item.confirmButtonText"),
      cancelButtonText: t("cancel") ,
       confirmButtonText: t("ok")
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = localStorage.getItem("user_unique_id");
        const key = `mybag_${userId}`;

        const updated = [...bagItems];
        updated.splice(index, 1);

        setBagItems(updated);
        localStorage.setItem(key, JSON.stringify(updated));

        Swal.fire(t("remove_item_success.title"), t("remove_item_success.text"), t("remove_item_success.icon"));
      }
    });
  };

  // ⭐ CLEAR ALL
  const clearBag = () => {
    Swal.fire({
      title: t("clear_bag.title"),
      text:  t("clear_bag.text"),
      icon: t("clear_bag.icon"),
      showCancelButton: true,
      confirmButtonColor: t("clear_bag.confirmButtonColor"),
      cancelButtonColor:t("clear_bag.cancelButtonColor"),
      confirmButtonText: t("clear_bag.confirmButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = localStorage.getItem("user_unique_id");
        const key = `mybag_${userId}`;

        localStorage.removeItem(key);
        setBagItems([]);

         Swal.fire(t("clear_bag_success.title"), t("clear_bag_success.text"), t("clear_bag_success.icon"));
      }
    });
  };

  // ⭐ AMAZON STYLE RATING STARS
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    for (let i = 0; i < full; i++) stars.push(<FaStar className="text-yellow-500" />);
    if (half) stars.push(<FaStarHalfAlt className="text-yellow-500" />);
    while (stars.length < 5) stars.push(<FaRegStar className="text-yellow-500" />);

    return stars;
  };

  return (
    <>
      <NavbarWithSidebar />

      <div className="p-6 bg-gray-50 min-h-screen">
        
        {/* ⭐ EMPTY STATE UI */}
        {bagItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">

            {/* ⭐ Your Custom Image */}
            <img
              src="/images/Shopping bag-amico.png"
              alt="Shopping Bag"
              className="w-60 mb-6 drop-shadow-lg"
            />

            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Hey, it feels so light!
            </h2>

            <p className="text-gray-500 mb-6 text-lg">
              Your bag is waiting for something amazing!
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={clearBag}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition"
              >
                {t("clear_all_button")}
              </button>
            </div>

            {/* ⭐ PRODUCT LIST */}
            <div className="space-y-6">
              {bagItems.map((p, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col md:flex-row gap-6"
                >
                  {/* Image */}
                  <div className="w-full md:w-48 h-48 flex items-center justify-center bg-gray-100 rounded-xl p-2">
                    <img
                      src={
                        p.image_url ||
                        p.thumbnail_image ||
                        p.images?.[0] ||
                        p.image ||
                        "/placeholder.jpg"
                      }
                      alt={p.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {p.title}
                    </h2>

                    {p.rating && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex">{renderStars(p.rating)}</div>
                        <span className="text-gray-600 text-sm">{p.rating}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="mt-3">
                      <p className="text-2xl font-bold text-indigo-600">
                        ₹{p.price}
                      </p>
                      {p.original_price && (
                        <p className="text-sm text-gray-500">
                          MRP: <span className="line-through">₹{p.original_price}</span>
                        </p>
                      )}
                      {p.discount && (
                        <p className="text-sm text-green-600 font-medium">
                          {p.discount}% off
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-5">
                      <a href={p.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow flex items-center gap-2 transition"
                  >
                    <VisibilityIcon className="text-white" /> {/* Eye icon */}
                    
                  </a>


                      <button
                        onClick={() => removeItem(index)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow flex items-center gap-2 transition"
                      >
                        <FaTrash /> 
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
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

export default MyBag;
