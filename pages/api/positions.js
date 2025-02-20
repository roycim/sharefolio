import { supabase } from '../../lib/supabaseClient'
import { getOrCreateAsset } from '../../services/assetService.js'
import { generateUniqueSlug } from '../../utils/slug'
import { withErrorHandler } from '../../middleware/errorHandler'

async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      portfolio_id,
      aq_date,
      aq_price,
      aq_usd_value,
      curr_price,
      curr_usd_value,
      quantity,
      ticker,
      tokname,
      creator,
      slug,
      notes,
    } = req.body

    if (!portfolio_id || !ticker || !quantity || !creator) {
      return res.status(400).json({
        error:
          'Missing required fields: portfolio_id, ticker, quantity, creator.',
      })
    }

    const positionSlug = slug || generateUniqueSlug(ticker)

    let finalCurrPrice = curr_price
    let finalCurrUsdValue = curr_usd_value
    if (!curr_price || !curr_usd_value) {
      try {
        const response = await fetch(`${req.headers.origin}/api/cryptoData`)
        const data = await response.json()
        const coin = data.data.find(
          (c) => c.symbol.toUpperCase() === ticker.toUpperCase()
        )
        if (coin) {
          finalCurrPrice = parseFloat(coin.priceUsd)
          finalCurrUsdValue = parseFloat(coin.priceUsd) * parseFloat(quantity)
        }
      } catch (err) {
        console.error('Error fetching crypto data:', err)
      }
    }

    // Ensure the portfolio exists.
    const { data: existingPortfolio, error: portfolioError } = await supabase
      .from('portfolios')
      .select('id')
      .eq('id', portfolio_id)
      .maybeSingle()

    if (portfolioError || !existingPortfolio) {
      return res.status(400).json({ error: 'Invalid portfolio ID' })
    }

    // Upsert into assets to get asset_id.
    const asset = await getOrCreateAsset(ticker, tokname)
    if (!asset) {
      return res
        .status(500)
        .json({ error: `Failed to upsert asset for ticker ${ticker}.` })
    }

    const { data, error } = await supabase
      .from('positions')
      .insert([
        {
          portfolio_id,
          aq_date,
          aq_price,
          aq_usd_value,
          curr_price: finalCurrPrice,
          curr_usd_value: finalCurrUsdValue,
          quantity: parseFloat(quantity),
          ticker: ticker.toUpperCase(),
          tokname: tokname || ticker,
          creator,
          slug: positionSlug,
          notes: notes || null,
          asset_id: asset.id,
        },
      ])
      .select()
      .maybeSingle()

    if (error || !data) {
      return res.status(500).json({
        error: error ? error.message : 'Position insert failed',
      })
    }

    // Fetch updated portfolio with positions for the UI.
    const { data: updatedPortfolio, error: fetchError } = await supabase
      .from('portfolios')
      .select('*, positions(*)')
      .eq('id', portfolio_id)
      .maybeSingle()

    if (fetchError) {
      return res.status(500).json({ error: fetchError.message })
    }

    return res.status(200).json({ portfolio: updatedPortfolio, position: data })
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export default withErrorHandler(handler)
