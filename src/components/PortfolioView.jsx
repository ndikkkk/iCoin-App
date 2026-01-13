import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Trash2 } from 'lucide-react';

const PortfolioView = ({ coins }) => {
  const { assets, balance, sellAsset, resetPortfolio } = usePortfolio();

  // Hitung Total Nilai Portfolio (Cash + Crypto Value)
  let totalCryptoValue = 0;
  
  // Ubah object assets menjadi array supaya gampang di-map
  const assetList = Object.keys(assets).map(coinId => {
    const asset = assets[coinId];
    const marketData = coins.find(c => c.id === coinId); // Cari harga live
    
    // Jika data market belum load, pakai harga beli terakhir (fallback)
    const currentPrice = marketData ? marketData.current_price : asset.avgPrice;
    const currentValue = asset.amount * currentPrice;
    
    totalCryptoValue += currentValue;

    // Hitung Untung/Rugi (PnL)
    const pnlPercent = ((currentPrice - asset.avgPrice) / asset.avgPrice) * 100;
    const isProfit = pnlPercent >= 0;

    return {
      id: coinId,
      name: marketData?.name || coinId,
      symbol: marketData?.symbol || coinId,
      image: marketData?.image,
      amount: asset.amount,
      avgPrice: asset.avgPrice,
      currentPrice,
      currentValue,
      pnlPercent,
      isProfit
    };
  });

  const totalNetWorth = balance + totalCryptoValue;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Header Ringkasan Kekayaan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kartu Net Worth */}
        <div className="bg-gradient-to-br from-indigo-900 to-gray-900 p-6 rounded-2xl border border-indigo-500/20 shadow-lg">
          <div className="flex items-center gap-3 mb-2 text-indigo-300">
            <PieChart size={20} />
            <span className="font-medium text-sm uppercase">Total Kekayaan</span>
          </div>
          <div className="text-3xl font-bold text-white">
            ${totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-indigo-400 mt-2">Cash + Aset Kripto</div>
        </div>

        {/* Kartu Sisa Cash */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <DollarSign size={20} />
            <span className="font-medium text-sm uppercase">Uang Tunai (Saldo)</span>
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-gray-500 mt-2">Siap dibelanjakan</div>
        </div>
      </div>

      {/* 2. Tabel Aset */}
      <div className="bg-gray-900/50 rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Aset Saya</h3>
            <button onClick={resetPortfolio} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                <Trash2 size={12}/> Reset Akun
            </button>
        </div>
        
        {assetList.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
                Belum ada aset kripto. Silakan beli di menu Markets!
            </div>
        ) : (
            <table className="w-full text-left">
            <thead className="bg-white/5 text-xs text-gray-400 uppercase">
                <tr>
                <th className="px-6 py-3">Aset</th>
                <th className="px-6 py-3 text-right">Jml Koin</th>
                <th className="px-6 py-3 text-right">Avg Buy</th>
                <th className="px-6 py-3 text-right">Harga Skrg</th>
                <th className="px-6 py-3 text-right">PnL (%)</th>
                <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {assetList.map((asset) => (
                <tr key={asset.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 flex items-center gap-3">
                        {asset.image && <img src={asset.image} className="w-6 h-6 rounded-full" />}
                        <span className="font-bold uppercase text-white">{asset.symbol}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-gray-300">
                        {asset.amount.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400 text-sm">
                        ${asset.avgPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-white font-medium">
                        ${asset.currentPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className={`flex items-center justify-end gap-1 ${asset.isProfit ? 'text-green-400' : 'text-red-400'} font-bold`}>
                            {asset.isProfit ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                            {asset.pnlPercent.toFixed(2)}%
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button 
                            // Jual 100% aset ini
                            onClick={() => sellAsset(asset.id, asset.amount, asset.currentPrice)}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs font-bold border border-red-500/20 transition-colors"
                        >
                            JUAL SEMUA
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>
    </div>
  );
};

export default PortfolioView;