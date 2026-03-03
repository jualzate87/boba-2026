import { Link, useParams, useLocation } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import {
  CLIENTS,
  CLIENT_TAX_SITUATION,
  CLIENT_STATUSES,
  CLIENT_DOCUMENTS,
  CLIENT_PRIOR_YEAR_RETURN,
  RECOMMENDED_EXPERT,
  getProScenario,
} from '../../data/sampleData'

const STATUS_LABELS: Record<string, string> = {
  not_contacted: 'Not contacted',
  consent_request_sent: 'Consent request sent',
  consent_provided: 'Consent provided',
  documents_submitted: 'Documents submitted',
  serviceability_determined: 'Serviceability determined',
  account_created: 'Account created',
  starting_journey: 'Starting journey',
}

const COMPLEXITY_LABELS: Record<string, string> = {
  simple: 'Simple',
  moderate: 'Moderate',
  complex: 'Complex',
}

export default function ProClientProfile() {
  const { clientId } = useParams()
  const location = useLocation()
  const scenario = (location.state as { proScenario?: string } | null)?.proScenario ?? getProScenario()
  const uploadForClient = (location.state as { uploadForClient?: boolean } | null)?.uploadForClient
  const client = CLIENTS.find((c) => c.id === clientId) || CLIENTS[0]
  const taxSituation = CLIENT_TAX_SITUATION[client.id]
  const status = CLIENT_STATUSES[client.id] || 'not_contacted'
  const documents = CLIENT_DOCUMENTS.filter((d) => d.clientId === client.id)

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <Link
          to="/pro/tracker"
          state={{ proScenario: scenario }}
          className="inline-flex items-center gap-1 text-sm text-intuit-blue hover:underline mb-6 font-medium"
        >
          ← Back to client tracker
        </Link>

        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Client profile</h1>
        <p className="text-intuit-gray-600 mb-8">
          Profile and tax situation for {client.name}. Information is derived from documents submitted by the client or you.
        </p>

        {uploadForClient && (
          <section className="mb-8 rounded-xl border-2 border-intuit-blue bg-intuit-blue/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-blue/20 bg-intuit-blue/10">
              <h2 className="text-sm font-semibold text-intuit-blue uppercase tracking-wide">
                Upload documents for {client.name}
              </h2>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-intuit-gray-300 rounded-xl p-8 text-center bg-white">
                <p className="font-medium text-intuit-gray-700 mb-2">Drag and drop prior year return here</p>
                <p className="text-sm text-intuit-gray-500">PDF or JPEG — we'll match to {client.name}</p>
              </div>
            </div>
          </section>
        )}

        <div className="space-y-8">
          {/* Profile */}
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Profile
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Name</p>
                <p className="text-intuit-gray-800 font-medium">{client.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Email</p>
                <p className="text-intuit-gray-800">{client.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Status</p>
                <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-intuit-gray-100 text-intuit-gray-700">
                  {STATUS_LABELS[status] || status}
                </span>
              </div>
            </div>
          </section>

          {/* Tax situation */}
          {taxSituation && (
            <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
                <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                  Tax situation
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Income types</p>
                  <p className="text-intuit-gray-800">
                    {taxSituation.incomeTypes.length > 0 ? taxSituation.incomeTypes.join(', ') : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Complexity</p>
                  <p className="text-intuit-gray-800">{COMPLEXITY_LABELS[taxSituation.complexity] || taxSituation.complexity}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Serviceability</p>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${
                      taxSituation.serviceability === 'serviceable'
                        ? 'bg-green-100 text-green-700'
                        : taxSituation.serviceability === 'not_serviceable'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-intuit-gray-100 text-intuit-gray-600'
                    }`}
                  >
                    {taxSituation.serviceability === 'serviceable'
                      ? 'Serviceable'
                      : taxSituation.serviceability === 'not_serviceable'
                      ? 'Not serviceable'
                      : 'Pending'}
                  </span>
                  {taxSituation.serviceabilityReason && (
                    <p className="mt-2 text-sm text-intuit-gray-600">{taxSituation.serviceabilityReason}</p>
                  )}
                </div>
                {taxSituation.recommendedExpertId && (
                  <div>
                    <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Recommended expert</p>
                    <p className="text-intuit-gray-800 font-medium">{RECOMMENDED_EXPERT.name}</p>
                    <p className="text-sm text-intuit-gray-600 mt-1">{RECOMMENDED_EXPERT.matchReason}</p>
                  </div>
                )}
                {taxSituation.estimatedPrice && (
                  <div>
                    <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Potential quote</p>
                    <p className="text-xl font-semibold text-intuit-gray-800">${taxSituation.estimatedPrice}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Document tracking */}
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Document tracking
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-intuit-gray-700 mb-2">Documents submitted</h3>
                {documents.length > 0 ? (
                  <ul className="space-y-3">
                    {documents.map((doc, i) => (
                      <li key={i} className="flex items-center justify-between py-2 border-b border-intuit-gray-100 last:border-0">
                        <span className="text-intuit-gray-800 font-medium">{doc.fileName}</span>
                        <span className="text-xs text-intuit-gray-500">
                          Uploaded by {doc.uploadedBy === 'client' ? client.name : 'You'} • {doc.uploadedAt}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-intuit-gray-500">No documents submitted yet.</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-intuit-gray-700 mb-2">Documents needed</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    {CLIENT_PRIOR_YEAR_RETURN[client.id] ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-amber-600">○</span>
                    )}
                    <span className={CLIENT_PRIOR_YEAR_RETURN[client.id] ? 'text-intuit-gray-600 line-through' : 'text-intuit-gray-800'}>
                      Prior year 1040
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600">○</span>
                    <span className="text-intuit-gray-500 text-sm">W-2s (if applicable)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600">○</span>
                    <span className="text-intuit-gray-500 text-sm">1099s (if applicable)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
