import React from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

const SparklineChart = ({ data, priceChange }) => {
  // Tentukan warna chart: Hijau (emerald-400) jika naik, Merah (rose-400) jika turun
  const chartColor = priceChange >= 0 ? "#34d399" : "#fb7185";

  // Format data agar bisa dibaca oleh Recharts
  // API memberi kita array angka: [20000, 21000, 19500, ...]
  // Recharts butuh array objek: [{ value: 20000 }, { value: 21000 }, ...]
  const formattedData = data.map(price => ({ value: price }));

  return (
    <div className="h-32 w-full py-4 bg-gray-900/30 rounded-lg mt-2 border border-white/5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <YAxis domain={['auto', 'auto']} hide={true} />
          <Line
            type="monotone" // Membuat garis melengkung halus
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            dot={false} // Hilangkan titik-titik data agar bersih
            isAnimationActive={true} // Animasi halus saat muncul
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-gray-500 mt-1">Tren Harga 7 Hari Terakhir</p>
    </div>
  );
};

export default SparklineChart;