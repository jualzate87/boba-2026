import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CLIENTS, CLIENT_STATUSES, CLIENT_RETURN_COMPLETED, PRO_DEMO_USER_KEY } from '../../data/sampleData'
import ProHeader from '../../components/ProHeader'

const ELIGIBILITY_LABELS: Record<string, string> = {
  serviceable: 'Serviceable',
  not_serviceable: 'Not serviceable',
  missing_document: 'Missing document',
  needs_review: 'Needs review',
}

const ELIGIBILITY_STYLES: Record<string, string> = {
  serviceable: 'bg-green-100 text-green-700',
  not_serviceable: 'bg-amber-100 text-amber-700',
  missing_document: 'bg-red-100 text-red-700',
  needs_review: 'bg-intuit-gray-100 text-intuit-gray-600',
}

const CLIENT_STATUS_LABELS: Record<string, string> = {
  not_contacted: 'Not contacted',
  email_sent: 'Email sent',
  email_opened: 'Email opened',
  consent_provided: 'Consent provided',
  consent_rejected: 'Consent rejected',
  account_created: 'Account created',
  help_requested: 'Help requested',
}

const CLIENT_STATUS_STYLES: Record<string, string> = {
  not_contacted: 'bg-intuit-gray-100 text-intuit-gray-600',
  email_sent: 'bg-intuit-gray-100 text-intuit-gray-700',
  email_opened: 'bg-blue-100 text-blue-700',
  consent_provided: 'bg-green-100 text-green-700',
  consent_rejected: 'bg-red-100 text-red-700',
  account_created: 'bg-green-100 text-green-700',
  help_requested: 'bg-amber-100 text-amber-700',
}

const EST_COMP_TOOLTIP = 'Provide calculations based on their prior year 1040.'

function getIsNewUser(location: ReturnType<typeof useLocation>): boolean {
  const fromState = location.state as { isNewUser?: boolean } | null
  if (typeof fromState?.isNewUser === 'boolean') return fromState.isNewUser
  return sessionStorage.getItem(PRO_DEMO_USER_KEY) !== 'existing'
}

export default function ProClientList() {
  const navigate = useNavigate()
  const location = useLocation()
  const isNewUser = getIsNewUser(location)
  const communicationSent = !isNewUser
  const [eligibilityFilter, setEligibilityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [additionalFilesDropped, setAdditionalFilesDropped] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const serviceableClients = CLIENTS.filter((c) => c.status === 'serviceable')

  const getDisplayStatus = (client: (typeof CLIENTS)[0]) => {
    if (!communicationSent) return 'not_contacted'
    return client.status === 'serviceable' ? (CLIENT_STATUSES[client.id] || 'email_sent') : 'not_contacted'
  }

  const filteredClients = CLIENTS.filter((c) => {
    if (eligibilityFilter !== 'all' && c.status !== eligibilityFilter) return false
    const status = getDisplayStatus(c)
    if (statusFilter !== 'all' && status !== statusFilter) return false
    return true
  })

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Review your clients</h1>
        <p className="text-intuit-gray-600 mb-6">
          We're open to all types of returns. Eligibility is based on TurboTax Full Service policy.{' '}
          <a href="https://ttlc.intuit.com/turbotax-support/en-us/help-article/customer-full-service-product/turbotax-full-service-cover-tax-situation/L3oLZHIYK_US_en_US" target="_blank" rel="noopener noreferrer" className="text-intuit-blue hover:underline">
            See eligibility details
          </a>
        </p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); setAdditionalFilesDropped(true) }}
          className={`mb-6 rounded-xl border-2 border-dashed transition-all min-h-[100px] flex flex-col items-center justify-center ${
            dragOver ? 'border-intuit-blue bg-intuit-blue/5' : 'border-intuit-gray-200 bg-white'
          }`}
        >
          <p className="text-sm font-medium text-intuit-gray-700">
            {additionalFilesDropped ? (
              <span className="text-green-600">✓ Additional files added. We're matching them to your clients.</span>
            ) : (
              <>
                <span className="text-intuit-blue">Add missing files?</span> Drag and drop additional prior year returns here to fill in gaps.
              </>
            )}
          </p>
          <p className="text-xs text-intuit-gray-500 mt-1">PDF or JPEG</p>
        </div>

        <div className="mb-4 flex gap-4 flex-wrap items-center">
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
          {communicationSent && (
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
          )}
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
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Prior Year Return</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Eligibility</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Client status</th>
                {!isNewUser && (
                  <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Paid</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => {
                const comp = (client as { estimatedComp?: number }).estimatedComp ?? 0
                const displayStatus = getDisplayStatus(client)
                const clientStatus = CLIENT_STATUSES[client.id] || 'email_sent'
                const returnCompleted = CLIENT_RETURN_COMPLETED[client.id]
                const paid = client.status === 'serviceable' && clientStatus === 'account_created' && returnCompleted
                return (
                  <tr key={client.id} className="border-b border-intuit-gray-100 hover:bg-intuit-gray-50/50">
                    <td className="px-4 py-3 text-sm text-intuit-gray-800">{client.name}</td>
                    <td className="px-4 py-3 text-sm text-intuit-gray-600">{client.email}</td>
                    <td className="px-4 py-3 text-sm text-intuit-gray-700" title={EST_COMP_TOOLTIP}>
                      {comp > 0 ? `$${comp}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {client.priorYearReturn ? (
                        <a href="#" className="text-intuit-blue hover:underline">{client.priorYearReturn}</a>
                      ) : (
                        <span className="text-intuit-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${ELIGIBILITY_STYLES[client.status]}`}>
                        {ELIGIBILITY_LABELS[client.status]}
                        {client.reason && `: ${client.reason}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${CLIENT_STATUS_STYLES[displayStatus] || 'bg-intuit-gray-100'}`}>
                        {CLIENT_STATUS_LABELS[displayStatus] || displayStatus}
                      </span>
                    </td>
                    {!isNewUser && (
                      <td className="px-4 py-3 text-sm">
                        {client.status === 'serviceable' ? (
                          paid ? (
                            <span className="text-green-600 font-medium">Yes</span>
                          ) : (
                            <span className="text-intuit-gray-500">No</span>
                          )
                        ) : (
                          <span className="text-intuit-gray-400">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Link to="/pro/upload" state={{ isNewUser }} className="text-intuit-blue hover:underline text-sm">
            Back to upload
          </Link>
          <button
            onClick={() => navigate('/pro/send', { state: { isNewUser } })}
            className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
          >
            Send communication to {serviceableClients.length} clients
          </button>
        </div>
      </main>
    </div>
  )
}
