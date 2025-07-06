"use client"

import { motion, AnimatePresence } from "framer-motion"
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
        .padEnd(16, "#")
        .match(/.{1,4}/g) || []
    return parts.join(" ")
  }

  return (
    <div className="w-full h-56 perspective-1000">
      <AnimatePresence initial={false}>
        <motion.div
          key={isFlipped ? "back" : "front"}
          className="relative w-full h-full"
          initial={{ rotateY: isFlipped ? -180 : 0 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          exit={{ rotateY: isFlipped ? 180 : -180 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Front */}
          <div
            className="absolute w-full h-full backface-hidden rounded-xl p-6 flex flex-col justify-between bg-teal-500 text-white shadow-lg overflow-hidden"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-teal-400/50"></div>
            <div className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full bg-teal-400/30"></div>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-12 h-8 bg-yellow-400/80 rounded-md grid grid-cols-3 grid-rows-2 gap-px p-1">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="bg-yellow-500/80 rounded-sm"></div>
                    ))}
                </div>
                <Wifi className="w-6 h-6 -rotate-90" />
              </div>
              <div className="text-right">
                <Landmark className="w-8 h-8 text-yellow-300" />
                <p className="text-xs font-semibold">YOUR BANK</p>
              </div>
            </div>
            <div className="font-mono text-2xl tracking-widest text-center">{formatNumber(number)}</div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs uppercase">Card Holder Name</p>
                <p className="font-medium tracking-wider">{name || "FULL NAME"}</p>
              </div>
              <div>
                <p className="text-xs uppercase">Expires End</p>
                <p className="font-medium tracking-wider">
                  {expiryMonth || "MM"}/{expiryYear || "YY"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">CREDIT CARD</p>
                <p className="text-xs">DEBIT</p>
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div className="absolute w-full h-full backface-hidden rounded-xl p-4 flex flex-col gap-4 bg-teal-500 text-white shadow-lg overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-teal-400/50"></div>
            <div className="absolute -bottom-12 -right-8 w-40 h-40 rounded-full bg-teal-400/30"></div>
            <div className="w-full h-12 bg-black/80 mt-4"></div>
            <div className="flex items-center gap-4 px-2">
              <div className="flex-grow h-10 bg-white/90 rounded-md"></div>
              <p className="font-mono text-lg tracking-widest">{cvv.padEnd(3, "#")}</p>
            </div>
            <div className="px-2 mt-auto">
              <p className="font-semibold text-sm">CREDIT CARD</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
