import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import {
  CLIENTS,
  CLIENT_STATUSES,
  CLIENT_ELIGIBILITY,
  CLIENT_ESTIMATED_COMP,
  CLIENT_PRIOR_YEAR_RETURN,
  CLIENT_REQUESTED_PRO_UPLOAD,
  CONSENT_REJECTION_REASONS,
  CLIENT_RETURN_COMPLETED,
  EXISTING_USER_CLIENTS,
  EXISTING_USER_RETURN_COMPLETED,
  getProScenario,
  getProHasSentConsent,
} from '../../data/sampleData'

const STATUS_LABELS: Record<string, string> = {
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

const STATUS_STYLES: Record<string, string> = {
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

const EST_COMP_TOOLTIP = 'Estimated compensation based on prior year 1040.'

export default function ProClientTracker() {
  const location = useLocation()
  const scenario = (location.state as { proScenario?: string } | null)?.proScenario ?? getProScenario()
  const consentSent = scenario !== 'new' || getProHasSentConsent()

  const useOnboardingClients = scenario === 'new' || scenario === 'consent_received'
  const clients = useOnboardingClients ? CLIENTS : EXISTING_USER_CLIENTS

  const getDisplayStatus = (client: { id: string; status?: string }) => {
    if (!consentSent) return 'not_contacted'
    if (scenario === 'new') {
      return 'consent_request_sent'
    }
    if (scenario === 'consent_received') {
      return CLIENT_STATUSES[client.id] || 'consent_request_sent'
    }
    return (client as { status?: string }).status || 'consent_request_sent'
  }

  const [eligibilityFilter, setEligibilityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredClients = clients.filter((c) => {
    const client = c as { status?: string; id: string }
    const hasDocs = !!CLIENT_PRIOR_YEAR_RETURN[c.id]
    const eligibility = scenario === 'new' ? 'awaiting_documentation' : scenario === 'consent_received' ? (hasDocs ? (CLIENT_ELIGIBILITY[c.id] ?? 'pending') : 'awaiting_documentation') : 'serviceable'
    if (eligibilityFilter !== 'all' && eligibility !== eligibilityFilter) return false
    const status = getDisplayStatus(client)
    if (statusFilter !== 'all' && status !== statusFilter) return false
    return true
  })

  const clientsRequestingProUpload = useOnboardingClients
    ? CLIENTS.filter((c) => CLIENT_STATUSES[c.id] === 'consent_provided' && CLIENT_REQUESTED_PRO_UPLOAD[c.id])
    : []

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Client status tracker</h1>
        <p className="text-intuit-gray-600 mb-8">
          Track which clients have received consent requests, provided consent, submitted documents, and created accounts.
        </p>

        {/* Consent received: show upload banner */}
        {scenario === 'consent_received' && clientsRequestingProUpload.length > 0 && (
          <section className="mb-8 rounded-xl border-2 border-intuit-blue bg-intuit-blue/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-blue/20 bg-intuit-blue/10">
              <h2 className="text-sm font-semibold text-intuit-blue uppercase tracking-wide">
                Clients requesting document upload
              </h2>
            </div>
            <div className="p-6">
              <p className="text-intuit-gray-700 mb-4">
                {clientsRequestingProUpload.length} client{clientsRequestingProUpload.length !== 1 ? 's have' : ' has'} provided consent and requested you to upload their prior year documents.
              </p>
              <div className="border-2 border-dashed border-intuit-gray-300 rounded-xl p-8 text-center bg-white">
                <p className="font-medium text-intuit-gray-700 mb-2">Drag and drop prior year returns here</p>
                <p className="text-sm text-intuit-gray-500">PDF or JPEG — we'll match them to your clients</p>
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-wrap items-center">
          {useOnboardingClients && (
            <label className="flex items-center gap-2">
              <span className="text-sm font-medium text-intuit-gray-700">Eligibility:</span>
              <select
                value={eligibilityFilter}
                onChange={(e) => setEligibilityFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-intuit-gray-200 text-sm text-intuit-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-intuit-blue"
              >
                <option value="all">All</option>
                <option value="awaiting_documentation">Needs documents</option>
                {scenario === 'consent_received' && (
                  <>
                    <option value="pending">Pending</option>
                    <option value="serviceable">Serviceable</option>
                    <option value="not_serviceable">Not serviceable</option>
                    <option value="missing_document">Missing document</option>
                  </>
                )}
              </select>
            </label>
          )}
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium text-intuit-gray-700">Client status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-intuit-gray-200 text-sm text-intuit-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-intuit-blue"
            >
              <option value="all">All</option>
              <option value="not_contacted">Not contacted</option>
              <option value="consent_request_sent">Consent request sent</option>
              <option value="consent_provided">Consent provided</option>
              <option value="documents_submitted">Documents submitted</option>
              <option value="serviceability_determined">Serviceability determined</option>
              <option value="account_created">Account created</option>
              <option value="starting_journey">Starting journey</option>
            </select>
          </label>
        </div>

        {/* Table */}
        <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-intuit-gray-50 border-b border-intuit-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Client Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Email</th>
                  {(scenario === 'consent_received' || scenario === 'existing') && (
                    <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">
                      <span title={EST_COMP_TOOLTIP} className="border-b border-dotted border-intuit-gray-500 cursor-help">
                        Est. Comp.
                      </span>
                    </th>
                  )}
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Eligibility</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Client status</th>
                  {scenario === 'existing' && (
                    <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Paid</th>
                  )}
                  <th className="text-left px-6 py-4 text-sm font-semibold text-intuit-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => {
                  const clientStatus = getDisplayStatus(client as { id: string; status?: string })
                  const hasDocs = !!CLIENT_PRIOR_YEAR_RETURN[client.id]
                  const comp = scenario === 'new' ? 0 : scenario === 'consent_received' ? (hasDocs ? (CLIENT_ESTIMATED_COMP[client.id] ?? 0) : 0) : (client as { estimatedComp?: number }).estimatedComp ?? 0
                  const returnCompleted = useOnboardingClients ? CLIENT_RETURN_COMPLETED[client.id] : EXISTING_USER_RETURN_COMPLETED[client.id]
                  const paid = clientStatus === 'account_created' && returnCompleted
                  const rejectionReason = useOnboardingClients ? CONSENT_REJECTION_REASONS[client.id] : undefined
                  const eligibility = scenario === 'new' ? 'awaiting_documentation' : scenario === 'consent_received' ? (hasDocs ? (CLIENT_ELIGIBILITY[client.id] ?? 'pending') : 'awaiting_documentation') : 'serviceable'
                  const requestedProUpload = useOnboardingClients && CLIENT_REQUESTED_PRO_UPLOAD[client.id]
                  return (
                    <tr key={client.id} className="border-b border-intuit-gray-100 hover:bg-intuit-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          to={`/pro/client/${client.id}`}
                          state={{ proScenario: scenario }}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-intuit-blue hover:underline"
                        >
                          {client.name}
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-intuit-gray-600">{client.email}</td>
                      {(scenario === 'consent_received' || scenario === 'existing') && (
                        <td className="px-6 py-4 text-sm text-intuit-gray-700" title={EST_COMP_TOOLTIP}>
                          {comp > 0 ? `$${comp}` : '—'}
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${ELIGIBILITY_STYLES[eligibility] || 'bg-intuit-gray-100'}`}>
                          {ELIGIBILITY_LABELS[eligibility] || eligibility}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[clientStatus] || 'bg-intuit-gray-100'}`}>
                          {STATUS_LABELS[clientStatus] || clientStatus}
                        </span>
                        {requestedProUpload && (
                          <Link
                            to={`/pro/client/${client.id}`}
                            state={{ proScenario: scenario, uploadForClient: true }}
                            className="block mt-1 text-xs text-intuit-blue font-medium hover:underline"
                          >
                            Upload for this client →
                          </Link>
                        )}
                      </td>
                      {scenario === 'existing' && (
                        <td className="px-6 py-4 text-sm">
                          {paid ? (
                            <span className="text-green-600 font-medium">Yes</span>
                          ) : (
                            <span className="text-intuit-gray-500">No</span>
                          )}
                        </td>
                      )}
                      <td className="px-6 py-4 text-sm text-intuit-gray-500">
                        {clientStatus === 'consent_rejected' && rejectionReason ? rejectionReason : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
