import React from 'react'
import { 
  Users, 
  CircleDollarSign, 
  Receipt, 
  CheckCircle2, 
  Car, 
  Percent,
  Clock,
  XCircle 
} from 'lucide-react'
import KpiCard from './KpiCard'
import { formatCurrency, formatNumber } from '../utils/formatters'

export function KpiCards({ summary, loading = false }) {
  const collectionRate = summary && summary.totalFees > 0 
    ? Math.round((summary.totalPayments / summary.totalFees) * 100) 
    : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Total Registrations */}
      <KpiCard
        title="Total Registrations"
        value={loading ? '—' : formatNumber(summary?.totalRegistrations ?? 0)}
        icon={Users}
        supportingLabel="All registered entries"
        badgeText="ENTRIES"
        badgeBg="bg-[#FFF3B0]"
        iconBg="bg-[#C7E7E3]"
        loading={loading}
      />

      {/* 2. Total Payments (Collected) */}
      <KpiCard
        title="Total Payments"
        value={loading ? '—' : formatCurrency(summary?.totalPayments ?? 0)}
        icon={CircleDollarSign}
        supportingLabel="Collected fees in ₱"
        badgeText="COLLECTED"
        badgeBg="bg-[#D1F2D9]"
        iconBg="bg-[#FFF3B0]"
        loading={loading}
      />

      {/* 3. Uncollected Payments */}
      <KpiCard
        title="Uncollected"
        value={loading ? '—' : formatCurrency(summary?.uncollectedPayments ?? 0)}
        icon={Receipt}
        supportingLabel="Pending fees balance"
        badgeText="BALANCE"
        badgeBg="bg-[#FFB7CF]"
        iconBg="bg-[#FFB7CF]"
        loading={loading}
      />

      {/* 4. Confirmed Registrations */}
      <KpiCard
        title="Confirmed"
        value={loading ? '—' : formatNumber(summary?.confirmed ?? 0)}
        icon={CheckCircle2}
        supportingLabel="Approved registrations"
        badgeText="VERIFIED"
        badgeBg="bg-[#D1F2D9]"
        iconBg="bg-[#D1F2D9]"
        loading={loading}
      />

      {/* 5. Checked In Registrations */}
      <KpiCard
        title="Checked In"
        value={loading ? '—' : formatNumber(summary?.checkedIn ?? 0)}
        icon={Car}
        supportingLabel="At Sorsogon Coliseum"
        badgeText="ON-SITE"
        badgeBg="bg-[#E2DCF7]"
        iconBg="bg-[#E2DCF7]"
        loading={loading}
      />
    </div>
  )
}

export default KpiCards
