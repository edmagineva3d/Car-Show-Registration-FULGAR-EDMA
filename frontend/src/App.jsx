import React, { useState, useEffect } from 'react'
import KpiCards from './components/KpiCards'
import RegistrationTable from './components/RegistrationTable'
import { getSummary, getRegistrations } from './api/sample-data'

function App() {
  const [summary, setSummary] = useState(null)
  const [loadingSummary, setLoadingSummary] = useState(true)
  const [registrations, setRegistrations] = useState([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(true)

  useEffect(() => {
    async function fetchInitialData() {
      try {
        setLoadingSummary(true)
        setLoadingRegistrations(true)

        const [kpiData, regData] = await Promise.all([
          getSummary(),
          getRegistrations({ page: 1, pageSize: 10 })
        ])

        setSummary(kpiData)
        setRegistrations(regData.items)
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        setLoadingSummary(false)
        setLoadingRegistrations(false)
      }
    }
    fetchInitialData()
  }, [])

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

      {/* Registrations Table */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-archivo text-[#1C1C1E]">
            Event Registrations
          </h2>
          <span className="font-space text-xs text-[#5E6368]">
            {registrations.length} entries displayed
          </span>
        </div>
        <RegistrationTable registrations={registrations} />
      </section>
    </div>
  )
}

export default App
