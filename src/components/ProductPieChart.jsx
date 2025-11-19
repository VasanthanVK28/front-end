import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ProductPieChart({
  totalUsers,
  totalMobiles,
  totalLaptops,
  totalSofas,
  totalShirts,
  totalToys,
}) {
  const data = [
    { name: "Users", value: totalUsers },
    { name: "Mobiles", value: totalMobiles },
    { name: "Laptops", value: totalLaptops },
    { name: "Sofas", value: totalSofas },
    { name: "Shirts", value: totalShirts },
    { name: "Toys", value: totalToys },
  ];

  const COLORS = [
    "#3B82F6", // blue
    "#10B981", // green
    "#8B5CF6", // purple
    "#F97316", // orange
    "#84CC16", // lime
    "#06B6D4", // cyan
  ];

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-lg p-6 w-full mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Pie Chart</h2>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={130}
              innerRadius={60}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
