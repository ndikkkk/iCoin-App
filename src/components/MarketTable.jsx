import React, { useState } from 'react';
// Tambahkan DollarSign ke import
import { ArrowUp, ArrowDown, Loader2, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import SparklineChart from './SparklineChart';
import { usePortfolio } from '../context/PortfolioContext';

const MarketTable = ({ coins, loading }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);
  const { buyAsset } = usePortfolio(); 
  const [buyAmount, setBuyAmount] = useState(''); 

  const toggleRow = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
    setBuyAmount(''); // Reset input saat ganti koin
  };

  const handleBuy = (coin) => {
    if (!buyAmount) return;
    buyAsset(coin.id, parseFloat(buyAmount), coin.current_price);
    setBuyAmount(''); // Reset setelah beli
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Memuat data pasar live...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/30 rounded-xl border border-white/5 overflow-hidden backdrop-blur-sm shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase text-gray-500 font-semibold tracking-wider bg-gray-900/50">
              <th className="px-4 py-4">#</th>
              <th className="px-4 py-4">Aset</th>
              <th className="px-4 py-4 text-right">Harga</th>
              <th className="px-4 py-4 text-right">24h %</th>
              <th className="px-4 py-4 text-right hidden md:table-cell">Mkt Cap</th>
              <th className="px-4 py-4"></th> 
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {coins.map((coin) => {
              const isUp = coin.price_change_percentage_24h > 0;
              const isExpanded = expandedRowId === coin.id;

              return (
                <React.Fragment key={coin.id}>
                  {/* BARIS 1: Data Utama */}
                  <tr 
                    onClick={() => toggleRow(coin.id)} 
                    className={`cursor-pointer transition-colors ${isExpanded ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                  >
                    <td className="px-4 py-4 text-gray-500 font-medium text-sm">{coin.market_cap_rank}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <span className="font-bold text-white block">{coin.symbol.toUpperCase()}</span>
                          <span className="text-gray-500 text-sm">{coin.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-white">
                      ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className={`inline-flex items-center gap-1 font-bold px-2 py-1 rounded-md text-sm ${isUp ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                        {isUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-gray-400 text-sm hidden md:table-cell">
                      ${(coin.market_cap / 1000000000).toFixed(2)} B
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </td>
                  </tr>

                  {/* BARIS 2: Grafik & Trading Panel */}
                  {isExpanded && (
                    <tr className="bg-white/[0.04]">
                      <td colSpan="6" className="px-4 pb-6 pt-2">
                        {/* Container Flex: Kiri Grafik, Kanan Panel Beli */}
                        <div className="flex flex-col md:flex-row gap-6">
                            
                            {/* BAGIAN KIRI: Grafik */}
                            <div className="flex-1">
                                <SparklineChart 
                                    data={coin.sparkline_in_7d.price} 
                                    priceChange={coin.price_change_percentage_7d_in_currency}
                                />
                            </div>

                            {/* BAGIAN KANAN: Form Beli */}
                            <div className="md:w-1/3 bg-gray-900 rounded-lg p-4 border border-white/10 flex flex-col justify-center shadow-inner">
                                <h3 className="text-gray-400 text-sm font-medium mb-3">Beli {coin.name}</h3>
                                
                                {/* Input Dollar */}
                                <div className="relative mb-3">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">$</span>
                                    </div>
                                    <input 
                                        type="number" 
                                        placeholder="0.00"
                                        value={buyAmount}
                                        onChange={(e) => setBuyAmount(e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-2 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-[#926a00] placeholder-gray-600 appearance-none"
                                    />
                                </div>

                                {/* Tombol Action */}
                                <button 
                                    onClick={() => handleBuy(coin)}
                                    className="w-full bg-[#926a00] hover:bg-[#b08000] text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 active:scale-95 transform duration-100"
                                >
                                    <DollarSign size={16} /> Beli Sekarang
                                </button>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Simulasi saldo virtual
                                </p>
                            </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;