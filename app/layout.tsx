import type { Metadata } from 'next'
import './globals.css'
import { ToastContainer } from 'react-toastify';
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Learn to Speak Time in English',
  description: 'Interactive web app to help you learn how to tell time in English. Practice reading analog and digital clocks with real-time feedback.',
  generator: 'V0.0.1',
  keywords: ['english time', 'tell time', 'learn english', 'clock reading', 'time speaking', 'english practice'],
  authors: [{ name: 'Time Speaking App' }],
  openGraph: {
    title: 'Learn to Speak Time in English',
    description: 'Interactive web app to help you learn how to tell time in English',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn to Speak Time in English',
    description: 'Interactive web app to help you learn how to tell time in English',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <ToastContainer limit={1} />
        <Script id="handle-body-attributes" strategy="afterInteractive">
          {`
            // Clean up any browser extension attributes
            document.body.removeAttribute('data-new-gr-c-s-check-loaded');
            document.body.removeAttribute('data-gr-ext-installed');
          `}
        </Script>
      </body>
    </html>
  )
}
