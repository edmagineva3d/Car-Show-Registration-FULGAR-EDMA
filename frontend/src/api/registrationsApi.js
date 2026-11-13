/**
 * Real C# API client for Car Show Registration System
 * Base URL is configured via VITE_API_BASE_URL (defaults to http://localhost:5205)
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5205'

/**
 * Helper to build query parameter strings safely
 */
function buildQueryString(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value)
    }
  }
  const str = query.toString()
  return str ? `?${str}` : ''
}

/**
 * Generic fetch wrapper with robust error handling for ProblemDetails and network errors
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  let response

  try {
    response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
  } catch (networkError) {
    const error = new Error(`Cannot reach the API at ${BASE_URL}. Please ensure the C# backend server is running.`)
    error.isNetworkError = true
    error.originalError = networkError
    throw error
  }

  // Handle non-OK HTTP statuses
  if (!response.ok) {
    let errorDetail = `Request failed with status ${response.status} (${response.statusText})`
    let problemDetails = null

    try {
      problemDetails = await response.json()
      if (problemDetails) {
        if (problemDetails.errors) {
          // Flatten FluentValidation / ProblemDetails errors
          const validationMessages = Object.entries(problemDetails.errors)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join(' | ')
          errorDetail = validationMessages || problemDetails.title || errorDetail
        } else if (problemDetails.detail) {
          errorDetail = problemDetails.detail
        } else if (problemDetails.title) {
          errorDetail = problemDetails.title
        }
      }
    } catch {
      // Body was not JSON
    }

    const error = new Error(errorDetail)
    error.status = response.status
    error.problemDetails = problemDetails
    throw error
  }

  // 204 No Content
  if (response.status === 204) {
    return null
  }

  return await response.json()
}

/**
 * Fetch paginated & filtered registrations from GET /api/registrations
 * @param {Object} options
 * @param {string} options.participantName
 * @param {string} options.type
 * @param {string} options.status
 * @param {number} options.page
 * @param {number} options.pageSize
 * @returns {Promise<{ items: Array, page: number, pageSize: number, totalCount: number, totalPages: number }>}
 */
export async function getRegistrations({
  participantName = '',
  type = '',
  status = '',
  page = 1,
  pageSize = 10,
} = {}) {
  const qs = buildQueryString({
    participantName: participantName.trim() || undefined,
    type: type && type !== 'All' ? type : undefined,
    status: status && status !== 'All' ? status : undefined,
    page: page || 1,
    pageSize: pageSize || 10,
  })

  return await apiFetch(`/api/registrations${qs}`)
}

/**
 * Fetch KPI summary totals from GET /api/registrations/summary
 * @returns {Promise<{ totalRegistrations: number, confirmed: number, checkedIn: number, pending: number, cancelled: number, totalFees: number, totalPayments: number, uncollectedPayments: number }>}
 */
export async function getSummary() {
  return await apiFetch('/api/registrations/summary')
}

/**
 * Fetch single registration details by GUID from GET /api/registrations/{id}
 * @param {string} id - Registration GUID
 */
export async function getRegistrationById(id) {
  return await apiFetch(`/api/registrations/${id}`)
}

/**
 * Create a new registration entry via POST /api/registrations
 * @param {Object} data - Registration payload
 */
export async function createRegistration(data) {
  return await apiFetch('/api/registrations', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export { BASE_URL }
