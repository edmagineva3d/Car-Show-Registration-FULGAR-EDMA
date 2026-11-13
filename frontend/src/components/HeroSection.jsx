import React from 'react'
import { Calendar, MapPin, Sparkles, ArrowUpRight, Trophy, Car, Ticket } from 'lucide-react'

// Realistic silver metallic star SVG component
export function MetallicStar({ className = "w-6 h-6", rotate = 0 }) {
  return (
    <div 
      className={`inline-block filter drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] select-none pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="silver-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#D9D9D9" />
            <stop offset="50%" stopColor="#A8A8A8" />
            <stop offset="75%" stopColor="#E6E6E6" />
            <stop offset="100%" stopColor="#8C8C8C" />
          </linearGradient>
          <linearGradient id="silver-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#BFBFBF" />
            <stop offset="100%" stopColor="#737373" />
          </linearGradient>
        </defs>
        {/* Star facets */}
        <polygon points="50,5 50,50 15,35" fill="url(#silver-grad-1)" />
        <polygon points="50,5 85,35 50,50" fill="url(#silver-grad-2)" />
        <polygon points="85,35 50,50 72,85" fill="url(#silver-grad-1)" />
        <polygon points="50,50 50,95 72,85" fill="url(#silver-grad-2)" />
        <polygon points="50,50 50,95 28,85" fill="url(#silver-grad-1)" />
        <polygon points="15,35 50,50 28,85" fill="url(#silver-grad-2)" />
        {/* Outer outline */}
        <polygon 
          points="50,5 61,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 39,35" 
          stroke="#404040" 
          strokeWidth="2" 
          fill="none" 
        />
        {/* Center highlight sparkle */}
        <circle cx="50" cy="50" r="3" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  )
}

// Retro 8-bit Pixel Cursor SVG
export function PixelCursor({ className = "w-6 h-6", color = "#FFB7CF" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`inline-block filter drop-shadow-[2px_2px_0px_#1C1C1E] ${className}`}
    >
      <path 
        d="M2 2V22L7 17H12L17 22L20 20L15 15H22L2 2Z" 
        fill={color} 
        stroke="#1C1C1E" 
        strokeWidth="1.8" 
        strokeLinejoin="miter" 
      />
    </svg>
  )
}

export function HeroSection({ onOpenNewModal }) {
  return (
    <div className="relative mx-auto my-4 max-w-4xl">
      {/* Outer Card with Ticket Notches */}
      <div className="relative bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-3xl retro-shadow-lg p-6 sm:p-10 overflow-hidden">
        
        {/* Left & Right Ticket Notches at bottom fold */}
        <div className="hidden sm:block absolute -left-4 bottom-24 w-8 h-8 rounded-full bg-[#C7E7E3] border-2 border-[#1C1C1E] z-20" />
        <div className="hidden sm:block absolute -right-4 bottom-24 w-8 h-8 rounded-full bg-[#C7E7E3] border-2 border-[#1C1C1E] z-20" />

        {/* Floating Decorative Metallic Stars */}
        <div className="absolute top-4 right-1/4 sm:right-1/3">
          <MetallicStar className="w-7 h-7" rotate={12} />
        </div>
        <div className="absolute top-12 left-6">
          <MetallicStar className="w-5 h-5" rotate={-18} />
        </div>
        <div className="absolute bottom-28 right-8">
          <MetallicStar className="w-6 h-6" rotate={25} />
        </div>

        {/* Top Stickers Row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          {/* Tilted Aqua Sticker: "official event pass" */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C7E7E3] border-2 border-[#1C1C1E] rounded-xl retro-shadow-sm -rotate-3 hover:rotate-0 transition-transform">
            <Ticket className="w-3.5 h-3.5 text-[#1C1C1E]" />
            <span className="font-space text-xs font-bold text-[#1C1C1E] uppercase tracking-wider">
              Official Paddock Pass
            </span>
          </div>

          {/* Tilted Yellow Sticker: "you're invited!" */}
          <div className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#FFF3B0] border-2 border-[#1C1C1E] rounded-full retro-shadow-sm rotate-2 hover:rotate-0 transition-transform">
            <span className="font-archivo text-xs text-[#1C1C1E] lowercase tracking-wide">
              you&apos;re invited!
            </span>
          </div>
        </div>

        {/* Center Presentation Title */}
        <div className="text-center my-2">
          <div className="inline-flex items-center gap-2 font-space text-xs font-bold uppercase tracking-widest text-[#1C1C1E]">
            <span>✦</span>
            <span>AutoVista Events presents:</span>
            <span>✦</span>
          </div>
        </div>

        {/* Giant Retro Editorial Headline */}
        <div className="relative text-center my-6">
          <h2 className="font-archivo text-4xl sm:text-6xl md:text-7xl text-[#1C1C1E] tracking-tight leading-[0.95] select-none">
            everybody<br />
            <span className="relative inline-block">
              loves
              {/* Retro Pixel Cursor on top of text */}
              <span className="absolute -top-3 -right-6 sm:-right-8 animate-bounce">
                <PixelCursor className="w-7 h-7 sm:w-9 sm:h-9" color="#FFB7CF" />
              </span>
            </span>
            <br />
            <span className="underline decoration-[#FFB7CF] decoration-wavy decoration-2">
              cars.
            </span>
          </h2>

          <p className="font-serif-editorial italic text-sm sm:text-base text-[#5E6368] max-w-xl mx-auto mt-4 px-4 leading-relaxed">
            A three-day automotive celebration at Sorsogon City Coliseum: Show &amp; Shine trophies, VIP exotics, track builds, and passionate car enthusiasts who get it.
          </p>
        </div>

        {/* Center CTA Button */}
        <div className="flex justify-center my-6">
          <button
            type="button"
            onClick={onOpenNewModal}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-[#FFB7CF] border-2 border-[#1C1C1E] rounded-2xl font-space text-sm font-bold uppercase tracking-wider text-[#1C1C1E] retro-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1C1C1E] active:translate-y-0 active:shadow-[1px_1px_0px_#1C1C1E] transition-all cursor-pointer"
          >
            <span>Waitlist &amp; Gate Open Now!</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="absolute -bottom-3 -right-2">
              <PixelCursor className="w-5 h-5" color="#FFF3B0" />
            </span>
          </button>
        </div>

        {/* Perforated Dotted Divider Line */}
        <div className="my-8 border-b-2 border-dashed border-[#1C1C1E]/40" />

        {/* Bottom Ticket Stub Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {/* Left Yellow Stamp */}
          <div className="bg-[#FFF3B0] border-2 border-[#1C1C1E] rounded-xl p-3 retro-shadow-sm text-center -rotate-1">
            <span className="block font-space text-[10px] font-bold text-[#5E6368] uppercase tracking-wider">
              Registration Fee
            </span>
            <span className="font-archivo text-base text-[#1C1C1E]">
              ₱1,500 – ₱5,000
            </span>
            <span className="block font-dm text-[11px] text-[#5E6368]">
              Exhibitor / VIP / Show
            </span>
          </div>

          {/* Center Date Badge: "10-12th February 2027" */}
          <div className="text-center flex items-center justify-center gap-2">
            <div className="font-archivo text-4xl sm:text-5xl text-[#1C1C1E] tracking-tight leading-none flex items-start justify-center">
              <span>10-12</span>
              <span className="text-sm font-space font-bold bg-[#FFB7CF] border border-[#1C1C1E] px-1 py-0.5 rounded-md ml-0.5 mt-1 -rotate-6">
                th
              </span>
            </div>
            <div className="text-left font-space text-xs font-bold uppercase text-[#1C1C1E] leading-tight">
              February
              <span className="block text-[#5E6368] font-normal">2027</span>
            </div>
          </div>

          {/* Right Location Box */}
          <div className="bg-white border-2 border-[#1C1C1E] rounded-xl p-3 retro-shadow-sm text-center rotate-1">
            <div className="inline-flex items-center gap-1 font-space text-xs font-bold px-2 py-0.5 bg-[#C7E7E3] border border-[#1C1C1E] rounded mb-1">
              <MapPin className="w-3 h-3 text-[#1C1C1E]" />
              where?
            </div>
            <div className="font-archivo text-sm text-[#1C1C1E]">
              Sorsogon Coliseum
            </div>
            <div className="font-dm text-xs text-[#5E6368]">
              Sorsogon City, Bicol
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroSection
