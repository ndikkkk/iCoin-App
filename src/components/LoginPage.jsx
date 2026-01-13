import React, { useState } from 'react';
// Import fungsi login Email & Google dari library Firebase
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import logoImage from '../assets/iCoin.png';
import { Loader2, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Mode: Login atau Daftar?
  
  // State untuk form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. Handle Login Google (Tetap ada)
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Gagal:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Login/Register Email
  const handleEmailAuth = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoading(true);
    
    try {
      if (isRegistering) {
        // Logika Daftar Baru
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Akun berhasil dibuat! Selamat datang.");
      } else {
        // Logika Login Lama
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Note: Gak perlu redirect manual, App.jsx akan mendeteksi otomatis via Context
    } catch (error) {
      let msg = error.message;
      if (error.code === 'auth/invalid-credential') msg = "Email atau Password salah!";
      if (error.code === 'auth/email-already-in-use') msg = "Email sudah terdaftar!";
      if (error.code === 'auth/weak-password') msg = "Password terlalu lemah (min 6 karakter).";
      alert("Error: " + msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-2xl border border-white/5 shadow-2xl w-full max-w-md space-y-8">
        
        {/* Header Logo */}
        <div className="text-center">
            <div className="flex justify-center mb-4">
                <img src={logoImage} alt="iCoin" className="w-20 h-20 object-contain animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#926a00]">
                {isRegistering ? "Buat Akun Baru" : "Selamat Datang"}
            </h1>
            <p className="text-gray-400 text-sm mt-2">
                {isRegistering ? "Gabung komunitas trading simulasi #1" : "Masuk untuk melanjutkan portfolio Anda"}
            </p>
        </div>

        {/* Form Email & Password */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input 
                        type="email" 
                        required
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#926a00] placeholder-gray-600"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#926a00] placeholder-gray-600"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#926a00] hover:bg-[#b08000] text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : (isRegistering ? <UserPlus size={20}/> : <LogIn size={20}/>)}
                {isRegistering ? "Daftar Akun" : "Masuk Sekarang"}
            </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
            <div className="h-px bg-gray-700 flex-1"></div>
            <span className="text-gray-500 text-xs uppercase">Atau</span>
            <div className="h-px bg-gray-700 flex-1"></div>
        </div>

        {/* Tombol Google */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />
          Lanjut dengan Google
        </button>

        {/* Toggle Login/Register */}
        <div className="text-center">
            <p className="text-gray-400 text-sm">
                {isRegistering ? "Sudah punya akun?" : "Belum punya akun?"}
                <button 
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="ml-2 text-[#926a00] font-bold hover:underline"
                >
                    {isRegistering ? "Login di sini" : "Daftar gratis"}
                </button>
            </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;