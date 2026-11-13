import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({
  page = 1,
  pageSize = 10,
  totalCount = 0,
  totalPages = 1,
  onPageChange,
  onPageSizeChange,
  loading = false
}) {
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      let start = Math.max(1, page - 2)
      let end = Math.min(totalPages, start + maxVisible - 1)

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl p-4 retro-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* 1. Showing x–y of N summary */}
      <div className="font-space text-xs sm:text-sm font-semibold text-[#1C1C1E] flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#1C1C1E]" />
        <span>
          Showing <span className="font-bold underline decoration-[#FFB7CF] decoration-2">{from}–{to}</span> of{' '}
          <span className="font-bold">{totalCount}</span> registrations
        </span>
      </div>

      {/* 2. Controls: Previous, Page Numbers, Next */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {/* Prev Button */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1 || loading}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-[#1C1C1E] font-space text-xs font-bold transition-all ${
            page <= 1 || loading
              ? 'opacity-40 cursor-not-allowed bg-[#EFE9DF]'
              : 'bg-white retro-shadow-sm hover:bg-[#FFF3B0] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
          }`}
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Number Buttons */}
        {pageNumbers.map((p) => {
          const isActive = p === page
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              disabled={loading}
              className={`w-8 h-8 rounded-xl border-2 border-[#1C1C1E] font-space text-xs font-bold transition-all flex items-center justify-center ${
                isActive
                  ? 'bg-[#FFB7CF] text-[#1C1C1E] retro-shadow-sm scale-105'
                  : 'bg-white text-[#1C1C1E] hover:bg-[#FFF3B0] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
              } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {p}
            </button>
          )
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || loading}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-[#1C1C1E] font-space text-xs font-bold transition-all ${
            page >= totalPages || loading
              ? 'opacity-40 cursor-not-allowed bg-[#EFE9DF]'
              : 'bg-white retro-shadow-sm hover:bg-[#FFF3B0] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
          }`}
          title="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Page Size Selector (5, 10, 20) */}
      <div className="flex items-center gap-2">
        <label htmlFor="page-size-select" className="font-space text-xs font-bold text-[#5E6368] uppercase">
          Per page:
        </label>
        <div className="relative">
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            disabled={loading}
            className="appearance-none pl-3 pr-7 py-1.5 bg-white border-2 border-[#1C1C1E] rounded-xl font-space text-xs font-bold text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-xs text-[#1C1C1E]">
            ▾
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
