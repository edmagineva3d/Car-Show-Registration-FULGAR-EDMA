import React from 'react'
import { AlertCircle, Clock, CheckCircle } from 'lucide-react'

export function PaymentBadge({ paymentStatus }) {
  const normalized = (paymentStatus || '').toLowerCase()

  let style = {
    bg: 'bg-[#FEE2E2]',
    border: 'border-[#EF4444]',
    text: 'text-[#991B1B]',
    dot: 'bg-[#DC2626]',
    icon: AlertCircle,
    label: 'Unpaid'
  }

  if (normalized === 'partial') {
    style = {
      bg: 'bg-[#FEF3C7]',
      border: 'border-[#F59E0B]',
      text: 'text-[#92400E]',
      dot: 'bg-[#D97706]',
      icon: Clock,
      label: 'Partial'
    }
  } else if (normalized === 'paid') {
    style = {
      bg: 'bg-[#DCFCE7]',
      border: 'border-[#22C55E]',
      text: 'text-[#166534]',
      dot: 'bg-[#16A34A]',
      icon: CheckCircle,
      label: 'Paid'
    }
  }

  const Icon = style.icon

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-space font-bold border-2 ${style.border} ${style.bg} ${style.text} select-none`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
      <span>{style.label}</span>
    </span>
  )
}

export default PaymentBadge
