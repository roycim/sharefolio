import React, { useState } from "react";

export default function HomeHero() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCryptoData() {
    setLoading(true);
    try {
      const response = await fetch("/api/cryptoData");
      const data = await response.json();
      setCryptoData(data.data.slice(0, 10)); // Fetch top 10 assets
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🚀 Hero Section */}
      <section className="text-center py-20 bg-gradient-to-b from-popover to-background">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to Sharefolio</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The ultimate platform for tracking and sharing crypto portfolios.
          Follow top traders, analyze trends, and maximize your investments.
        </p>
        <button className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition">
          Get Started
        </button>
      </section>

      {/* 📊 Crypto Table Section */}
      <section className="py-16 px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Live Crypto Prices</h2>
          <button
            onClick={fetchCryptoData}
            className="px-4 py-2 bg-primary rounded-md hover:bg-primary/90 transition text-primary-foreground"
          >
            {loading ? "Loading..." : "Fetch Crypto Data"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-border">
            <thead>
              <tr className="bg-popover">
                {["#", "Name", "Symbol", "Price (USD)", "Market Cap"].map((header) => (
                  <th key={header} className="p-3 border border-border text-foreground">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((coin, index) => (
                <tr key={coin.id} className="border border-border hover:bg-popover/20 transition">
                  <td className="p-3 text-foreground">{index + 1}</td>
                  <td className="p-3 text-foreground">{coin.name}</td>
                  <td className="p-3 text-foreground">{coin.symbol}</td>
                  <td className="p-3 text-foreground">${parseFloat(coin.priceUsd).toFixed(2)}</td>
                  <td className="p-3 text-foreground">${(coin.marketCapUsd / 1e9).toFixed(2)}B</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
