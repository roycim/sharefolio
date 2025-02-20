// pages/portfolio/[id].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "../../lib/supabaseClient";
import Layout from "../../components/Layout";

export default function PortfolioDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [portfolio, setPortfolio] = useState(null);
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (id) {
      fetchPortfolio();
    }
  }, [id]);

  async function fetchPortfolio() {
    try {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*, positions(*)")
        .eq("id", id)
        .single();
      if (error) throw error;
      setPortfolio(data);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
    }
  }

  async function handleAddPosition(e) {
    e.preventDefault();
    if (!ticker.trim() || !quantity) return;
    const dummyUserId = "00000000-0000-0000-0000-000000000001";

    try {
      const res = await fetch("/api/positions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolio_id: id,
          ticker,
          quantity,
          creator: dummyUserId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setTicker("");
        setQuantity("");
        setPortfolio(data.portfolio);
      }
    } catch (err) {
      console.error("Error adding position:", err);
    }
  }

  if (!portfolio) {
    return (
      <Layout>
        <p className="text-white">Loading portfolio...</p>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{portfolio.name} - Sharefolio</title>
      </Head>
      <Layout>
        <div className="text-white space-y-6">
          <h1 className="text-3xl font-bold">{portfolio.name}</h1>
          <p className="text-sm text-gray-400">Visibility: {portfolio.visibility}</p>

          <form onSubmit={handleAddPosition} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ticker (e.g. BTC)"
              className="px-3 py-2 rounded text-black"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="px-3 py-2 rounded text-black"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition text-white"
            >
              Add Position
            </button>
          </form>

          <div className="bg-white/10 p-4 rounded">
            <h2 className="text-xl font-semibold mb-3">Positions</h2>
            {portfolio.positions.length === 0 ? (
              <p>No positions yet.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="border-b border-white/20">
                  <tr>
                    <th className="py-2">Ticker</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Acquired Price</th>
                    <th className="py-2">Current Price</th>
                    <th className="py-2">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.positions.map((pos, idx) => (
                    <tr key={idx} className="border-b border-white/5">
                      <td className="py-2">{pos.ticker}</td>
                      <td className="py-2">{pos.quantity}</td>
                      <td className="py-2">
                        {pos.aq_price ? "$" + parseFloat(pos.aq_price).toFixed(2) : "—"}
                      </td>
                      <td className="py-2">
                        {pos.curr_price ? "$" + parseFloat(pos.curr_price).toFixed(2) : "—"}
                      </td>
                      <td className="py-2">
                        {pos.curr_price && pos.quantity
                          ? "$" + (parseFloat(pos.curr_price) * parseFloat(pos.quantity)).toFixed(2)
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
