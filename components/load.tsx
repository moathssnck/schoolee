"use client"
import React from "react"
export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-green-500"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-white animate-spin"></div>
        </div>

      </div>
    </div>
  )
}
