"use client"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
}

export function OtpInput({ value, onChange, maxLength = 6 }: OtpInputProps) {
  return (
    <InputOTP maxLength={maxLength} value={value} onChange={onChange} containerClassName="justify-center">
      <InputOTPGroup>
        {[...Array(maxLength)].map((_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
