import React, { useState, useEffect } from 'react';
import { Wallet, BarChart2 } from 'lucide-react';
import logoImage from '../assets/iCoin.png';
// 1. Import gambar default avatar yang baru Anda simpan
import defaultAvatar from '../assets/user.png'; 
import { usePortfolio } from '../context/PortfolioContext';

const Header = ({ currentView, setView }) => {
  const { balance, user } = usePortfolio();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [user]);

  return (
    <header className="bg-gray-900/50 backdrop-blur-md border-b border-white/5 py-3 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('market')}>
        <img src={logoImage} alt="iCoin Logo" className="h-12 w-auto object-contain hover:scale-105 transition-transform" />
        <h1 className="text-3xl font-extrabold tracking-tight text-[#926a00]">iCoin</h1>
      </div>

      <nav className="flex items-center gap-2 md:gap-4 text-sm font-medium text-gray-400">
        
        <div className="hidden md:flex flex-col items-end mr-4 border-r border-white/10 pr-6">
            <span className="text-[10px] uppercase tracking-wider text-gray-500">Saldo Tersedia</span>
            <span className="text-emerald-400 font-bold font-mono text-lg">
                ${balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
        </div>

        <button 
          onClick={() => setView('market')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            currentView === 'market' 
            ? 'bg-[#926a00] text-white shadow-lg shadow-yellow-900/20' 
            : 'hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart2 size={18} /> <span className="hidden md:inline">Markets</span>
        </button>

        <button 
          onClick={() => setView('portfolio')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            currentView === 'portfolio' 
            ? 'bg-[#926a00] text-white shadow-lg shadow-yellow-900/20' 
            : 'hover:text-white hover:bg-white/5'
          }`}
        >
          <Wallet size={18} /> <span className="hidden md:inline">Portfolio</span>
        </button>

        {/* TOMBOL PROFILE */}
        <button 
          onClick={() => setView('profile')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            currentView === 'profile' 
            ? 'bg-[#926a00] text-white shadow-lg shadow-yellow-900/20' 
            : 'hover:text-white hover:bg-white/5'
          }`}
        >
          {/* LOGIKA GAMBAR:
              Jika User punya foto DAN tidak error -> Pakai Foto User.
              Jika tidak -> Pakai defaultAvatar.png
          */}
          <img 
            src={(user?.photoURL && !imgError) ? user.photoURL : defaultAvatar} 
            alt="Profile"
            className="w-6 h-6 rounded-full border border-white/20 object-cover bg-white"
            onError={() => setImgError(true)} 
          />
          <span className="hidden md:inline">Profile</span>
        </button>

      </nav>
    </header>
  );
};

export default Header;