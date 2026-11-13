import React, { useState, useEffect, useCallback } from 'react'
import KpiCards from './components/KpiCards'
import RegistrationTable from './components/RegistrationTable'
import RegistrationFilters from './components/RegistrationFilters'
import Pagination from './components/Pagination'
import LoadingState from './components/LoadingState'
import EmptyState from './components/EmptyState'
import ErrorState from './components/ErrorState'
import { useDebounce } from './hooks/useDebounce'
import { getSummary, getRegistrations } from './api/sample-data'

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

  // Fetch KPI Summary
  const fetchKpi = useCallback(async () => {
    try {
      setLoadingSummary(true)
      const data = await getSummary()
      setSummary(data)
    } catch (err) {
      console.error('Failed to load KPI summary:', err)
    } finally {
      setLoadingSummary(false)
    }
  }, [])

  // Fetch Registrations
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
      setRegistrations(res.items)
      setTotalCount(res.totalCount)
      setTotalPages(res.totalPages)
    } catch (err) {
      console.error('Failed to load registrations:', err)
      setErrorMessage('Cannot reach the API. Please make sure the service is accessible.')
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

      {/* Main Content Area: Loading, Error, Empty, or Table */}
      <section className="space-y-4">
        {errorMessage ? (
          <ErrorState message={errorMessage} onRetry={handleRetry} />
        ) : loadingRegistrations ? (
          <LoadingState message="Loading registrations..." />
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
