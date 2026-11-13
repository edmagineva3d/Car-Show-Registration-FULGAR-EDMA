import React, { useState, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import KpiCards from '../components/KpiCards'
import RegistrationTable from '../components/RegistrationTable'
import RegistrationFilters from '../components/RegistrationFilters'
import Pagination from '../components/Pagination'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import RegistrationDetailsModal from '../components/RegistrationDetailsModal'
import NewRegistrationModal from '../components/NewRegistrationModal'
import { useDebounce } from '../hooks/useDebounce'
import { getSummary, getRegistrations, BASE_URL } from '../api/registrationsApi'
import { Sparkles, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react'

export function RegistrationsPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Summary State
  const [summary, setSummary] = useState(null)
  const [loadingSummary, setLoadingSummary] = useState(true)

  // Registrations State
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

  // Modals
  const [selectedRegistration, setSelectedRegistration] = useState(null)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)

  // Debounced search input (~400ms)
  const debouncedSearch = useDebounce(searchTerm, 400)

  // Fetch KPI Summary from API
  const fetchKpi = useCallback(async () => {
    try {
      setLoadingSummary(true)
      const data = await getSummary()
      setSummary(data)
    } catch (err) {
      console.error('Failed to load KPI summary:', err)
      setErrorMessage(err.message || 'Cannot reach the API summary endpoint.')
    } finally {
      setLoadingSummary(false)
    }
  }, [])

  // Fetch Registrations from API
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
      setErrorMessage(err.message || 'Cannot reach the API. Please ensure the C# backend server is running.')
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
      // Smooth scroll back to table
      const el = document.getElementById('registrations-section')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
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

  const handleNewRegistrationSuccess = () => {
    fetchKpi()
    fetchRegs()
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenNewModal={() => setIsNewModalOpen(true)}
      />

      {/* Hero Section inspired by reference image */}
      {activeTab === 'dashboard' && (
        <section>
          <HeroSection onOpenNewModal={() => setIsNewModalOpen(true)} />
        </section>
      )}

      {/* Event Info Tab Content */}
      {activeTab === 'event-info' && (
        <section className="bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-3xl p-6 sm:p-10 retro-shadow-lg space-y-6 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#FFF3B0] border border-[#1C1C1E] rounded-full font-space text-xs font-bold uppercase tracking-wider">
              Event Details
            </span>
            <span className="font-archivo text-2xl text-[#1C1C1E]">
              Car Show 2027 • AutoVista Events
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border-2 border-[#1C1C1E] rounded-2xl p-5 retro-shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#C7E7E3] border border-[#1C1C1E] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#1C1C1E]" />
              </div>
              <h4 className="font-archivo text-base text-[#1C1C1E]">Dates &amp; Schedule</h4>
              <p className="font-dm text-xs text-[#5E6368] leading-relaxed">
                February 10–12, 2027. Gates open 8:00 AM daily. Show &amp; Shine judging takes place on Day 2.
              </p>
            </div>

            <div className="bg-white border-2 border-[#1C1C1E] rounded-2xl p-5 retro-shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFF3B0] border border-[#1C1C1E] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#1C1C1E]" />
              </div>
              <h4 className="font-archivo text-base text-[#1C1C1E]">Coliseum Venue</h4>
              <p className="font-dm text-xs text-[#5E6368] leading-relaxed">
                Sorsogon City Coliseum, Sorsogon, Philippines. Air-conditioned indoor exhibition hall and secured VIP paddocks.
              </p>
            </div>

            <div className="bg-white border-2 border-[#1C1C1E] rounded-2xl p-5 retro-shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFB7CF] border border-[#1C1C1E] flex items-center justify-center">
                <Award className="w-5 h-5 text-[#1C1C1E]" />
              </div>
              <h4 className="font-archivo text-base text-[#1C1C1E]">Categories &amp; Awards</h4>
              <p className="font-dm text-xs text-[#5E6368] leading-relaxed">
                Exhibitors (₱1,500), Judged Competitors (₱2,500), and VIP Premium Paddock Passes (₱5,000).
              </p>
            </div>
          </div>
        </section>
      )}

      {/* KPI Cards Section */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1C1C1E]" />
            <h3 className="font-space font-bold text-xs uppercase tracking-wider text-[#5E6368]">
              Live Registration Summary (API)
            </h3>
          </div>
          <span className="font-space text-[11px] text-[#5E6368]">
            Updated in real-time from backend
          </span>
        </div>
        <KpiCards summary={summary} loading={loadingSummary} />
      </section>

      {/* Filter Controls Bar */}
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

      {/* Registrations List Section */}
      <section id="registrations-section" className="space-y-4">
        {errorMessage ? (
          <ErrorState message={errorMessage} onRetry={handleRetry} />
        ) : loadingRegistrations ? (
          <LoadingState message="Loading registrations from C# REST API..." />
        ) : registrations.length === 0 ? (
          <EmptyState onClearFilters={handleClearFilters} />
        ) : (
          <>
            <RegistrationTable 
              registrations={registrations} 
              onSelectRegistration={(item) => setSelectedRegistration(item)}
            />

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

      {/* Footer */}
      <footer className="pt-8 pb-4 border-t-2 border-[#1C1C1E]/20 text-center font-space text-xs text-[#5E6368] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          AutoVista Events © 2027 • Car Show Registration System
        </div>
        <div>
          Frontend Developer: Gineva Edma • Backend: C# .NET 10 / SQLite
        </div>
      </footer>

      {/* Modals */}
      {selectedRegistration && (
        <RegistrationDetailsModal
          registrationId={selectedRegistration.id}
          initialData={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
        />
      )}

      {isNewModalOpen && (
        <NewRegistrationModal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          onSuccess={handleNewRegistrationSuccess}
        />
      )}
    </div>
  )
}

export default RegistrationsPage
