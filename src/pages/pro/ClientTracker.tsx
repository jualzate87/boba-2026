import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import { CLIENTS, CLIENT_STATUSES, CONSENT_REJECTION_REASONS, CLIENT_RETURN_COMPLETED, PRO_DEMO_USER_KEY, EXISTING_USER_CLIENTS, EXISTING_USER_RETURN_COMPLETED } from '../../data/sampleData'

const STATUS_LABELS: Record<string, string> = {
  not_contacted: 'Not contacted',
  email_sent: 'Email sent',
  email_opened: 'Email opened',
  consent_provided: 'Consent provided',
  consent_rejected: 'Consent rejected',
  account_created: 'Account created',
  help_requested: 'Help requested',
}

const STATUS_STYLES: Record<string, string> = {
  not_contacted: 'bg-intuit-gray-100 text-intuit-gray-600',
  email_sent: 'bg-intuit-gray-100 text-intuit-gray-700',
  email_opened: 'bg-blue-100 text-blue-700',
  consent_provided: 'bg-green-100 text-green-700',
  consent_rejected: 'bg-red-100 text-red-700',
  account_created: 'bg-green-100 text-green-700',
  help_requested: 'bg-amber-100 text-amber-700',
}

const ELIGIBILITY_LABELS: Record<string, string> = {
  serviceable: 'Serviceable',
  not_serviceable: 'Not serviceable',
  missing_document: 'Missing document',
}

const ELIGIBILITY_STYLES: Record<string, string> = {
  serviceable: 'bg-green-100 text-green-700',
  not_serviceable: 'bg-amber-100 text-amber-700',
  missing_document: 'bg-red-100 text-red-700',
}

const EST_COMP_TOOLTIP = 'Provide calculations based on their prior year 1040.'

function getIsNewUser(location: ReturnType<typeof useLocation>): boolean {
  const fromState = location.state as { isNewUser?: boolean } | null
  if (typeof fromState?.isNewUser === 'boolean') return fromState.isNewUser
  return sessionStorage.getItem(PRO_DEMO_USER_KEY) !== 'existing'
}

export default function ProClientTracker() {
  const location = useLocation()
  const isNewUser = getIsNewUser(location)
  const communicationSent = !isNewUser

  const clients = isNewUser ? CLIENTS : EXISTING_USER_CLIENTS

  const getDisplayStatus = (client: { id: string; status?: string }) => {
    if (!communicationSent) return 'not_contacted'
    if (isNewUser) {
      const c = client as (typeof CLIENTS)[0]
      if (c.status !== 'serviceable') return 'not_contacted'
      return CLIENT_STATUSES[client.id] || 'email_sent'
    }
    return (client as { status?: string }).status || 'email_sent'
  }

  const [eligibilityFilter, setEligibilityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredClients = clients.filter((c) => {
    const client = c as { status?: string; id: string }
    const eligibility = isNewUser ? (c as (typeof CLIENTS)[0]).status : 'serviceable'
    if (eligibilityFilter !== 'all' && eligibility !== eligibilityFilter) return false
    const status = getDisplayStatus(client)
    if (statusFilter !== 'all' && status !== statusFilter) return false
    return true
  })

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Client status tracker</h1>
        <p className="text-intuit-gray-600 mb-6">Track which clients have received emails, provided consent, and created accounts.</p>

        <div className="mb-4 flex gap-4 flex-wrap items-center">
          {isNewUser && (
            <label className="flex items-center gap-2">
              <span className="text-sm text-intuit-gray-500">Eligibility:</span>
              <select
                value={eligibilityFilter}
                onChange={(e) => setEligibilityFilter(e.target.value)}
                className="px-3 py-1.5 rounded border border-intuit-gray-200 text-sm text-intuit-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-intuit-blue"
              >
                <option value="all">All</option>
                <option value="serviceable">Serviceable</option>
                <option value="not_serviceable">Not serviceable</option>
                <option value="missing_document">Missing document</option>
              </select>
            </label>
          )}
          <label className="flex items-center gap-2">
            <span className="text-sm text-intuit-gray-500">Client status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded border border-intuit-gray-200 text-sm text-intuit-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-intuit-blue"
            >
              <option value="all">All</option>
              <option value="not_contacted">Not contacted</option>
              <option value="email_sent">Email sent</option>
              <option value="consent_provided">Consent provided</option>
              <option value="account_created">Account created</option>
            </select>
          </label>
        </div>

        <div className="bg-white rounded-lg border border-intuit-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-intuit-gray-50 border-b border-intuit-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Client Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Email</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">
                  <span title={EST_COMP_TOOLTIP} className="border-b border-dotted border-intuit-gray-500 cursor-help">
                    Est. Comp.
                  </span>
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Eligibility</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Client status</th>
                {!isNewUser && (
                  <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Paid</th>
                )}
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => {
                const clientStatus = getDisplayStatus(client as { id: string; status?: string })
                const comp = (client as { estimatedComp?: number }).estimatedComp ?? 0
                const returnCompleted = isNewUser ? CLIENT_RETURN_COMPLETED[client.id] : EXISTING_USER_RETURN_COMPLETED[client.id]
                const paid = clientStatus === 'account_created' && returnCompleted
                const rejectionReason = isNewUser ? CONSENT_REJECTION_REASONS[client.id] : undefined
                const eligibility = isNewUser ? (client as (typeof CLIENTS)[0]).status : 'serviceable'
                return (
                  <tr key={client.id} className="border-b border-intuit-gray-100">
                    <td className="px-4 py-3 text-sm text-intuit-gray-800">{client.name}</td>
                    <td className="px-4 py-3 text-sm text-intuit-gray-600">{client.email}</td>
                    <td className="px-4 py-3 text-sm text-intuit-gray-700" title={EST_COMP_TOOLTIP}>
                      {comp > 0 ? `$${comp}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${ELIGIBILITY_STYLES[eligibility] || 'bg-intuit-gray-100'}`}>
                        {ELIGIBILITY_LABELS[eligibility] || eligibility}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[clientStatus] || 'bg-intuit-gray-100'}`}>
                        {STATUS_LABELS[clientStatus] || clientStatus}
                      </span>
                    </td>
                    {!isNewUser && (
                      <td className="px-4 py-3 text-sm">
                        {paid ? (
                          <span className="text-green-600 font-medium">Yes</span>
                        ) : (
                          <span className="text-intuit-gray-500">No</span>
                        )}
                      </td>
                    )}
                    <td className="px-4 py-3 text-sm text-intuit-gray-500">
                      {clientStatus === 'consent_rejected' && rejectionReason ? rejectionReason : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
