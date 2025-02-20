import { supabase } from '../lib/supabaseClient'
import { generateUniqueSlug } from '../utils/slug'
import { createPositions } from './positionService'
import { portfolioSchema } from '../utils/validate'
import { generateRandomMeshSVG } from '../utils/mesh'

/**
 * Create a portfolio along with optional positions.
 * @param {Object} portfolioData - The portfolio data.
 * @returns {Promise<Object>} - The created portfolio record (with positions if provided).
 */
export async function createPortfolio(portfolioData) {
  // Validate incoming data.
  const parsed = portfolioSchema.safeParse(portfolioData)
  if (!parsed.success) {
    throw new Error(
      'Validation failed: ' +
        parsed.error.errors.map((err) => err.message).join(', ')
    )
  }

  const {
    name,
    slug,
    creator,
    description,
    displaypicture,
    visibility,
    positions,
  } = portfolioData

  const portfolioSlug = slug || generateUniqueSlug('portfolio')
  const finalDescription = description || ''

  // If displaypicture is not provided, generate a random SVG mesh gradient.
  const finalDisplayPicture = displaypicture || generateRandomMeshSVG()

  // Check for slug uniqueness.
  const { data: existing, error: checkError } = await supabase
    .from('portfolios')
    .select('id')
    .eq('slug', portfolioSlug)
    .maybeSingle()
  if (checkError) {
    throw new Error('Failed checking slug uniqueness')
  }
  if (existing) {
    throw new Error(
      `Portfolio slug "${portfolioSlug}" already exists. Choose a different slug.`
    )
  }

  // Insert the portfolio record.
  // Note: We are using only the "creator" column for ownership.
  const { data: insertedPortfolio, error: insertErr } = await supabase
    .from('portfolios')
    .insert([
      {
        name,
        slug: portfolioSlug,
        creator, // Use creator only.
        description: finalDescription,
        displaypicture: finalDisplayPicture,
        visibility: visibility || 'private',
      },
    ])
    .select()
    .single()

  if (insertErr || !insertedPortfolio) {
    throw new Error(
      insertErr ? insertErr.message : 'Failed to insert portfolio'
    )
  }

  let insertedPositions = []
  if (positions && Array.isArray(positions) && positions.length > 0) {
    try {
      insertedPositions = await createPositions(
        insertedPortfolio.id,
        positions,
        creator
      )
    } catch (err) {
      // Roll back portfolio creation if positions fail.
      await supabase.from('portfolios').delete().eq('id', insertedPortfolio.id)
      throw new Error('Positions insert failed. Portfolio creation rolled back.')
    }
  }

  return { ...insertedPortfolio, positions: insertedPositions }
}
