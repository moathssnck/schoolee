"use client"

import { motion } from "framer-motion"
import { Wifi, Landmark } from "lucide-react"

interface CreditCardDisplayProps {
  isFlipped: boolean
  name: string
  number: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

export default function CreditCardDisplay({
  isFlipped,
  name,
  number,
  expiryMonth,
  expiryYear,
  cvv,
}: CreditCardDisplayProps) {
  const formatNumber = (num: string) => {
    const parts =
      num
        .replace(/\s/g, "")
        .padEnd(16, "•")
        .match(/.{1,4}/g) || []
    return parts.join(" ")
  }

  const cardVariant = {
    flipped: {
      rotateY: 180,
    },
    unflipped: {
      rotateY: 0,
    },
  }

  return (
    <div className="w-full h-56 [perspective:1000px]" style={{zoom:0.8}}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        variants={cardVariant}
        animate={isFlipped ? "flipped" : "unflipped"}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Card Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-green-800 to-emerald-900 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=224&width=384')] opacity-[0.03]"></div>

          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Landmark className="w-8 h-8 text-gray-300" />
              <span className="text-xl font-semibold tracking-wider"></span>
            </div>
            <div className="flex items-center gap-3">
              <Wifi className="w-7 h-7 text-gray-300" />
              <div className="w-14 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-md p-1 shadow-md">
                <div className="w-full h-full border-2 border-yellow-600/50 rounded-sm"></div>
              </div>
            </div>
          </div>

          <div className="font-mono text-2xl lg:text-3xl tracking-wider text-center text-gray-200" dir="ltr">
            {formatNumber(number)}
          </div>

          <div className="flex justify-between items-end">
           
            <div>
              <p className="text-xs uppercase text-gray-400">تاريخ الانتهاء</p>
              <p className="font-medium tracking-wider" dir="ltr">
                {expiryYear || "YY"}/{expiryMonth || "MM"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-400">اسم حامل البطاقة</p>
              <p className="font-medium tracking-wider">{name || "الاسم بالكامل هنا"}</p>
            </div>
          </div>
        </div>

        {/* Card Back */}
        <div
          className="absolute w-full h-full [backface-visibility:hidden] rounded-2xl p-4 flex flex-col gap-5 bg-gradient-to-br from-green-800 to-emerald-900 text-white shadow-2xl overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=224&width=384')] opacity-[0.03]"></div>
          <div className="w-full h-12 bg-black mt-4"></div>
          <div className="px-2">
            <p className="text-xs text-gray-400 text-left mb-1">CVV</p>
            <div className="h-10 bg-white rounded-md flex items-center justify-start px-4">
              <p className="font-mono text-lg tracking-widest text-black" dir="ltr">
                {cvv.padEnd(3, "•")}
              </p>
            </div>
          </div>
          <div className="px-2 mt-auto text-xs text-gray-500 text-justify">
            <p> استخدام هذه البطاقة يعني قبول الشروط والأحكام الواردة في اتفاقية حامل البطاقة.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
