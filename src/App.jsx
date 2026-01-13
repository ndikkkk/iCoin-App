import { useEffect, useState } from 'react';
import { getMarketData } from './services/api';
import Header from './components/Header';
import MarketTable from './components/MarketTable';
import PortfolioView from './components/PortfolioView';
import LoginPage from './components/LoginPage';
import { usePortfolio } from './context/PortfolioContext';
import { Loader2 } from 'lucide-react';
import ProfileView from './components/ProfileView'; // Import Profile

function App() {
  const { user, loadingUser } = usePortfolio(); // Cek status user
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State navigasi: 'market', 'portfolio', atau 'profile'
  const [currentView, setCurrentView] = useState('market');

  useEffect(() => {
    // Fetch data hanya jalan kalau user sudah login (hemat bandwidth)
    if (!user) return; 

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMarketData();
        setCoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [user]); // Dependency: user

  // TAMPILAN 1: Loading User (Sedang cek login)
  if (loadingUser) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
          <Loader2 className="animate-spin" size={48} />
        </div>
      );
  }

  // TAMPILAN 2: Belum Login -> Tampilkan Login Page
  if (!user) {
      return <LoginPage />;
  }

  // TAMPILAN 3: Sudah Login -> Dashboard Utama
  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8">
        
        {/* LOGIKA SWITCHING VIEW (Market / Portfolio / Profile) */}
        
        {/* VIEW 1: MARKET */}
        {currentView === 'market' && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Market Live</h2>
              <p className="text-gray-400">Selamat datang, {user.displayName}!</p>
            </div>
            <MarketTable coins={coins} loading={loading} />
          </>
        )}

        {/* VIEW 2: PORTFOLIO */}
        {currentView === 'portfolio' && (
          <>
             <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Portofolio Saya</h2>
            </div>
            {/* Kirim data coins agar bisa hitung harga realtime */}
            <PortfolioView coins={coins} />
          </>
        )}

        {/* VIEW 3: PROFILE */}
        {currentView === 'profile' && (
           <ProfileView />
        )}

      </main>
    </div>
  );
}

export default App;