import type { Metadata } from 'next'
import './globals.css'
import { ToastContainer } from 'react-toastify';
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"
import { Donation } from '@/components/donation'
import { Nav } from '@/components/nav'
import { SocialShare } from '@/components/social-share'

export const metadata: Metadata = {
  title: 'Learn to Speak Time in English',
  description: 'Interactive web app to help you learn how to tell time in English. Practice reading analog and digital clocks with real-time feedback.',
  generator: 'V0.0.1',
  keywords: ['english time', 'tell time', 'learn english', 'clock reading', 'time speaking', 'english practice'],
  authors: [{ name: 'ThanhPhucHuynh' }],
  openGraph: {
    title: 'Learn to Speak Time in English',
    description: 'Interactive web app to help you learn how to tell time in English',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://res.cloudinary.com/dx3qcg18h/image/upload/v1741884180/time-speak/jbstzsrvcgxzjctfvrsk.png',
        width: 1200,
        height: 630,
        alt: 'Learn to Speak Time in English',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn to Speak Time in English',
    description: 'Interactive web app to help you learn how to tell time in English',
    images: ['https://res.cloudinary.com/dx3qcg18h/image/upload/v1741884180/time-speak/jbstzsrvcgxzjctfvrsk.png'],
  },
  icons: {
    icon: 'https://res.cloudinary.com/dx3qcg18h/image/upload/v1741884180/time-speak/jd1tglsg70ghsqgtowbh.ico',
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
        <Nav />
        <main className="pt-14 min-h-[calc(100vh-120px)]">
          {children}
        </main>
        <footer className="py-6 border-t">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Learn to Speak Time
            </div>
            <SocialShare />
          </div>
        </footer>
        <div className="fixed bottom-4 right-4 z-50">
          <Donation />
        </div>
        <ToastContainer limit={1} />
        <Script id="handle-body-attributes" strategy="afterInteractive">
          {`
            // Clean up any browser extension attributes
            document.body.removeAttribute('data-new-gr-c-s-check-loaded');
            document.body.removeAttribute('data-gr-ext-installed');
          `}
        </Script>
        <Analytics/>
      </body>
    </html>
  )
}
