import { Link, useParams } from 'react-router-dom'
import {
  CLIENTS,
  CLIENT_TAX_SITUATION,
  CLIENT_DOCUMENTS,
  RECOMMENDED_EXPERT,
  PRO,
} from '../../data/sampleData'

const COMPLEXITY_LABELS: Record<string, string> = {
  simple: 'Simple',
  moderate: 'Moderate',
  complex: 'Complex',
}

export default function ClientProfile() {
  const { clientId } = useParams()
  const client = CLIENTS.find((c) => c.id === clientId) || CLIENTS[0]
  const taxSituation = CLIENT_TAX_SITUATION[client.id]
  const documents = CLIENT_DOCUMENTS.filter((d) => d.clientId === client.id)

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
            <span className="text-intuit-gray-400">|</span>
            <span className="text-intuit-gray-600">Full Service</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Your profile</h1>
        <p className="text-intuit-gray-600 mb-8">
          Your tax situation based on the documents you and {PRO.name} have submitted.
        </p>

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
            </div>
          </section>

          {/* Tax situation */}
          {taxSituation && (
            <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
                <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                  Your tax situation
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
                    <p className="text-xs font-medium text-intuit-gray-500 uppercase tracking-wide mb-1">Your recommended expert</p>
                    <p className="text-intuit-gray-800 font-medium">{RECOMMENDED_EXPERT.name}</p>
                    <p className="text-sm text-intuit-gray-600 mt-1">{RECOMMENDED_EXPERT.matchReason}</p>
                  </div>
                )}
                {taxSituation.estimatedPrice && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-xs font-medium text-green-800 uppercase tracking-wide mb-1">Your estimated price</p>
                    <p className="text-2xl font-bold text-intuit-gray-800">${taxSituation.estimatedPrice}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Documents */}
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Documents submitted
              </h2>
            </div>
            <div className="p-6">
              {documents.length > 0 ? (
                <ul className="space-y-3">
                  {documents.map((doc, i) => (
                    <li key={i} className="flex items-center justify-between py-2 border-b border-intuit-gray-100 last:border-0">
                      <span className="text-intuit-gray-800 font-medium">{doc.fileName}</span>
                      <span className="text-xs text-intuit-gray-500">
                        Uploaded by {doc.uploadedBy === 'client' ? 'you' : PRO.name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-intuit-gray-500">No documents submitted yet.</p>
              )}
            </div>
          </section>

          <Link
            to={clientId ? `/client/account/${clientId}` : '/client/account'}
            className="inline-block px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
          >
            Continue to Full Service
          </Link>
        </div>
      </main>
    </div>
  )
}
