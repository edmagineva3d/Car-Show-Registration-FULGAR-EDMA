import React, { useEffect, useState } from 'react'
import { X, Car, User, Mail, Phone, MapPin, Calendar, CreditCard, ShieldCheck, Sparkles, Tag } from 'lucide-react'
import StatusBadge from './StatusBadge'
import PaymentBadge from './PaymentBadge'
import { formatCurrency, formatDate } from '../utils/formatters'
import { getRegistrationById } from '../api/registrationsApi'

export function RegistrationDetailsModal({ registrationId, initialData, onClose }) {
  const [data, setData] = useState(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadDetails() {
      if (!registrationId) return
      try {
        setLoading(true)
        setError(null)
        const details = await getRegistrationById(registrationId)
        setData(details)
      } catch (err) {
        console.error('Failed to load registration details:', err)
        setError(err.message || 'Could not load registration details.')
      } finally {
        setLoading(false)
      }
    }

    if (registrationId && !initialData) {
      loadDetails()
    }
  }, [registrationId, initialData])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!registrationId) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-lg bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-3xl retro-shadow-lg overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="bg-[#1C1C1E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB7CF]" />
            <h3 id="modal-title" className="font-space font-bold text-xs uppercase tracking-wider text-[#FFF3B0]">
              Official Entry Pass
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[85vh] overflow-y-auto font-dm">
          {loading ? (
            <div className="py-12 text-center font-space text-sm text-[#5E6368]">
              Loading entry details...
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-600 font-space text-sm">
              {error}
            </div>
          ) : data ? (
            <>
              {/* Top Banner Ticket Code */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#1C1C1E]/30">
                <div>
                  <span className="font-space text-xs text-[#5E6368] uppercase font-bold block">
                    Registration No.
                  </span>
                  <span className="font-archivo text-xl text-[#1C1C1E]">
                    {data.registrationNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={data.status} />
                  <PaymentBadge paymentStatus={data.paymentStatus} />
                </div>
              </div>

              {/* Participant Info */}
              <div className="bg-white border-2 border-[#1C1C1E] rounded-2xl p-4 retro-shadow-sm space-y-2">
                <span className="font-space text-xs font-bold uppercase tracking-wider text-[#5E6368] block">
                  Participant Information
                </span>
                <div className="font-archivo text-lg text-[#1C1C1E]">
                  {data.participantName}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5E6368] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#1C1C1E]" />
                    <span>{data.contactNumber || 'No contact provided'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1C1C1E]" />
                    <span className="truncate">{data.email || 'No email provided'}</span>
                  </div>
                </div>
                {data.address && (
                  <div className="flex items-center gap-1.5 text-xs text-[#5E6368] pt-1 border-t border-gray-100">
                    <MapPin className="w-3.5 h-3.5 text-[#1C1C1E]" />
                    <span>{data.address}</span>
                  </div>
                )}
              </div>

              {/* Vehicle & Entry Details */}
              <div className="bg-[#FFFDF9] border-2 border-[#1C1C1E] rounded-2xl p-4 retro-shadow-sm space-y-3">
                <span className="font-space text-xs font-bold uppercase tracking-wider text-[#5E6368] block">
                  Vehicle &amp; Entry Category
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#FFF3B0] border border-[#1C1C1E] flex items-center justify-center">
                      <Car className="w-5 h-5 text-[#1C1C1E]" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1C1C1E] text-sm">
                        {data.carMakeModel}
                      </div>
                      <div className="text-xs text-[#5E6368]">
                        Plate No: <span className="font-mono font-bold text-[#1C1C1E]">{data.plateNumber}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-space font-bold bg-[#FFB7CF] border border-[#1C1C1E] text-[#1C1C1E]">
                    {data.registrationType}
                  </span>
                </div>
              </div>

              {/* Financials & Payment Breakdown */}
              <div className="bg-[#F4F9F8] border-2 border-[#1C1C1E] rounded-2xl p-4 retro-shadow-sm">
                <span className="font-space text-xs font-bold uppercase tracking-wider text-[#5E6368] block mb-2">
                  Financial Breakdown
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-xl border border-[#1C1C1E]/30">
                    <span className="block text-[10px] font-space text-[#5E6368] uppercase font-bold">Registration Fee</span>
                    <span className="font-mono font-bold text-sm text-[#1C1C1E]">{formatCurrency(data.registrationFee)}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#1C1C1E]/30">
                    <span className="block text-[10px] font-space text-[#5E6368] uppercase font-bold">Amount Paid</span>
                    <span className="font-mono font-bold text-sm text-[#16A34A]">{formatCurrency(data.amountPaid)}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#1C1C1E]/30">
                    <span className="block text-[10px] font-space text-[#5E6368] uppercase font-bold">Balance Due</span>
                    <span className="font-mono font-bold text-sm text-[#DC2626]">
                      {formatCurrency(Math.max(0, data.registrationFee - data.amountPaid))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center font-space text-[11px] text-[#5E6368]">
                Registered on: {formatDate(data.registrationDate)}
              </div>
            </>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F3ECE0] border-t-2 border-[#1C1C1E] px-6 py-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-space text-xs font-bold uppercase tracking-wider bg-white border-2 border-[#1C1C1E] retro-shadow-sm hover:bg-[#FFF3B0] transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegistrationDetailsModal
