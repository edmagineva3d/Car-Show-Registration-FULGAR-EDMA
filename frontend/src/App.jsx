import React, { useState, useEffect, useCallback } from 'react'
import KpiCards from './components/KpiCards'
import RegistrationTable from './components/RegistrationTable'
import RegistrationFilters from './components/RegistrationFilters'
import Pagination from './components/Pagination'
import LoadingState from './components/LoadingState'
import EmptyState from './components/EmptyState'
import ErrorState from './components/ErrorState'
import { useDebounce } from './hooks/useDebounce'
// Connected to the live C# REST API
import { getSummary, getRegistrations, BASE_URL } from './api/registrationsApi'

function App() {
  const [summary, setSummary] = useState(null)
  const [loadingSummary, setLoadingSummary] = useState(true)

  const [registrations, setRegistrations] = useState([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // Filters State
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Pagination State
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Debounced search term (~400ms)
  const debouncedSearch = useDebounce(searchTerm, 400)

  // Fetch KPI Summary from GET /api/registrations/summary
  const fetchKpi = useCallback(async () => {
    try {
      setLoadingSummary(true)
      const data = await getSummary()
      setSummary(data)
    } catch (err) {
      console.error('Failed to load KPI summary:', err)
      setErrorMessage(err.message || 'Cannot reach the C# API summary endpoint.')
    } finally {
      setLoadingSummary(false)
    }
  }, [])

  // Fetch Registrations from GET /api/registrations?participantName=&type=&status=&page=&pageSize=
  const fetchRegs = useCallback(async () => {
    try {
      setLoadingRegistrations(true)
      setErrorMessage(null)
      const res = await getRegistrations({
        participantName: debouncedSearch,
        type: typeFilter === 'All' ? '' : typeFilter,
        status: statusFilter === 'All' ? '' : statusFilter,
        page,
        pageSize
      })
      setRegistrations(res.items || [])
      setTotalCount(res.totalCount || 0)
      setTotalPages(res.totalPages || 1)
    } catch (err) {
      console.error('Failed to load registrations:', err)
      setErrorMessage(err.message || 'Cannot reach the API. Please make sure the C# backend is running.')
    } finally {
      setLoadingRegistrations(false)
    }
  }, [debouncedSearch, typeFilter, statusFilter, page, pageSize])

  useEffect(() => {
    fetchKpi()
  }, [fetchKpi])

  useEffect(() => {
    fetchRegs()
  }, [fetchRegs])

  // Filter change handlers (reset page to 1)
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize)
    setPage(1)
  }

  const handleRetry = () => {
    fetchKpi()
    fetchRegs()
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#1C1C1E]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-block font-space text-xs font-bold px-3 py-1 bg-[#FFF3B0] border border-[#1C1C1E] rounded-full retro-shadow-sm -rotate-1">
              AutoVista Events • Sorsogon City Coliseum
            </span>
            <span className="inline-flex items-center gap-1.5 font-space text-[11px] font-bold px-2.5 py-0.5 bg-[#DCFCE7] text-[#166534] border border-[#1C1C1E] rounded-full retro-shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              API Connected: {BASE_URL}
            </span>
          </div>
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

      {/* Main Content Area */}
      <section className="space-y-4">
        {errorMessage ? (
          <ErrorState message={errorMessage} onRetry={handleRetry} />
        ) : loadingRegistrations ? (
          <LoadingState message="Loading registrations from C# API..." />
        ) : registrations.length === 0 ? (
          <EmptyState onClearFilters={handleClearFilters} />
        ) : (
          <>
            <RegistrationTable registrations={registrations} />

            <Pagination
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              loading={loadingRegistrations}
            />
          </>
        )}
      </section>
    </div>
  )
}

export default App
