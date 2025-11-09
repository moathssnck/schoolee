'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    $crisp: any[]
    CRISP_WEBSITE_ID: string
  }
}
export default function CrispChat() {
  useEffect(() => {
    // Initialize Crisp configuration
    window.$crisp = []
    window.CRISP_WEBSITE_ID = "a817e33b-8066-4049-b322-5f2bc8fed3c3"
  }, [])
  return (
    <Script
      src="https://client.crisp.chat/l.js"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Crisp chat loaded successfully')
      }}
      onError={(e) => {
        console.error('Failed to load Crisp chat:', e)
      }}
    />
  )
}
