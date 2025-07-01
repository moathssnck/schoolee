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
    window.CRISP_WEBSITE_ID = "6df945dd-5dfd-4be7-aef7-042a71dfee0a"
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
