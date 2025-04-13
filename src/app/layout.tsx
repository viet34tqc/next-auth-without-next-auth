import Header from '@/components/layout/Header'
import ThemeProvider from '@/components/theme/ThemeProvider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next Auth without Next Auth',
  description: 'Authentication in NextJs without Next Auth',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Header />
          <main className='container py-6 min-h-screen'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
