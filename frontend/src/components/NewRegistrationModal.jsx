import React, { useState } from 'react'
import { X, PlusCircle, AlertCircle, CheckCircle2, Car, Sparkles } from 'lucide-react'
import { createRegistration } from '../api/registrationsApi'

export function NewRegistrationModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    participantName: '',
    contactNumber: '',
    email: '',
    address: '',
    carMakeModel: '',
    plateNumber: '',
    registrationType: 'Competitor',
    amountPaid: 0
  })

  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [generalError, setGeneralError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  if (!isOpen) return null

  const feeMap = {
    Exhibitor: 1500,
    Competitor: 2500,
    VIP: 5000
  }

  const currentFee = feeMap[formData.registrationType] || 2500

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amountPaid' ? parseFloat(value) || 0 : value
    }))
    // Clear error for that field
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setFieldErrors({})
    setGeneralError(null)
    setSuccessMessage(null)

    try {
      const response = await createRegistration(formData)
      setSuccessMessage(`Registration created successfully! Assigned Reg No: ${response.registrationNumber}`)
      setTimeout(() => {
        if (onSuccess) onSuccess(response)
        onClose()
      }, 1200)
    } catch (err) {
      console.error('Failed to create registration:', err)
      const details = err.problemDetails
      if (details?.errors) {
        // Map 400 validation errors
        const mapped = {}
        for (const [key, val] of Object.entries(details.errors)) {
          // normalize field key to lowercase
          const normKey = key.charAt(0).toLowerCase() + key.slice(1)
          mapped[normKey] = Array.isArray(val) ? val[0] : val
        }
        setFieldErrors(mapped)
      } else if (err.status === 409) {
        // 409 Conflict - Duplicate plate number
        setFieldErrors({
          plateNumber: details?.detail || 'A vehicle with this plate number is already registered for this event.'
        })
      } else {
        setGeneralError(err.message || 'An unexpected error occurred while saving registration.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FAF6EE] border-2 border-[#1C1C1E] rounded-3xl retro-shadow-lg overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="bg-[#1C1C1E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB7CF]" />
            <h3 className="font-space font-bold text-xs uppercase tracking-wider text-[#FFF3B0]">
              Register New Car Show Participant
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto font-dm">
          {successMessage && (
            <div className="p-3 bg-[#DCFCE7] border-2 border-[#22C55E] rounded-xl flex items-center gap-2 text-xs font-space font-bold text-[#166534]">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}

          {generalError && (
            <div className="p-3 bg-[#FEE2E2] border-2 border-[#EF4444] rounded-xl flex items-center gap-2 text-xs font-space font-bold text-[#991B1B]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          {/* Participant Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-space text-xs font-bold uppercase text-[#1C1C1E] mb-1">
                Participant Name *
              </label>
              <input
                type="text"
                name="participantName"
                value={formData.participantName}
                onChange={handleChange}
                placeholder="e.g. Juan Dela Cruz"
                className={`w-full px-3 py-2 bg-white border-2 rounded-xl text-sm font-dm text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] ${
                  fieldErrors.participantName ? 'border-red-500 bg-red-50' : 'border-[#1C1C1E]'
                }`}
                required
              />
              {fieldErrors.participantName && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.participantName}</p>
              )}
            </div>

            <div>
              <label className="block font-space text-xs font-bold uppercase text-[#1C1C1E] mb-1">
                Contact Number *
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="e.g. 09171234567"
                className={`w-full px-3 py-2 bg-white border-2 rounded-xl text-sm font-dm text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] ${
                  fieldErrors.contactNumber ? 'border-red-500 bg-red-50' : 'border-[#1C1C1E]'
                }`}
                required
              />
              {fieldErrors.contactNumber && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.contactNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-space text-xs font-bold uppercase text-[#1C1C1E] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. juan@example.com"
                className={`w-full px-3 py-2 bg-white border-2 rounded-xl text-sm font-dm text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] ${
                  fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-[#1C1C1E]'
                }`}
                required
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-space text-xs font-bold uppercase text-[#1C1C1E] mb-1">
                Address / City *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Sorsogon City"
                className={`w-full px-3 py-2 bg-white border-2 rounded-xl text-sm font-dm text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] ${
                  fieldErrors.address ? 'border-red-500 bg-red-50' : 'border-[#1C1C1E]'
                }`}
                required
              />
              {fieldErrors.address && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.address}</p>
              )}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#1C1C1E]/10">
            <div>
              <label className="block font-space text-xs font-bold uppercase text-[#1C1C1E] mb-1">
                Car Make &amp; Model *
              </label>
              <input
                type="text"
                name="carMakeModel"
                value={formData.carMakeModel}
                onChange={handleChange}
                placeholder="e.g. Toyota Supra MK4"
                className={`w-full px-3 py-2 bg-white border-2 rounded-xl text-sm font-dm text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] ${
                  fieldErrors.carMakeModel ? 'border-red-500 bg-red-50' : 'border-[#1C1C1E]'
                }`}
                required
              />
              {fieldErrors.carMakeModel && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.carMakeModel}</p>
              )}
            </div>

            <div>
              <label className="block font-space text-xs font-bold uppercase text-[#1C1C1E] mb-1">
                Plate Number *
              </label>
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="e.g. ABC 1234"
                className={`w-full px-3 py-2 bg-white border-2 rounded-xl text-sm font-mono uppercase font-bold text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF] ${
                  fieldErrors.plateNumber ? 'border-red-500 bg-red-50' : 'border-[#1C1C1E]'
                }`}
                required
              />
              {fieldErrors.plateNumber && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.plateNumber}</p>
              )}
            </div>
          </div>

          {/* Registration Type & Initial Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#1C1C1E]/10">
            <div>
              <label className="block font-space text-xs font-bold uppercase text-[#1C1C1E] mb-1">
                Category
              </label>
              <select
                name="registrationType"
                value={formData.registrationType}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border-2 border-[#1C1C1E] rounded-xl text-sm font-space font-semibold text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF]"
              >
                <option value="Exhibitor">Exhibitor (₱1,500.00)</option>
                <option value="Competitor">Competitor (₱2,500.00)</option>
                <option value="VIP">VIP Pass (₱5,000.00)</option>
              </select>
            </div>

            <div>
              <label className="block font-space text-xs font-bold uppercase text-[#1C1C1E] mb-1">
                Initial Amount Paid (₱)
              </label>
              <input
                type="number"
                name="amountPaid"
                min="0"
                max={currentFee}
                step="100"
                value={formData.amountPaid}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border-2 border-[#1C1C1E] rounded-xl text-sm font-mono font-bold text-[#1C1C1E] retro-shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB7CF]"
              />
              <span className="block text-[11px] font-space text-[#5E6368] mt-1">
                Fee: ₱{currentFee.toLocaleString()} • Status will be{' '}
                {formData.amountPaid >= currentFee ? 'Paid' : formData.amountPaid > 0 ? 'Partial' : 'Unpaid'}
              </span>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t-2 border-[#1C1C1E]/20">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl font-space text-xs font-bold uppercase tracking-wider bg-white border-2 border-[#1C1C1E] retro-shadow-sm hover:bg-[#FFF3B0] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-space text-xs font-bold uppercase tracking-wider bg-[#FFB7CF] text-[#1C1C1E] border-2 border-[#1C1C1E] retro-shadow hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1C1C1E] active:translate-y-0 transition-all cursor-pointer disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              {loading ? 'Submitting...' : 'Register Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewRegistrationModal
