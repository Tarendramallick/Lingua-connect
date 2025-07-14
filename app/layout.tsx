import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LinguaConnect',
  description: 'Created by Tarendra Mallick',
  generator: 'https://tarendra-mallick.vercel.app/',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
