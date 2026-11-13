import React, { useState, useEffect } from 'react'
import KpiCards from './components/KpiCards'
import { getSummary } from './api/sample-data'

function App() {
  const [summary, setSummary] = useState(null)
  const [loadingSummary, setLoadingSummary] = useState(true)

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

      {/* KPI Cards Section */}
      <section>
        <KpiCards summary={summary} loading={loadingSummary} />
      </section>
    </div>
  )
}

export default App
