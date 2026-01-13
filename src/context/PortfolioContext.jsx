import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'; // Fitur Database Realtime
import { onAuthStateChanged } from 'firebase/auth';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState({});

  // 1. Pantau Status Login User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Kalau user login, langsung langganan data dia di Database (Realtime Sync)
        const userRef = doc(db, "users", currentUser.uid);
        
        // Listener: Setiap kali data di DB berubah, state di web ikut berubah otomatis
        const unsubDoc = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setBalance(data.balance);
            setAssets(data.assets || {});
          } else {
            // User Baru? Buatkan data awal (Modal $10,000)
            const initialData = { balance: 10000, assets: {} };
            setDoc(userRef, initialData);
          }
        });
        setLoadingUser(false);
        return () => unsubDoc();
      } else {
        setBalance(0);
        setAssets({});
        setLoadingUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fungsi Helper: Simpan ke Firestore
  const saveToCloud = async (newBalance, newAssets) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        balance: newBalance,
        assets: newAssets
      }, { merge: true });
    } catch (error) {
      console.error("Gagal simpan ke cloud:", error);
    }
  };

  const buyAsset = (coinId, amountInUsd, currentPrice) => {
    if (amountInUsd > balance) return alert("Saldo Kurang!");
    
    const coinAmount = amountInUsd / currentPrice;
    const newBalance = balance - amountInUsd;
    
    // Logic hitung aset
    const currentAsset = assets[coinId] || { amount: 0, totalCost: 0 };
    const newAssets = {
        ...assets,
        [coinId]: {
            amount: currentAsset.amount + coinAmount,
            totalCost: currentAsset.totalCost + amountInUsd,
            avgPrice: (currentAsset.totalCost + amountInUsd) / (currentAsset.amount + coinAmount)
        }
    };

    // Update Lokal (biar responsif) & Cloud (biar aman)
    setBalance(newBalance);
    setAssets(newAssets);
    saveToCloud(newBalance, newAssets);
    
    alert("Beli Sukses!");
  };

  const sellAsset = (coinId, coinAmount, currentPrice) => {
    const currentAsset = assets[coinId];
    if (!currentAsset || currentAsset.amount < coinAmount) return alert("Aset kurang!");

    const receiveAmount = coinAmount * currentPrice;
    const newBalance = balance + receiveAmount;
    
    const newAssets = { ...assets };
    const remainingAmount = currentAsset.amount - coinAmount;

    if (remainingAmount <= 0.000001) {
        delete newAssets[coinId];
    } else {
        newAssets[coinId] = {
            ...currentAsset,
            amount: remainingAmount,
            totalCost: currentAsset.totalCost * (remainingAmount / currentAsset.amount)
        };
    }

    setBalance(newBalance);
    setAssets(newAssets);
    saveToCloud(newBalance, newAssets);

    alert("Jual Sukses!");
  };

  const resetPortfolio = () => {
      if(confirm("Reset akun ke $10,000?")) {
          const resetData = { balance: 10000, assets: {} };
          setBalance(10000);
          setAssets({});
          saveToCloud(10000, {});
      }
  }

  // Fungsi Logout
  const logout = () => auth.signOut();

  return (
    <PortfolioContext.Provider value={{ user, loadingUser, balance, assets, buyAsset, sellAsset, resetPortfolio, logout }}>
      {children}
    </PortfolioContext.Provider>
  );
};