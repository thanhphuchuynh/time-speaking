import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Learn to Speak Time in English',
  description: 'Learn to Speak Time in English',
  generator: 'V0.0.1',
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
