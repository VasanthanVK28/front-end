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
  totalUsers = 120,
  totalMobiles = 45,
  totalLaptops = 30,
  totalSofas = 15,
  totalShirts = 20,
  totalToys = 10,
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

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-lg p-6 w-full mt-10 border border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent">Product Distribution</h2>

      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={160}
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', borderColor: '#f3f4f6', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ color: '#374151', fontWeight: 600 }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
