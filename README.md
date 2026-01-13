# 💎 iCoin Pro - Realtime Crypto Dashboard

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg?logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20DB-FFCA28.svg?logo=firebase)

**iCoin Pro** adalah dashboard pemantau pasar kripto modern dengan fitur **Simulator Portofolio**. Aplikasi ini memungkinkan pengguna untuk memantau harga aset secara *realtime* dan berlatih trading menggunakan uang virtual tanpa risiko.

---

## 🔥 Fitur Utama

### 1. Market Monitor Realtime
* Menampilkan Top Crypto Assets berdasarkan Kapitalisasi Pasar.
* **Sparkline Charts:** Grafik tren harga 7 hari terakhir yang interaktif.
* Data diambil langsung dari **CoinGecko API**.

### 2. Risk-Free Portfolio Simulator
* **Modal Virtual $10,000:** Mulai trading tanpa takut rugi.
* **Beli & Jual:** Eksekusi order instan dengan kalkulasi profit/loss otomatis.
* **Realtime Valuation:** Nilai aset portofolio mengikuti harga pasar terkini.

### 3. Keamanan & Personalisasi
* **Google Authentication:** Login aman dan cepat menggunakan Firebase Auth.
* **Cloud Database:** Data portofolio tersimpan di Firestore (Cloud), bisa diakses dari device mana saja.
* **Persistent Session:** Tidak perlu login ulang setiap kali refresh.

---

## 🛠️ Tech Stack

Project ini dibangun dengan arsitektur **Serverless** modern:

* **Frontend:** React.js + Vite (Super Cepat)
* **Styling:** Tailwind CSS (Dark Mode Professional UI)
* **Data Visualization:** Recharts (Untuk grafik performa)
* **Icons:** Lucide React & Flaticon
* **Backend as a Service:** Google Firebase (Auth & Firestore)
* **Deployment:** Vercel

---

## 🚀 Cara Menjalankan di Local

Ingin mencoba kode ini di komputer Anda? Ikuti langkah berikut:

1.  **Clone Repository**
    ```bash
    git clone https://github.com/ndikkkk/iCoin-App.git
    cd iCoin-Crypto-Dashboard
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Firebase**
    * Buat project baru di [Firebase Console](https://console.firebase.google.com/).
    * Aktifkan **Authentication (Google)** dan **Firestore Database**.
    * Buat file `src/services/firebase.js` dan masukkan config API Key Anda.

4.  **Jalankan Server**
    ```bash
    npm run dev
    ```

---

## 👨‍💻 Author

Dibuat oleh **Andhikaalvn**
* Senior Frontend Engineer (Simulator)
* React.js Enthusiast

---