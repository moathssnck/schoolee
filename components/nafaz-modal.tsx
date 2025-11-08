"use client"

// Nafaz Modal component placeholder
interface NafazModalProps {
  isOpen: boolean
  onClose: () => void
  phone?: string
  auth_number?: string
}

export default function NafazModal({ isOpen, onClose, phone, auth_number }: NafazModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Nafaz Verification</h2>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Phone Number:</p>
            <p className="text-gray-900">{phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Auth Number:</p>
            <p className="text-gray-900">{auth_number || "N/A"}</p>
          </div>
        </div>
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
