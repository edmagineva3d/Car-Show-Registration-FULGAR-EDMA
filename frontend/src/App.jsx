import React, { useState, useEffect } from 'react'
import KpiCards from './components/KpiCards'
import RegistrationTable from './components/RegistrationTable'
import RegistrationFilters from './components/RegistrationFilters'
import { useDebounce } from './hooks/useDebounce'
import { getSummary, getRegistrations } from './api/sample-data'

function App() {
  const [summary, setSummary] = useState(null)
  const [loadingSummary, setLoadingSummary] = useState(true)

  const [registrations, setRegistrations] = useState([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(true)

  // Filters State
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Pagination State (kept at page 1 for now)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  // Debounced search term (~400ms)
  const debouncedSearch = useDebounce(searchTerm, 400)

  // Fetch KPI Summary
  useEffect(() => {
    async function fetchKpi() {
      try {
        setLoadingSummary(true)
        const data = await getSummary()
        setSummary(data)
      } catch (err) {
        console.error('Failed to load KPI summary:', err)
      } finally {
        setLoadingSummary(false)
      }
    }
    fetchKpi()
  }, [])

  // Fetch Registrations whenever debouncedSearch, typeFilter, statusFilter, page, or pageSize change
  useEffect(() => {
    async function fetchRegs() {
      try {
        setLoadingRegistrations(true)
        const res = await getRegistrations({
          participantName: debouncedSearch,
          type: typeFilter === 'All' ? '' : typeFilter,
          status: statusFilter === 'All' ? '' : statusFilter,
          page,
          pageSize
        })
        setRegistrations(res.items)
        setTotalCount(res.totalCount)
      } catch (err) {
        console.error('Failed to load registrations:', err)
      } finally {
        setLoadingRegistrations(false)
      }
    }
    fetchRegs()
  }, [debouncedSearch, typeFilter, statusFilter, page, pageSize])

  // Reset to page 1 when any filter changes
  const handleSearchChange = (val) => {
    setSearchTerm(val)
    setPage(1)
  }

  const handleTypeChange = (val) => {
    setTypeFilter(val)
    setPage(1)
  }

  const handleStatusChange = (val) => {
    setStatusFilter(val)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setTypeFilter('All')
    setStatusFilter('All')
    setPage(1)
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#1C1C1E]">
        <div>
          <span className="inline-block font-space text-xs font-bold px-3 py-1 bg-[#FFF3B0] border border-[#1C1C1E] rounded-full retro-shadow-sm mb-2 -rotate-1">
            AutoVista Events • Sorsogon City Coliseum
          </span>
          <h1 className="text-3xl sm:text-4xl font-archivo tracking-tight text-[#1C1C1E]">
            Car Show 2027 Dashboard
          </h1>
        </div>
      </header>

      {/* KPI Cards */}
      <section>
        <KpiCards summary={summary} loading={loadingSummary} />
      </section>

      {/* Filters Section */}
      <section>
        <RegistrationFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          typeFilter={typeFilter}
          onTypeChange={handleTypeChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
          onClearFilters={handleClearFilters}
        />
      </section>

      {/* Registrations Table */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-archivo text-[#1C1C1E]">
            Event Registrations
          </h2>
          <span className="font-space text-xs text-[#5E6368]">
            Showing {registrations.length} of {totalCount} matching entries
          </span>
        </div>
        <RegistrationTable registrations={registrations} />
      </section>
    </div>
  )
}

export default App
