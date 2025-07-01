import Image from "next/image"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Page Header */}
      <div className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">دوراتنا التدريبية</h1>
          <p className="max-w-2xl mx-auto">
            اختر من مجموعة واسعة من دورات القيادة المهنية المصممة لتلبية احتياجاتك المحددة
          </p>
        </div>
      </div>

      {/* Course Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="car" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="car">سيارة</TabsTrigger>
              <TabsTrigger value="motorcycle">دراجة نارية</TabsTrigger>
              <TabsTrigger value="truck">شاحنة</TabsTrigger>
              <TabsTrigger value="special">خاص</TabsTrigger>
            </TabsList>

            <TabsContent value="car" className="space-y-8" dir="rtl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card dir="rtl">
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">رخصة السيارة الأساسية</h3>
                    <p className="text-sm text-gray-500">للمبتدئين بدون خبرة سابقة</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">١٥ ساعة من التدريب النظري</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">٢٠ ساعة من القيادة العملية</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">جلسات التحضير للامتحان</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">مواد الدراسة مشمولة</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-2xl font-bold">٥٩٩ ريال</p>
                      <p className="text-sm text-gray-500">حزمة شاملة</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link className="w-full" href={'/nafaz'}>
                    <Button className="w-full bg-green-700">
                      سجل الآن <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">رخصة السيارة القياسية</h3>
                    <p className="text-sm text-gray-500">الحزمة الأكثر شعبية</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">٢٠ ساعة من التدريب النظري</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">٣٠ ساعة من القيادة العملية</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">تدريب المناورات المتقدمة</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">اختبارات تجريبية والتحضير للامتحان</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-2xl font-bold">٧٩٩ ريال</p>
                      <p className="text-sm text-gray-500">حزمة شاملة</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={'/nafaz'} className="w-full">

                      <Button className="w-full bg-green-700" >
                        سجل الآن <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>

                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">رخصة السيارة المميزة</h3>
                    <p className="text-sm text-gray-500">تجربة تدريبية شاملة</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">٢٥ ساعة من التدريب النظري</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">٤٠ ساعة من القيادة العملية</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">تدريب القيادة الليلية والطرق السريعة</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">تقنيات القيادة الدفاعية</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-2xl font-bold">٩٩٩ ريال</p>
                      <p className="text-sm text-gray-500">حزمة شاملة</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={'/nafaz'} className="w-full">

                      <Button className="w-full bg-green-700" >
                        سجل الآن <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>

                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="motorcycle" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card dir="rtl">
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">رخصة الدراجة النارية الأساسية</h3>
                    <p className="text-sm text-gray-500">للمبتدئين بدون خبرة سابقة</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">١٥ ساعة من التدريب النظري</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">١٥ ساعة من القيادة العملية</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">تدريب معدات السلامة</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">معرفة الصيانة الأساسية</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-2xl font-bold">٤٩٩ ريال</p>
                      <p className="text-sm text-gray-500">حزمة شاملة</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={'/nafaz'} className="w-full">

                      <Button className="w-full bg-green-700" >
                        سجل الآن <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="truck" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card dir="rtl">
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">رخصة الشاحنة التجارية</h3>
                    <p className="text-sm text-gray-500">تدريب رخصة القيادة التجارية المهنية</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">٤٠ ساعة من التدريب النظري</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">٦٠ ساعة من القيادة العملية</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">تدريب اللوجستيات واللوائح</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">إجراءات السلامة والصيانة</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-2xl font-bold">١٩٩٩ ريال</p>
                      <p className="text-sm text-gray-500">شهادة مهنية</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={'/nafaz'} className="w-full">

                      <Button className="w-full bg-green-700" >
                        سجل الآن <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>

                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="special" className="space-y-8" dir="rtl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card >
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">دورة القيادة الدفاعية</h3>
                    <p className="text-sm text-gray-500">عزز مهارات السلامة لديك</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">١٠ ساعات من التدريب المتخصص</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">تقنيات إدراك المخاطر</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">تدريب الاستجابة للطوارئ</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">شهادة عند الإنجاز</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-2xl font-bold">٢٩٩ ريال</p>
                      <p className="text-sm text-gray-500">تدريب متخصص</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={'/nafaz'} className="w-full">

                      <Button className="w-full bg-green-700" >
                        سجل الآن <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>

                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">دورة تنشيطية</h3>
                    <p className="text-sm text-gray-500">للسائقين المرخصين</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">٥ ساعات من تنشيط النظريات</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">١٠ ساعات من القيادة العملية</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">تحديث قوانين المرور الجديدة</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">جلسات بناء الثقة</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-2xl font-bold">٣٤٩ ريال</p>
                      <p className="text-sm text-gray-500">تعزيز المهارات</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={'/nafaz'} className="w-full">

                      <Button className="w-full bg-green-700" >
                        سجل الآن <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>

                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
