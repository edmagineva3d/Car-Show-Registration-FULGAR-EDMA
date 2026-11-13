import React from 'react'
import { SearchX, RotateCcw, Sparkles } from 'lucide-react'

export function EmptyState({ onClearFilters }) {
  return (
    <div className="bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl p-10 retro-shadow text-center relative overflow-hidden">
      {/* Decorative corner stars */}
      <div className="absolute top-3 left-4 text-[#1C1C1E]/20 select-none">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute top-3 right-4 text-[#1C1C1E]/20 select-none">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFB7CF] border-2 border-[#1C1C1E] retro-shadow-sm mb-4 -rotate-3">
        <SearchX className="w-8 h-8 text-[#1C1C1E]" strokeWidth={2.2} />
      </div>

      <h3 className="font-archivo text-xl sm:text-2xl text-[#1C1C1E] mb-2 tracking-tight">
        No registrations match your filters.
      </h3>

      <p className="font-dm text-sm text-[#5E6368] max-w-md mx-auto mb-6">
        We couldn't find any participant or vehicle matching your current search parameters. Try adjusting your search query, or clear your filters to view all entries.
      </p>

      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-space text-xs font-bold uppercase tracking-wider bg-[#FFF3B0] text-[#1C1C1E] border-2 border-[#1C1C1E] retro-shadow hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1C1C1E] active:translate-y-0 active:shadow-[1px_1px_0px_#1C1C1E] transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#1C1C1E]" />
          Clear Filters
        </button>
      )}
    </div>
  )
}

export default EmptyState
