import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { SiteDataProvider } from '@/lib/dataContext'
import getData from '@/utils/getData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Blanka next js theme'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteDataPromise = getData()
  return (
    <SiteDataProvider siteDataPromise={siteDataPromise}>
      <Header />
      <main>{children}</main>
      <Footer />
    </SiteDataProvider>
  )
}
