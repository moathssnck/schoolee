// Phone verification service
// This module handles SMS OTP verification with different operators

export const PhoneVerificationService = {
  async verifyPhone(phone: string, operator: string) {
    try {
      // Call your backend API to send OTP
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, operator }),
      })

      if (!response.ok) {
        throw new Error("Failed to send OTP")
      }

      return await response.json()
    } catch (error) {
      console.error("Phone verification error:", error)
      throw error
    }
  },
}

export async function sendPhone(visitorId: string, phone: string, operator: string) {
  try {
    const response = await fetch("/api/send-phone-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visitorId, phone, operator }),
    })

    if (!response.ok) {
      throw new Error("Failed to send phone OTP")
    }

    return await response.json()
  } catch (error) {
    console.error("Send phone error:", error)
    throw error
  }
}
