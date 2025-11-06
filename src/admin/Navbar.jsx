import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [time, setTime] = useState("");

  // 🕒 Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock(); // initial call
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <nav className="w-full bg-white/60 backdrop-blur-md shadow-md py-4 px-6 flex items-center justify-between border-b border-purple-200">
      {/* 🌈 Trendy Mart Logo Text */}
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 tracking-wide drop-shadow-md">
        Trendy Mart
      </h1>

      {/* ⏰ Trendy Digital Clock */}
      <div className="text-2xl font-mono font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-orange-400 text-transparent bg-clip-text animate-pulse tracking-widest">
        {time}
      </div>
    </nav>
  );
};

export default Navbar;
