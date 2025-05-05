'use client'

import { createContext, ReactNode, use, useContext, useEffect, useState } from 'react'

type SiteDataContextType = {
  siteData: SiteContentData | null | undefined | string
  // eslint-disable-next-line no-unused-vars
  setSiteData: (siteData: SiteContentData | null) => void
}

const SiteDataContext = createContext<SiteDataContextType | null>(null)

export function useSiteData(): SiteDataContextType {
  const context = useContext(SiteDataContext)
  if (context === null) {
    throw new Error('useSiteData must be used within a SiteDataProvider')
  }
  return context
}

export function SiteDataProvider({
  children,
  siteDataPromise
}: {
  children: ReactNode
  siteDataPromise: Promise<null | undefined | string>
}) {
  const initialData = use(siteDataPromise)
  const [siteData, setSiteData] = useState<SiteContentData | null | undefined>(
    JSON.parse(initialData || '')
  )

  useEffect(() => {
    setSiteData(JSON.parse(initialData || ''))
  }, [initialData])

  return (
    <SiteDataContext.Provider value={{ siteData, setSiteData }}>
      {children}
    </SiteDataContext.Provider>
  )
}
