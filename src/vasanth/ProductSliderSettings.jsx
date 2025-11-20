import React from "react";
import { useSliderSettings } from "../context/SliderSettingsContext";

const ProductSliderSettings = () => {
  const { settings, setSettings } = useSliderSettings();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Product Slider Settings</h2>
      
      <div className="mb-3">
        <label className="block">Show Price:</label>
        <input type="checkbox" name="showPrice" checked={settings.showPrice} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="block">Show Rating:</label>
        <input type="checkbox" name="showRating" checked={settings.showRating} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="block">Show Labels:</label>
        <input type="checkbox" name="showLabels" checked={settings.showLabels} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="block">Card Color:</label>
        <input type="color" name="cardColor" value={settings.cardColor} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="block">Text Color:</label>
        <input type="color" name="textColor" value={settings.textColor} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="block">Star Color:</label>
        <input type="color" name="starColor" value={settings.starColor} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="block">Visible Count:</label>
        <input
          type="number"
          name="visibleCount"
          value={settings.visibleCount}
          onChange={handleChange}
          min={1}
          max={50}
          className="border p-1 rounded"
        />
      </div>
    </div>
  );
};

export default ProductSliderSettings;
