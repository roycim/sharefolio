// /services/assetService.js
import { supabase } from '../lib/supabaseClient'
import { generateUniqueSlug } from '../utils/slug'

/**
 * Upsert an asset by its ticker and optional token name.
 * Uses the asset's slug (derived from the ticker) as the conflict target.
 * @param {string} ticker - E.g. "SOL"
 * @param {string} [tokname] - E.g. "Solana"
 * @returns {Promise<Object|null>} - The asset record or null on error.
 */
export async function getOrCreateAsset(ticker, tokname) {
  const assetSlug = ticker.toLowerCase()
  const { data, error } = await supabase
    .from('assets')
    .upsert(
      {
        symbol: ticker.toUpperCase(),
        name: tokname || ticker.toUpperCase(),
        slug: assetSlug,
      },
      { onConflict: 'slug' } // Resolve conflicts based on the unique slug.
    )
    .select()
    .maybeSingle()

  if (error) {
    console.error('[Asset Upsert Error]', error)
    return null
  }

  return data
}
