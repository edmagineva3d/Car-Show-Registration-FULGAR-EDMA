import React, { useState } from 'react'
import { 
  Menu, 
  X, 
  Calendar, 
  MapPin, 
  PlusCircle, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Car
} from 'lucide-react'
import { BASE_URL } from '../api/registrationsApi'

export function Header({ onOpenNewModal, activeTab, onTabChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative z-30 mb-6">
      {/* Top Banner Ribbon */}
      <div className="bg-[#1C1C1E] text-white py-1.5 px-4 rounded-xl mb-3 flex items-center justify-between text-xs font-space">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB7CF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB7CF]" />
          </span>
          <span className="font-bold tracking-wider uppercase text-[#FFF3B0]">
            AutoVista Events Official
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:inline text-white/80">
            Sorsogon City Coliseum • February 10–12, 2027
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`${BASE_URL}/scalar/v1`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-[#C7E7E3] hover:text-[#FFF3B0] transition-colors underline font-medium text-[11px]"
          >
            <span>Scalar API Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            API Port: 5205
          </span>
        </div>
      </div>

      {/* Main Navigation Card */}
      <div className="bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl px-5 py-4 retro-shadow flex items-center justify-between">
        {/* Logo & Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FFF3B0] border-2 border-[#1C1C1E] flex items-center justify-center retro-shadow-sm -rotate-3 transition-transform hover:rotate-0">
            <Car className="w-6 h-6 text-[#1C1C1E]" strokeWidth={2.4} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-archivo text-xl sm:text-2xl tracking-tight text-[#1C1C1E]">
                AutoVista<span className="text-[#FF94B8]">.</span>
              </span>
              <span className="hidden sm:inline-block font-space text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#C7E7E3] border border-[#1C1C1E] rounded-full retro-shadow-sm">
                Car Show 2027
              </span>
            </div>
            <p className="font-space text-xs text-[#5E6368] hidden sm:block">
              Event Registration & Participant Management
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={() => onTabChange && onTabChange('dashboard')}
            className={`px-3.5 py-2 rounded-xl font-space text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#1C1C1E] text-white retro-shadow-sm'
                : 'text-[#1C1C1E] hover:bg-[#FFF3B0]'
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => onTabChange && onTabChange('registrations')}
            className={`px-3.5 py-2 rounded-xl font-space text-xs font-bold transition-all ${
              activeTab === 'registrations'
                ? 'bg-[#1C1C1E] text-white retro-shadow-sm'
                : 'text-[#1C1C1E] hover:bg-[#FFF3B0]'
            }`}
          >
            Registrations
          </button>
          <button
            type="button"
            onClick={() => onTabChange && onTabChange('event-info')}
            className={`px-3.5 py-2 rounded-xl font-space text-xs font-bold transition-all ${
              activeTab === 'event-info'
                ? 'bg-[#1C1C1E] text-white retro-shadow-sm'
                : 'text-[#1C1C1E] hover:bg-[#FFF3B0]'
            }`}
          >
            Event Info
          </button>
        </nav>

        {/* Right CTA / Action */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenNewModal && (
            <button
              type="button"
              onClick={onOpenNewModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-space text-xs font-bold uppercase tracking-wider bg-[#FFB7CF] text-[#1C1C1E] border-2 border-[#1C1C1E] retro-shadow hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1C1C1E] active:translate-y-0 active:shadow-[1px_1px_0px_#1C1C1E] transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#1C1C1E]" />
              New Registration
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          {onOpenNewModal && (
            <button
              type="button"
              onClick={onOpenNewModal}
              className="p-2 rounded-xl bg-[#FFB7CF] border-2 border-[#1C1C1E] retro-shadow-sm text-[#1C1C1E]"
              title="Add registration"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border-2 border-[#1C1C1E] retro-shadow-sm text-[#1C1C1E]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl p-4 retro-shadow space-y-2 animate-fadeIn">
          <button
            type="button"
            onClick={() => {
              onTabChange && onTabChange('dashboard')
              setMobileMenuOpen(false)
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-space text-sm font-bold ${
              activeTab === 'dashboard' ? 'bg-[#1C1C1E] text-white' : 'text-[#1C1C1E] hover:bg-[#FFF3B0]'
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => {
              onTabChange && onTabChange('registrations')
              setMobileMenuOpen(false)
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-space text-sm font-bold ${
              activeTab === 'registrations' ? 'bg-[#1C1C1E] text-white' : 'text-[#1C1C1E] hover:bg-[#FFF3B0]'
            }`}
          >
            Registrations
          </button>
          <button
            type="button"
            onClick={() => {
              onTabChange && onTabChange('event-info')
              setMobileMenuOpen(false)
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-space text-sm font-bold ${
              activeTab === 'event-info' ? 'bg-[#1C1C1E] text-white' : 'text-[#1C1C1E] hover:bg-[#FFF3B0]'
            }`}
          >
            Event Info & Venue
          </button>
          <a
            href={`${BASE_URL}/scalar/v1`}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl font-space text-sm font-semibold bg-[#C7E7E3] border border-[#1C1C1E] text-[#1C1C1E]"
          >
            <span>Scalar API Documentation</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
