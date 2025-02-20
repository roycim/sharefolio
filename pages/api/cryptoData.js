import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  try {
    // Fetch top 50 assets from CoinCap
    const response = await fetch('https://api.coincap.io/v2/assets?limit=50', {
      headers: {
        Authorization: 'Bearer a0a23a7b-112c-4c0f-93a4-f7f3bc918b92'
      }
    })

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }

    const data = await response.json()
    let assets = data.data || []

    // OPTIONAL: For each asset, fetch historical data (e.g. for 24h change)
    // Then upsert into your local "assets" table
    const updatedAssets = []
    for (const asset of assets) {
      // If you want daily history:
      const historyResponse = await fetch(
        `https://api.coincap.io/v2/assets/${asset.id}/history?interval=d1`
      )
      const historyData = await historyResponse.json()
      if (historyData.data && historyData.data.length > 1) {
        const prevPrice = parseFloat(
          historyData.data[historyData.data.length - 2].priceUsd
        )
        const currentPrice = parseFloat(asset.priceUsd)
        asset.change24h = ((currentPrice - prevPrice) / prevPrice) * 100
      } else {
        asset.change24h = 0
      }

      // Upsert into "assets" table
      const slug = asset.symbol.toLowerCase()
      await supabase
        .from('assets')
        .upsert({
          symbol: asset.symbol.toUpperCase(),
          name: asset.name,
          slug
        })
        .select()

      updatedAssets.push(asset)
    }

    res.status(200).json({ data: updatedAssets })
  } catch (error) {
    console.error('CryptoData API Error:', error)
    res.status(500).json({ error: error.message })
  }
}
