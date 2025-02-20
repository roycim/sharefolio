import { supabase } from '../../lib/supabaseClient'
import { createPortfolio } from '../../services/portfolioService'
import { withErrorHandler } from '../../middleware/errorHandler'

async function handler(req, res) {
  if (req.method === 'GET') {
    // Retrieve all portfolios with their positions.
    const { data, error } = await supabase
      .from('portfolios')
      .select('*, positions(*)')
      .order('created_at', { ascending: false })
    if (error) throw error
    return res.status(200).json({ portfolios: data })
  } else if (req.method === 'POST') {
    const portfolioData = req.body
    const portfolio = await createPortfolio(portfolioData)
    return res.status(201).json({ portfolio })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
}

export default withErrorHandler(handler)
