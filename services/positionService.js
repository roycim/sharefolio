// /services/positionService.js
import { supabase } from '../lib/supabaseClient'
import { getOrCreateAsset } from './assetService.js'
import { generateUniqueSlug } from '../utils/slug'

/**
 * Create positions for a given portfolio.
 * @param {string} portfolioId - The portfolio's ID.
 * @param {Array} positions - An array of position objects.
 * @param {string} creator - The user ID of the creator.
 * @returns {Promise<Array>} - The inserted positions.
 */
export async function createPositions(portfolioId, positions, creator) {
  const preparedPositions = []

  for (const pos of positions) {
    // Upsert the asset and obtain its ID.
    const asset = await getOrCreateAsset(pos.ticker, pos.tokname)
    if (!asset) {
      throw new Error(`Failed to upsert asset for ticker ${pos.ticker}`)
    }
    preparedPositions.push({
      portfolio_id: portfolioId,
      creator: pos.creator || creator,
      slug: pos.slug || generateUniqueSlug(pos.ticker || 'position'),
      ticker: pos.ticker.toUpperCase(),
      tokname: pos.tokname || pos.ticker,
      quantity: pos.quantity || 0,
      aq_price: pos.priceUsd, // Assuming priceUsd as acquisition price.
      curr_price: pos.priceUsd, // Same as above; update later if needed.
      aq_usd_value: pos.priceUsd ? pos.priceUsd * pos.quantity : null,
      curr_usd_value: pos.priceUsd ? pos.priceUsd * pos.quantity : null,
      asset_id: asset.id,
    })
  }

  // Insert all prepared positions.
  const { data, error } = await supabase
    .from('positions')
    .insert(preparedPositions)
    .select()

  if (error) {
    console.error('[Positions Insert Error]', error)
    throw new Error('Positions insert failed.')
  }
  return data
}
