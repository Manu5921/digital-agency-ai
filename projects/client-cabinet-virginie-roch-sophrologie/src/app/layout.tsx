import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Digital Agency AI - Template de Base',
  description: 'Template de base pour projets Digital Agency AI - Next.js 15 + TypeScript + Tailwind CSS',
  metadataBase: new URL('https://digital-agency-ai.vercel.app'),
  keywords: ['Digital Agency', 'AI', 'Next.js', 'TypeScript', 'Template'],
  authors: [{ name: 'Digital Agency AI' }],
  creator: 'Digital Agency AI',
  publisher: 'Digital Agency AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://digital-agency-ai.vercel.app',
    title: 'Digital Agency AI - Template de Base',
    description: 'Template de base pour projets Digital Agency AI',
    siteName: 'Digital Agency AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Agency AI - Template de Base',
    description: 'Template de base pour projets Digital Agency AI',
    creator: '@digitalagency_ai',
  },
  verification: {
    google: 'verification-code-here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}