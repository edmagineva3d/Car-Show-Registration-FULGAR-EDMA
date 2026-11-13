import React from 'react'
import { Loader2, Car } from 'lucide-react'

export function LoadingState({ message = "Loading registrations..." }) {
  return (
    <div className="bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl p-8 retro-shadow text-center space-y-4">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFF3B0] border-2 border-[#1C1C1E] retro-shadow-sm animate-bounce">
        <Car className="w-7 h-7 text-[#1C1C1E]" />
      </div>

      <div className="flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 text-[#1C1C1E] animate-spin" />
        <h3 className="font-space font-bold text-lg text-[#1C1C1E]">
          {message}
        </h3>
      </div>
      
      <p className="font-dm text-sm text-[#5E6368] max-w-md mx-auto">
        Retrieving attendee entries and vehicle passes for Car Show 2027...
      </p>

      {/* Skeleton Rows Preview */}
      <div className="pt-4 space-y-2.5 max-w-2xl mx-auto">
        <div className="h-10 skeleton-box rounded-xl border border-[#1C1C1E]/20" />
        <div className="h-10 skeleton-box rounded-xl border border-[#1C1C1E]/20" />
        <div className="h-10 skeleton-box rounded-xl border border-[#1C1C1E]/20" />
      </div>
    </div>
  )
}

export default LoadingState
