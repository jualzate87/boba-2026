import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  CLIENTS,
  CLIENT_STATUSES,
  CLIENT_ELIGIBILITY,
  CLIENT_PRIOR_YEAR_RETURN,
  getProScenario,
  getProHasSentConsent,
} from '../../data/sampleData'
import type { ManualClient } from './UploadClients'
import ProHeader from '../../components/ProHeader'

const CLIENT_STATUS_LABELS: Record<string, string> = {
  not_contacted: 'Not contacted',
  consent_request_sent: 'Consent request sent',
  email_sent: 'Email sent',
  email_opened: 'Email opened',
  consent_provided: 'Consent provided',
  consent_rejected: 'Consent rejected',
  documents_submitted: 'Documents submitted',
  serviceability_determined: 'Serviceability determined',
  account_created: 'Account created',
  starting_journey: 'Starting journey',
  help_requested: 'Help requested',
}

const CLIENT_STATUS_STYLES: Record<string, string> = {
  not_contacted: 'bg-intuit-gray-100 text-intuit-gray-600',
  consent_request_sent: 'bg-blue-100 text-blue-700',
  email_sent: 'bg-intuit-gray-100 text-intuit-gray-700',
  email_opened: 'bg-blue-100 text-blue-700',
  consent_provided: 'bg-green-100 text-green-700',
  consent_rejected: 'bg-red-100 text-red-700',
  documents_submitted: 'bg-amber-100 text-amber-700',
  serviceability_determined: 'bg-green-100 text-green-700',
  account_created: 'bg-green-100 text-green-700',
  starting_journey: 'bg-green-100 text-green-700',
  help_requested: 'bg-amber-100 text-amber-700',
}

const ELIGIBILITY_LABELS: Record<string, string> = {
  awaiting_documentation: 'Awaiting documentation',
  pending: 'Pending',
  serviceable: 'Serviceable',
  not_serviceable: 'Not serviceable',
  missing_document: 'Missing document',
}

const ELIGIBILITY_STYLES: Record<string, string> = {
  awaiting_documentation: 'bg-amber-100 text-amber-700',
  pending: 'bg-intuit-gray-100 text-intuit-gray-600',
  serviceable: 'bg-green-100 text-green-700',
  not_serviceable: 'bg-amber-100 text-amber-700',
  missing_document: 'bg-red-100 text-red-700',
}

export default function ProClientList() {
  const navigate = useNavigate()
  const location = useLocation()
  const scenario = (location.state as { proScenario?: string } | null)?.proScenario ?? getProScenario()
  const manualClients = (location.state as { manuallyAddedClients?: ManualClient[] } | null)?.manuallyAddedClients ?? []
  const allClients = [
    ...CLIENTS,
    ...manualClients.map((c) => ({ id: c.id, name: c.name, email: c.email, returnType: c.returnType as '1040' })),
  ]
  const consentSent = scenario !== 'new' || getProHasSentConsent()
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const getDisplayStatus = (client: { id: string }) => {
    if (!consentSent) return 'not_contacted'
    return CLIENT_STATUSES[client.id] || 'consent_request_sent'
  }

  const filteredClients = allClients.filter((c) => {
    const status = getDisplayStatus(c)
    if (statusFilter !== 'all' && status !== statusFilter) return false
    return true
  })

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Review your clients</h1>
        <p className="text-intuit-gray-600 mb-8">
          Review your client list before sending the consent request. After clients consent, we'll collect prior year documents to determine serviceability.
        </p>

        {/* Filters */}
        <div className="mb-6">
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium text-intuit-gray-700">Client status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-intuit-gray-200 text-sm text-intuit-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-intuit-blue focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="not_contacted">Not contacted</option>
              <option value="consent_request_sent">Consent request sent</option>
              <option value="consent_provided">Consent provided</option>
              <option value="documents_submitted">Documents submitted</option>
              <option value="account_created">Account created</option>
            </select>
          </label>
        </div>

        {/* Client table */}
        <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-intuit-gray-50 border-b border-intuit-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Client Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Return type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Eligibility</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Client status</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => {
                  const hasDocs = !!CLIENT_PRIOR_YEAR_RETURN[client.id]
                  const displayStatus = getDisplayStatus(client)
                  const eligibilityFromData = CLIENT_ELIGIBILITY[client.id]
                  const eligibility = scenario === 'new' ? 'awaiting_documentation' : (hasDocs ? (eligibilityFromData ?? 'pending') : 'awaiting_documentation')
                  return (
                    <tr key={client.id} className="border-b border-intuit-gray-100 hover:bg-intuit-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          to={`/pro/client/${client.id}`}
                          state={{ proScenario: scenario }}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-intuit-blue hover:underline"
                        >
                          <span>{client.name}</span>
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-intuit-gray-600">{client.email}</td>
                      <td className="px-6 py-4 text-sm text-intuit-gray-600">
                        {'returnType' in client ? (client as { returnType?: string }).returnType || '—' : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${ELIGIBILITY_STYLES[eligibility] || 'bg-intuit-gray-100'}`}>
                          {ELIGIBILITY_LABELS[eligibility] || eligibility}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${CLIENT_STATUS_STYLES[displayStatus] || 'bg-intuit-gray-100'}`}>
                          {CLIENT_STATUS_LABELS[displayStatus] || displayStatus}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8 flex justify-between items-center">
          <Link to="/pro/upload" state={{ proScenario: scenario, manuallyAddedClients: manualClients }} className="text-intuit-blue hover:underline text-sm font-medium">
            Back to upload
          </Link>
          <button
            onClick={() => navigate('/pro/send', { state: { proScenario: scenario, clientCount: allClients.length, manuallyAddedClients: manualClients } })}
            className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
          >
            Send consent request to {allClients.length} clients
          </button>
        </div>
      </main>
    </div>
  )
}
