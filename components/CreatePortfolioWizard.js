// /components/CreatePortfolioWizard.js
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Utility: Generate a random mesh gradient as a data URL (SVG).
 * This is a minimal example that produces a 200x200 square with random color stops.
 */
function generateRandomMeshSVG() {
  const colors = Array.from({ length: 3 }, () => {
    // random pastel color
    const r = 100 + Math.floor(Math.random() * 156)
    const g = 100 + Math.floor(Math.random() * 156)
    const b = 100 + Math.floor(Math.random() * 156)
    return `rgb(${r},${g},${b})`
  })

  // Basic radial gradients with random positions
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g1" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${colors[0]}" />
          <stop offset="100%" stop-color="${colors[1]}" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#g1)"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Utility: Upload a file to Supabase Storage and return the public URL.
 * Ensure you have created a storage bucket named "portfolio-pictures" with public read access.
 */
async function uploadFileToSupabase(file, userId) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}_${userId}.${fileExt}`
  const filePath = `portfolio-pictures/${fileName}`

  // 1) Upload the file
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('portfolio-pictures')
    .upload(filePath, file)

  if (uploadError) {
    console.error('Error uploading file to Supabase:', uploadError)
    return null
  }

  // 2) Get public URL
  const { data: publicUrlData } = supabase
    .storage
    .from('portfolio-pictures')
    .getPublicUrl(filePath)

  return publicUrlData?.publicUrl || null
}

export default function CreatePortfolioWizard({ userId, onClose, onPortfolioCreated }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)          // The file from user input
  const [positions, setPositions] = useState([])  // Each: { ticker, quantity, priceUsd, slug }
  const [availableCoins, setAvailableCoins] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [quantity, setQuantity] = useState('')
  const [visibility, setVisibility] = useState('private') // 'public' or 'private'

  // For coin icons (optional)
  function getCoinIconUrl(symbol) {
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`
  }

  // Load local assets from the "assets" table (optionally sync tokens).
  useEffect(() => {
    async function syncAndLoadAssets() {
      try {
        await fetch('/api/syncTokens', { method: 'POST' }) // optional
      } catch (syncError) {
        console.error('Error syncing tokens:', syncError)
      }
      try {
        const { data: localAssets, error } = await supabase
          .from('assets')
          .select('*')
        if (error) {
          console.error('Error fetching local assets:', error)
        } else {
          const mapped = localAssets.map((asset) => ({
            ...asset,
            priceUsd: asset.price_usd
          }))
          setAvailableCoins(mapped)
        }
      } catch (err) {
        console.error('Error in syncAndLoadAssets:', err)
      }
    }
    syncAndLoadAssets()
  }, [])

  const handleNext = () => {
    if (!name.trim()) {
      alert('Please enter a portfolio name')
      return
    }
    setStep(2)
  }

  const handleBack = () => {
    if (step === 2) setStep(1)
  }

  // For adding a position
  const handleAddPosition = (e) => {
    e.preventDefault()
    if (!selectedCoin || !quantity) return
    const coinPrice = parseFloat(selectedCoin.priceUsd) || 0
    const newPos = {
      ticker: selectedCoin.symbol.toUpperCase(),
      quantity: parseFloat(quantity),
      priceUsd: coinPrice,
      slug: selectedCoin.symbol.toLowerCase() + '-' + Date.now()
    }
    setPositions([...positions, newPos])
    setSelectedCoin(null)
    setQuantity('')
    setSearchTerm('')
  }

  const removePosition = (index) => {
    setPositions(positions.filter((_, i) => i !== index))
  }

  const totalValue = positions.reduce((acc, pos) => acc + pos.priceUsd * pos.quantity, 0)

  async function handleCreatePortfolio() {
    try {
      let displayPicture = null

      // 1) If user uploaded a file, upload to Supabase Storage
      if (file) {
        const publicUrl = await uploadFileToSupabase(file, userId)
        displayPicture = publicUrl
      } else {
        // 2) If no file, generate a random SVG mesh
        displayPicture = generateRandomMeshSVG()
      }

      // 3) Build request body
      const body = {
        name,
        creator: userId,
        owner: userId,
        description,
        displaypicture: displayPicture, 
        positions,
        visibility
      }

      // 4) Insert portfolio
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const result = await response.json()
      if (!response.ok) {
        console.error('Create Portfolio Error Response:', result)
        alert('Error creating portfolio: ' + (result.error || 'Unknown error'))
        return
      }

      console.log('✅ Created portfolio + positions:', result.portfolio)
      onPortfolioCreated()
      onClose()
    } catch (err) {
      console.error('❌ Create Portfolio Catch Error:', err)
      alert('Error creating portfolio. Check console.')
    }
  }

  // Filter coins
  const filteredCoins = availableCoins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1c1f24] p-8 rounded-xl shadow-2xl w-[520px] relative text-white">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold 
                ${step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              1
            </div>
            <div className="w-16 h-1 bg-gray-600 mx-2" />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold 
                ${step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              2
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {step === 1 && (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Portfolio Info</h2>

            {/* Portfolio Name */}
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. My Crypto Portfolio"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* File Upload for Display Picture */}
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-1">Upload Display Picture</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-200
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700
                  cursor-pointer
                "
                onChange={(e) => setFile(e.target.files[0] || null)}
              />
              <p className="text-xs text-gray-500 mt-1">
                If you don&apos;t upload a file, a random mesh gradient will be used.
              </p>
            </div>

            {/* Visibility */}
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-1">Visibility</label>
              <select
                className="w-full p-3 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm text-gray-300 mb-1">Description</label>
              <textarea
                className="w-full p-3 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Short description about this portfolio..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                className="px-5 py-2 rounded bg-gray-600 hover:bg-gray-700 transition text-white"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Initial Holdings</h2>
            <p className="text-sm text-gray-400 mb-4">
              Search for a coin, enter a quantity, and add it to your portfolio.
            </p>

            {/* Add Position Form */}
            <form onSubmit={handleAddPosition} className="mb-5 flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="e.g. BTC"
                  className="w-full p-3 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setSelectedCoin(null)
                  }}
                />
                {searchTerm && filteredCoins.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white rounded shadow-lg mt-1 max-h-60 overflow-y-auto text-black z-10">
                    {filteredCoins.slice(0, 10).map((coin) => (
                      <div
                        key={coin.id}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer border-b border-gray-200 last:border-b-0"
                        onClick={() => {
                          setSelectedCoin(coin)
                          setSearchTerm(`${coin.name} (${coin.symbol})`)
                        }}
                      >
                        <img
                          src={getCoinIconUrl(coin.symbol)}
                          onError={(e) => {
                            e.currentTarget.src = '/default-coin.png'
                          }}
                          alt={coin.symbol}
                          className="w-5 h-5 mr-2"
                        />
                        <span className="font-medium text-gray-700">
                          {coin.name} ({coin.symbol.toUpperCase()})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="number"
                placeholder="Qty"
                className="w-24 p-3 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.0001"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button
                type="submit"
                className="px-5 py-3 bg-green-600 rounded hover:bg-green-700 transition text-white font-medium"
              >
                Add
              </button>
            </form>

            {/* Positions Table */}
            {positions.length > 0 ? (
              <div className="mb-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-600 text-left text-gray-300">
                    <tr>
                      <th className="py-2">Coin</th>
                      <th className="py-2">Qty</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Total</th>
                      <th className="py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos, idx) => (
                      <tr key={idx} className="border-b border-gray-700 last:border-b-0">
                        <td className="py-2">{pos.ticker}</td>
                        <td className="py-2">{pos.quantity}</td>
                        <td className="py-2">${pos.priceUsd.toFixed(2)}</td>
                        <td className="py-2">
                          ${(pos.priceUsd * pos.quantity).toFixed(2)}
                        </td>
                        <td className="py-2 text-right">
                          <button
                            onClick={() => removePosition(idx)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-400 mb-4">
                No positions added yet.
              </p>
            )}

            {/* Estimated Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-400">Estimated total:</span>
              <span className="text-xl font-bold text-white">
                ${totalValue.toFixed(2)}
              </span>
            </div>

            {/* Final Buttons */}
            <div className="flex justify-between">
              <button
                className="px-5 py-2 rounded bg-gray-600 hover:bg-gray-700 transition text-white"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white"
                onClick={handleCreatePortfolio}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
