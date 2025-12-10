import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaArrowRight, FaShoppingBag, FaGift } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import NavbarWithSidebar from "./NavbarWithSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const MyBag = () => {
  const [bagItems, setBagItems] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const userId = localStorage.getItem("user_unique_id");

    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Please Log In",
        text: "You need to be logged in to view your bag.",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    const key = `mybag_${userId}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setBagItems(data);
  }, []);

  const removeItem = (index) => {
    Swal.fire({
      title: t("remove_item.title") || "Remove Item?",
      text: t("remove_item.text") || "Are you sure you want to remove this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = localStorage.getItem("user_unique_id");
        const key = `mybag_${userId}`;
        const updated = [...bagItems];
        updated.splice(index, 1);
        setBagItems(updated);
        localStorage.setItem(key, JSON.stringify(updated));

        // Small toast notification instead of full modal for smoother UX
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: 'success',
          title: 'Item removed'
        });
      }
    });
  };

  const calculateTotal = () => {
    return bagItems.reduce((total, item) => {
      // Handle prices that might be strings like "1,299.00"
      const price = parseFloat(String(item.price).replace(/,/g, '')) || 0;
      return total + price;
    }, 0);
  };

  const totalAmount = calculateTotal();
  // Mock shipping logic
  const shippingCharge = totalAmount > 499 ? 0 : 40;
  const grandTotal = totalAmount + shippingCharge;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavbarWithSidebar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <FaShoppingBag className="text-purple-600" /> My Shopping Bag
          <span className="text-lg font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{bagItems.length} items</span>
        </h1>

        {bagItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png"
              alt="Empty Bag"
              className="w-64 mb-6 opacity-80"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your bags are feeling light!</h2>
            <p className="text-gray-500 mb-8">There is nothing in your bag. Let's add some items.</p>
            <Link
              to="/home"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* 🛒 LEFT: Cart Items List */}
            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {bagItems.map((item, index) => (
                  <motion.div
                    key={`${item.id || index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                      <img
                        src={item.image_url || item.image || "https://via.placeholder.com/150"}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 w-full text-center sm:text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">{item.brand}</p>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 hover:text-purple-600 transition-colors cursor-pointer line-clamp-2">{item.title}</h3>
                          {/* Ratings/Tags mock */}
                          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 mb-3">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">In Stock</span>
                            {item.rating && <span>★ {item.rating}</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="hidden sm:flex p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          title="Remove Item"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-left">
                          <p className="text-2xl font-bold text-gray-900">₹{item.price}</p>
                          {item.original_price && <p className="text-sm text-gray-400 line-through">₹{item.original_price}</p>}
                        </div>

                        {/* Mobile Remove Button */}
                        <button
                          onClick={() => removeItem(index)}
                          className="sm:hidden px-4 py-2 text-red-500 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* 🧾 RIGHT: Order Summary (Sticky) */}
            <div className="lg:w-[380px] h-fit sticky top-24">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-purple-50 relative overflow-hidden">
                {/* Decor Blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">Order Summary</h3>

                <div className="space-y-4 text-gray-600 relative z-10">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping estimate</span>
                    <span className="font-medium text-gray-900">{shippingCharge === 0 ? <span className="text-green-600">Free</span> : `₹${shippingCharge}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax estimate</span>
                    <span className="font-medium text-gray-900">₹0</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 my-6"></div>

                <div className="flex justify-between items-center mb-8 relative z-10">
                  <span className="text-lg font-bold text-gray-900">Order Total</span>
                  <span className="text-2xl font-black text-purple-600">₹{grandTotal.toLocaleString()}</span>
                </div>

                <button className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2 group">
                  Checkout Securely <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <FaGift className="text-purple-500" /> Have a promo code?
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simple Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} TrendyMart. Secure checkout powered by Stripe.</p>
      </footer>
    </div>
  );
};

export default MyBag;
