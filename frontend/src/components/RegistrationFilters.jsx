import React from 'react'
import { Search, Filter, RotateCcw, X, Car, ShieldCheck } from 'lucide-react'

export function RegistrationFilters({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  onClearFilters
}) {
  const hasActiveFilters = Boolean(
    (searchTerm && searchTerm.trim() !== '') || 
    (typeFilter && typeFilter !== 'All') || 
    (statusFilter && statusFilter !== 'All')
  )

  return (
    <div className="bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl p-4 sm:p-5 retro-shadow space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* 1. Search by participant name */}
        <div className="relative flex-1">
          <label htmlFor="search-input" className="sr-only">
            Search participant name
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#1C1C1E]/60" />
          </div>
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search participant name..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border-2 border-[#1C1C1E] rounded-xl text-sm font-dm text-[#1C1C1E] placeholder-[#5E6368] focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] retro-shadow-sm transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5E6368] hover:text-[#1C1C1E]"
              title="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. Registration Type Filter */}
        <div className="w-full md:w-48">
          <label htmlFor="type-select" className="sr-only">
            Registration Type
          </label>
          <div className="relative">
            <select
              id="type-select"
              value={typeFilter}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-white border-2 border-[#1C1C1E] rounded-xl text-sm font-space font-semibold text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] retro-shadow-sm cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Exhibitor">Exhibitor</option>
              <option value="Competitor">Competitor</option>
              <option value="VIP">VIP</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="w-4 h-4 text-[#1C1C1E]/60" />
            </div>
          </div>
        </div>

        {/* 3. Status Filter */}
        <div className="w-full md:w-48">
          <label htmlFor="status-select" className="sr-only">
            Registration Status
          </label>
          <div className="relative">
            <select
              id="status-select"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-white border-2 border-[#1C1C1E] rounded-xl text-sm font-space font-semibold text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] retro-shadow-sm cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="CheckedIn">Checked In</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ShieldCheck className="w-4 h-4 text-[#1C1C1E]/60" />
            </div>
          </div>
        </div>

        {/* 4. Clear Filters Button */}
        <div>
          <button
            type="button"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-space text-xs font-bold uppercase tracking-wider border-2 border-[#1C1C1E] transition-all duration-150 ${
              hasActiveFilters
                ? 'bg-[#FFB7CF] text-[#1C1C1E] retro-shadow hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1C1C1E] active:translate-y-0 active:shadow-[1px_1px_0px_#1C1C1E] cursor-pointer'
                : 'bg-[#F0EAE1] text-[#9CA3AF] border-[#9CA3AF]/40 cursor-not-allowed'
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${hasActiveFilters ? 'text-[#1C1C1E]' : 'text-[#9CA3AF]'}`} />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Active filter summary pill indicator */}
      {hasActiveFilters && (
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-space text-[#5E6368]">
          <span className="font-semibold text-[#1C1C1E]">Active filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FFF3B0] border border-[#1C1C1E] rounded-full text-[#1C1C1E] font-medium">
              Search: "{searchTerm}"
              <button 
                type="button" 
                onClick={() => onSearchChange('')} 
                className="hover:text-red-600 ml-1 font-bold"
              >
                ×
              </button>
            </span>
          )}
          {typeFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#C7E7E3] border border-[#1C1C1E] rounded-full text-[#1C1C1E] font-medium">
              Type: {typeFilter}
              <button 
                type="button" 
                onClick={() => onTypeChange('All')} 
                className="hover:text-red-600 ml-1 font-bold"
              >
                ×
              </button>
            </span>
          )}
          {statusFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#D1F2D9] border border-[#1C1C1E] rounded-full text-[#1C1C1E] font-medium">
              Status: {statusFilter}
              <button 
                type="button" 
                onClick={() => onStatusChange('All')} 
                className="hover:text-red-600 ml-1 font-bold"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default RegistrationFilters
