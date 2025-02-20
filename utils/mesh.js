/**
 * Generates a random SVG mesh gradient and returns it as a Base64 data URL.
 * This provides a visually appealing fallback image if the user doesn't upload one.
 */
export function generateRandomMeshSVG() {
    const colors = Array.from({ length: 3 }, () => {
      const r = 100 + Math.floor(Math.random() * 156)
      const g = 100 + Math.floor(Math.random() * 156)
      const b = 100 + Math.floor(Math.random() * 156)
      return `rgb(${r},${g},${b})`
    })
  
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#grad)" />
      </svg>
    `
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }
  