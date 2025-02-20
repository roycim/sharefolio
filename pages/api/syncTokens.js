import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    // Fetch top 50 tokens from CoinCap
    const response = await fetch('https://api.coincap.io/v2/assets?limit=50')
    if (!response.ok) {
      throw new Error(`CoinCap error: ${response.statusText}`)
    }

    const { data } = await response.json()
    if (!data) {
      throw new Error('No data returned from CoinCap')
    }

    // Prepare array for upsert
    const upsertData = data.map((asset) => ({
      symbol: asset.symbol.toUpperCase(),
      name: asset.name,
      slug: asset.symbol.toLowerCase(), // used for onConflict
      price_usd: parseFloat(asset.priceUsd),
      market_cap_usd: parseFloat(asset.marketCapUsd),
      volume_usd_24_hr: parseFloat(asset.volumeUsd24Hr),
      change_percent_24_hr: parseFloat(asset.changePercent24Hr),
    }))

    // Upsert into "assets" table
    const { data: upserted, error } = await supabase
      .from('assets')
      .upsert(upsertData, { onConflict: 'slug' })
      .select()

    if (error) throw error

    return res.status(200).json({
      success: true,
      count: upserted.length,
      message: 'Assets successfully synced!',
    })
  } catch (err) {
    console.error('Sync Tokens Error:', err)
    return res.status(500).json({ error: err.message })
  }
}
