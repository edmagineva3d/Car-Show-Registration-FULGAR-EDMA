import React from 'react'
import { Clock, CheckCircle2, Car, XCircle } from 'lucide-react'

export function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase()

  let style = {
    bg: 'bg-[#FFF3B0]',
    border: 'border-[#1C1C1E]',
    text: 'text-[#1C1C1E]',
    dot: 'bg-[#EAB308]',
    icon: Clock,
    label: status || 'Pending'
  }

  if (normalized === 'confirmed') {
    style = {
      bg: 'bg-[#C7E7E3]',
      border: 'border-[#1C1C1E]',
      text: 'text-[#1C1C1E]',
      dot: 'bg-[#0D9488]',
      icon: CheckCircle2,
      label: 'Confirmed'
    }
  } else if (normalized === 'checkedin') {
    style = {
      bg: 'bg-[#D1F2D9]',
      border: 'border-[#1C1C1E]',
      text: 'text-[#1C1C1E]',
      dot: 'bg-[#16A34A]',
      icon: Car,
      label: 'Checked In'
    }
  } else if (normalized === 'cancelled') {
    style = {
      bg: 'bg-[#E5E7EB]',
      border: 'border-[#1C1C1E]',
      text: 'text-[#4B5563]',
      dot: 'bg-[#9CA3AF]',
      icon: XCircle,
      label: 'Cancelled'
    }
  }

  const Icon = style.icon

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-space font-semibold border ${style.border} ${style.bg} ${style.text} retro-shadow-sm select-none`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
      <span>{style.label}</span>
    </span>
  )
}

export default StatusBadge
