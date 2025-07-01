import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* Page Header */}
      <div className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">تواصل معنا</h1>
          <p className="max-w-2xl mx-auto">
            هل لديك أسئلة أو تحتاج إلى مزيد من المعلومات؟ نحن هنا لمساعدتك في جميع احتياجات التدريب على القيادة.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-6">تواصل معنا</h2>
              <Card className="p-6">
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" placeholder="أدخل اسمك الكامل" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">عنوان البريد الإلكتروني</Label>
                    <Input id="email" type="email" placeholder="أدخل عنوان بريدك الإلكتروني" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" placeholder="أدخل رقم هاتفك" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input id="subject" placeholder="ما هو موضوع رسالتك؟" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea id="message" placeholder="أدخل رسالتك" rows={5} />
                  </div>
                  <Button className="w-full">إرسال الرسالة</Button>
                </form>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">معلومات الاتصال</h2>
              <div className="space-y-6">
                <Card className="p-6 flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">موقعنا</h3>
                    <p className="text-gray-600">شارع مدرسة القيادة ١٢٣</p>
                    <p className="text-gray-600">وسط المدينة، ١٢٣٤٥</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">أرقام الهاتف</h3>
                    <p className="text-gray-600">المكتب الرئيسي: ٠١١-١٢٣-٤٥٦٧</p>
                    <p className="text-gray-600">خدمة العملاء: ٠١١-٩٨٧-٦٥٤٣</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">عناوين البريد الإلكتروني</h3>
                    <p className="text-gray-600">الاستفسارات العامة: info@drivingschool.com</p>
                    <p className="text-gray-600">الدعم: support@drivingschool.com</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">ساعات العمل</h3>
                    <p className="text-gray-600">الاثنين - الجمعة: ٨:٠٠ ص - ٨:٠٠ م</p>
                    <p className="text-gray-600">السبت: ٩:٠٠ ص - ٥:٠٠ م</p>
                    <p className="text-gray-600">الأحد: مغلق</p>
                  </div>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">اعثر علينا على الخريطة</h3>
                <div className="h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="موقع الخريطة"
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
