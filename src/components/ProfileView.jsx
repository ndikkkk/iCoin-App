import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { LogOut, Shield, Mail, Wallet } from 'lucide-react';
// 1. Import gambar default avatar
import defaultAvatar from '../assets/user.png';

const ProfileView = () => {
  const { user, balance, logout, resetPortfolio } = usePortfolio();
  
  // 2. State untuk deteksi gambar error
  const [imgError, setImgError] = useState(false);

  // Reset error saat user berganti
  useEffect(() => {
    setImgError(false);
  }, [user]);

  const handleLogout = async () => {
    if (confirm("Yakin ingin keluar?")) {
        try {
            await logout();
        } catch (error) {
            console.error("Gagal logout:", error);
        }
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Kartu Profil Utama */}
      <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        
        {/* Banner Background */}
        <div className="h-32 bg-gradient-to-r from-[#926a00] to-yellow-600 relative">
            <div className="absolute -bottom-10 left-8 p-1 bg-gray-900 rounded-full">
                {/* 3. LOGIKA GAMBAR PROFIL:
                   Menggunakan satu tag <img> cerdas. 
                   Jika photoURL ada & tidak error -> Pakai foto user.
                   Selain itu -> Pakai defaultAvatar.
                */}
                <img 
                    src={(user?.photoURL && !imgError) ? user.photoURL : defaultAvatar} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-900 bg-white"
                    onError={() => setImgError(true)}
                />
            </div>
        </div>

        <div className="pt-12 pb-8 px-8">
            <h2 className="text-2xl font-bold text-white">{user?.displayName || "Pengguna iCoin"}</h2>
            <div className="flex items-center gap-2 text-gray-400 mt-1 mb-6">
                <Mail size={14} />
                <span className="text-sm">{user?.email}</span>
            </div>

            {/* Statistik Singkat */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 uppercase flex items-center gap-2 mb-1">
                        <Wallet size={14}/> Saldo Tunai
                    </div>
                    <div className="text-xl font-mono font-bold text-emerald-400">
                        ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 uppercase flex items-center gap-2 mb-1">
                        <Shield size={14}/> Status Akun
                    </div>
                    <div className="text-xl font-bold text-white">
                        Pro Member
                    </div>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="space-y-3">
                <button 
                    onClick={resetPortfolio}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                   Reset Portfolio (Mulai Ulang)
                </button>
                
                <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut size={18} />
                    Log Out / Keluar
                </button>
            </div>

            <p className="text-center text-xs text-gray-600 mt-6">
                iCoin App Version 1.0.0 • React + Firebase
            </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;