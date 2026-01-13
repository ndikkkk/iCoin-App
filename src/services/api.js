// src/services/api.js
import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

// Instance axios sederhana
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 detik timeout
});

export const getMarketData = async () => {
    try {
        // Mengambil Top 10 Koin berdasarkan Market Cap
        // sparkline=true -> untuk mengambil data grafik 7 hari (step 2 nanti)
        const response = await api.get('/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: true 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching market data:", error);
        throw error;
    }
};