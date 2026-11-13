import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export function ErrorState({ 
  message = "Cannot reach the API. Please make sure the C# backend server is running on http://localhost:5205.",
  onRetry 
}) {
  return (
    <div className="bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-2xl p-8 sm:p-10 retro-shadow text-center relative overflow-hidden">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFB7CF] border-2 border-[#1C1C1E] retro-shadow-sm mb-4 rotate-2">
        <AlertTriangle className="w-8 h-8 text-[#991B1B]" strokeWidth={2.2} />
      </div>

      <h3 className="font-archivo text-xl sm:text-2xl text-[#1C1C1E] mb-2 tracking-tight">
        Cannot reach the API
      </h3>

      <p className="font-dm text-sm text-[#5E6368] max-w-lg mx-auto mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-space text-xs font-bold uppercase tracking-wider bg-[#FFB7CF] text-[#1C1C1E] border-2 border-[#1C1C1E] retro-shadow hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1C1C1E] active:translate-y-0 active:shadow-[1px_1px_0px_#1C1C1E] transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-[#1C1C1E]" />
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorState
