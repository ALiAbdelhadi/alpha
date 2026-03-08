"use client"

import { useLocale } from "next-intl"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "01016234315"

export function WhatsAppFloat() {
  const locale = useLocale()


  const href = `https://wa.me/${WHATSAPP_NUMBER}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg hover:bg-green-600 transition-colors"
      aria-label={locale === "ar" ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="font-medium text-sm hidden sm:block">
        {locale === "ar" ? "واتساب" : "WhatsApp"}
      </span>
    </a>
  )
}

