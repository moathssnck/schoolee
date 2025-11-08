"use client"

// STC Modal component placeholder
interface STCModalProps {
  isOpen: boolean
  onClose: () => void
}

export function STCModal({ isOpen, onClose }: STCModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">STC Verification</h2>
        <p className="text-gray-600 mb-6">Please follow the instructions sent to your STC number.</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
