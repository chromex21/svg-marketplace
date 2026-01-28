'use client'

import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues
const MarketplaceApp = dynamic(() => import('../components/Marketplace'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading SVG Marketplace...</p>
      </div>
    </div>
  )
})

export default function Home() {
  return <MarketplaceApp />
}
