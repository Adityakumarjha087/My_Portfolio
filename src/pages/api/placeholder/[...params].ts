import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { params } = req.query;
  
  if (!params || !Array.isArray(params)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const [width, height] = params;
  const w = parseInt(width) || 300;
  const h = parseInt(height) || 300;

  // Generate SVG placeholder
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#999" text-anchor="middle" dy=".3em">
        ${w}×${h}
      </text>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.status(200).send(svg);
}
