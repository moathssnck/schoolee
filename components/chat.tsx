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
    window.CRISP_WEBSITE_ID = "b163ce23-59d2-42bd-95e1-36841b8f16e5"
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
