import type { Metadata } from 'next'
import { AuthProvider } from '@/components/auth/AuthProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'SVG Marketplace - Buy and Sell in Saint Vincent and the Grenadines',
  description: 'Local marketplace for Saint Vincent and the Grenadines. Buy and sell phones, electronics, vehicles, furniture and more.',
  keywords: 'SVG, Saint Vincent, marketplace, buy sell, local, classifieds',
  openGraph: {
    title: 'SVG Marketplace',
    description: 'Buy and Sell locally in Saint Vincent and the Grenadines',
    type: 'website',
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
