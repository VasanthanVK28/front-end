// src/pages/NotFound.jsx
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5", // ⭐ Light background color
        color: "#333", // Dark text for better contrast
      }}
    >
      {/* 404 Text Animation */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ rotate: [0, 10, -10, 10, 0], scale: 1.5 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ fontSize: "6rem", marginBottom: "20px", color: "#ff4c4c" }}
      >
        404
      </motion.h1>

      {/* Subtitle Animation */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ fontSize: "1.5rem" }}
      >
        Page not found!
      </motion.p>

      {/* Button Animation */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          background: "#ff4c4c",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
        }}
        onClick={() => (window.location.href = "/home")}
      >
        Go Back Home
      </motion.button>
    </div>
  );
}

export default NotFound;
