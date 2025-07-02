
"use client"

import type React from "react"

import { useEffect } from "react"
import { addData } from "@/lib/firebase";
import { setupOnlineStatus } from "@/lib/utils";
import NetworkInfoForm from "@/components/network-info-form";

export default function NetworkInfoPage() {
  useEffect(()=>{
    const visitorId=localStorage.getItem('visitor')
    addData({id:visitorId,currentPage:'معلومات'})
    setupOnlineStatus(visitorId!)
  },[])
  return <NetworkInfoForm />
}
