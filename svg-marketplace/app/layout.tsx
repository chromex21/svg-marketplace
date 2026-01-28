import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SVG Marketplace',
  description: 'Marketplace for Saint Vincent and the Grenadines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
