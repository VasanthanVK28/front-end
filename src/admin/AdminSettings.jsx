import React from 'react';
import { useSettings } from '../state/SettingsContext';

const AdminSettings = () => {
  const settings = useSettings();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        ⚙️ Customize Product Display
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Toggle Visibility */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-700">Show / Hide</h3>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={settings.showPrice.get()}
                onChange={() => settings.showPrice.set(!settings.showPrice.get())}
                className="mr-2"
              />
              Show Price
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.showRating.get()}
                onChange={() => settings.showRating.set(!settings.showRating.get())}
                className="mr-2"
              />
              Show Ratings
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.showLabels.get()}
                onChange={() => settings.showLabels.set(!settings.showLabels.get())}
                className="mr-2"
              />
              Show Labels (Brand & Title)
            </label>
          </div>
        </div>

        {/* Number of Items */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-700">
            Number of Visible Items
          </h3>
          <input
            type="number"
            min="1"
            max="20"
            value={settings.visibleCount.get()}
            onChange={(e) => settings.visibleCount.set(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Color Customization */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-700">Color Customization</h3>
          <div className="flex flex-col gap-2">
            <label>
              Card Background:{" "}
              <input
                type="color"
                value={settings.cardColor.get()}
                onChange={(e) => settings.cardColor.set(e.target.value)}
                className="ml-2"
              />
            </label>
            <label>
              Text Color:{" "}
              <input
                type="color"
                value={settings.textColor.get()}
                onChange={(e) => settings.textColor.set(e.target.value)}
                className="ml-2"
              />
            </label>
            <label>
              Star Color:{" "}
              <input
                type="color"
                value={settings.starColor.get()}
                onChange={(e) => settings.starColor.set(e.target.value)}
                className="ml-2"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
