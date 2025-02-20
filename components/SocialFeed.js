import { useState } from "react";

export default function SocialFeed() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCryptoData() {
    setLoading(true);
    try {
      const response = await fetch("/api/cryptoData"); // Calls the Next.js API route
      const data = await response.json();
      setCryptoData(data.data.slice(0, 5)); // Show only the first 5 assets
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-sharefolio-accent/50 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Social Feed</h2>

      <button
        onClick={fetchCryptoData}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition block mx-auto"
      >
        {loading ? "Loading..." : "Fetch Crypto Data"}
      </button>

      {cryptoData.length > 0 && (
        <div className="mt-4">
          {cryptoData.map((coin) => (
            <div
              key={coin.id}
              className="bg-white/10 p-3 rounded-lg mb-2 flex justify-between items-center"
            >
              <span className="text-white font-medium">{coin.name} ({coin.symbol})</span>
              <span className="text-green-400 font-semibold">
                ${parseFloat(coin.priceUsd).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      {cryptoData.length === 0 && !loading && (
        <div className="text-center text-white/60 py-12">
          Social feed coming soon! 🌐
        </div>
      )}
    </div>
  );
}
