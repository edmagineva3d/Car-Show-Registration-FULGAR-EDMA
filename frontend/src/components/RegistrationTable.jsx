import React from 'react'
import StatusBadge from './StatusBadge'
import PaymentBadge from './PaymentBadge'
import { formatCurrency, formatDate } from '../utils/formatters'
import { Car, Phone, Mail, MapPin, Sparkles, Tag } from 'lucide-react'

export function RegistrationTable({ 
  registrations = [], 
  onSelectRegistration 
}) {
  const getTypeBadge = (type) => {
    const t = (type || '').toLowerCase()
    if (t === 'vip') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-space font-bold bg-[#FFB7CF] text-[#1C1C1E] border border-[#1C1C1E] retro-shadow-sm">
          <Sparkles className="w-3 h-3 text-[#1C1C1E]" />
          VIP PASS
        </span>
      )
    }
    if (t === 'competitor') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-space font-bold bg-[#FFF3B0] text-[#1C1C1E] border border-[#1C1C1E]">
          <Tag className="w-3 h-3 text-[#1C1C1E]" />
          COMPETITOR
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-space font-semibold bg-[#E8F4F1] text-[#1C1C1E] border border-[#1C1C1E]/60">
        EXHIBITOR
      </span>
    )
  }

  return (
    <div className="bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl retro-shadow overflow-hidden">
      {/* Mobile scroll hint */}
      <div className="sm:hidden px-4 py-2 bg-[#FFF8D6] border-b border-[#1C1C1E]/20 text-[11px] font-space text-[#5E6368] flex items-center justify-between">
        <span>← Swipe horizontally to view full table →</span>
        <span className="font-bold text-[#1C1C1E]">{registrations.length} items</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#F3ECE0] border-b-2 border-[#1C1C1E] font-space text-xs uppercase tracking-wider text-[#1C1C1E]">
              <th className="py-3.5 px-4 font-bold">Reg. No.</th>
              <th className="py-3.5 px-4 font-bold">Date</th>
              <th className="py-3.5 px-4 font-bold">Participant</th>
              <th className="py-3.5 px-4 font-bold">Car</th>
              <th className="py-3.5 px-4 font-bold">Type</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Fee / Paid</th>
              <th className="py-3.5 px-4 font-bold text-center">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1C1E]/10 font-dm text-sm">
            {registrations.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onSelectRegistration && onSelectRegistration(item)}
                className="hover:bg-[#FFFDF9] transition-colors cursor-pointer group"
              >
                {/* 1. Registration No. */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="font-space font-bold text-[#1C1C1E] bg-[#FFF8D6] px-2 py-1 rounded border border-[#1C1C1E] retro-shadow-sm text-xs">
                    {item.registrationNumber}
                  </span>
                </td>

                {/* 2. Date */}
                <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#5E6368]">
                  {formatDate(item.registrationDate)}
                </td>

                {/* 3. Participant */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#1C1C1E] group-hover:text-black">
                    {item.participantName}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5E6368] mt-0.5">
                    {item.contactNumber && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#1C1C1E]/50" />
                        {item.contactNumber}
                      </span>
                    )}
                    {item.email && (
                      <span className="inline-flex items-center gap-1 truncate max-w-[140px]">
                        <Mail className="w-3 h-3 text-[#1C1C1E]/50" />
                        {item.email}
                      </span>
                    )}
                  </div>
                </td>

                {/* 4. Car */}
                <td className="py-3.5 px-4">
                  <div className="font-medium text-[#1C1C1E] flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-[#1C1C1E]/60 flex-shrink-0" />
                    <span className="truncate max-w-[200px]">{item.carMakeModel}</span>
                  </div>
                  <div className="mt-0.5">
                    <span className="inline-block text-[11px] font-mono tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#1C1C1E]/50 font-bold text-[#1C1C1E]">
                      {item.plateNumber}
                    </span>
                  </div>
                </td>

                {/* 5. Type */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {getTypeBadge(item.registrationType)}
                </td>

                {/* 6. Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={item.status} />
                </td>

                {/* 7. Fee / Paid */}
                <td className="py-3.5 px-4 whitespace-nowrap text-right">
                  <div className="font-mono text-sm font-semibold text-[#1C1C1E]">
                    {formatCurrency(item.registrationFee)}
                  </div>
                  <div className="text-xs text-[#5E6368] font-mono">
                    / {formatCurrency(item.amountPaid)}
                  </div>
                </td>

                {/* 8. Payment Status Badge */}
                <td className="py-3.5 px-4 whitespace-nowrap text-center">
                  <PaymentBadge paymentStatus={item.paymentStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RegistrationTable
