import React from 'react'

export function KpiCard({
  title,
  value,
  icon: Icon,
  supportingLabel,
  badgeText,
  badgeBg = 'bg-[#FFF3B0]',
  iconBg = 'bg-[#C7E7E3]',
  loading = false
}) {
  return (
    <div className="relative bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl p-5 retro-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1C1C1E] transition-all duration-200 flex flex-col justify-between group overflow-hidden">
      {/* Decorative top-right metallic pin / star */}
      <div className="absolute top-2 right-2 text-[#1C1C1E]/20 group-hover:text-[#1C1C1E]/60 transition-colors pointer-events-none select-none">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
        </svg>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-space text-xs font-bold tracking-wider uppercase text-[#5E6368]">
            {title}
          </span>
          {Icon && (
            <div className={`w-9 h-9 rounded-xl border border-[#1C1C1E] ${iconBg} flex items-center justify-center retro-shadow-sm`}>
              <Icon className="w-5 h-5 text-[#1C1C1E]" strokeWidth={2.2} />
            </div>
          )}
        </div>

        {loading ? (
          <div className="h-9 w-28 skeleton-box rounded-lg mb-2" />
        ) : (
          <div className="font-archivo text-2xl sm:text-3xl text-[#1C1C1E] tracking-tight leading-none mb-1">
            {value}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#1C1C1E]/10">
        <span className="font-dm text-xs text-[#5E6368] truncate max-w-[70%]">
          {supportingLabel}
        </span>
        {badgeText && (
          <span className={`inline-block font-space text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-[#1C1C1E] ${badgeBg} text-[#1C1C1E] select-none`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  )
}

export default KpiCard
