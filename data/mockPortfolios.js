// /data/mockPortfolios.js
// A simple in-memory array of portfolios for demo purposes
// Each portfolio: { id, name, positions: [ { symbol, quantity, priceUsd } ] }

export let mockPortfolios = [
    {
      id: '1',
      name: 'Demo Portfolio',
      positions: [
        { symbol: 'BTC', quantity: 0.5, priceUsd: 35000 },
        { symbol: 'ETH', quantity: 2, priceUsd: 1800 }
      ]
    }
  ];
  
  // Utility to generate a new ID (for real usage, use DB auto ID or uuid)
  export function generateId() {
    return Math.random().toString(36).substring(2, 9);
  }
  