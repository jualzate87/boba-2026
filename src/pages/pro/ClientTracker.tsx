import ProHeader from '../../components/ProHeader'
import { CLIENTS, CLIENT_STATUSES, CONSENT_REJECTION_REASONS } from '../../data/sampleData'

const STATUS_LABELS: Record<string, string> = {
  email_sent: 'Email sent',
  email_opened: 'Email opened',
  consent_provided: 'Consent provided',
  consent_rejected: 'Consent rejected',
  account_created: 'Account created',
  help_requested: 'Help requested',
}

const STATUS_STYLES: Record<string, string> = {
  email_sent: 'bg-intuit-gray-100 text-intuit-gray-700',
  email_opened: 'bg-blue-100 text-blue-700',
  consent_provided: 'bg-green-100 text-green-700',
  consent_rejected: 'bg-red-100 text-red-700',
  account_created: 'bg-green-100 text-green-700',
  help_requested: 'bg-amber-100 text-amber-700',
}

export default function ProClientTracker() {
  const serviceableClients = CLIENTS.filter((c) => c.status === 'serviceable')

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Client status tracker</h1>
        <p className="text-intuit-gray-600 mb-6">Track which clients have received emails, provided consent, and created accounts.</p>

        <div className="bg-white rounded-lg border border-intuit-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-intuit-gray-50 border-b border-intuit-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Client Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Email</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {serviceableClients.map((client) => {
                const status = CLIENT_STATUSES[client.id] || 'email_sent'
                const rejectionReason = CONSENT_REJECTION_REASONS[client.id]
                return (
                  <tr key={client.id} className="border-b border-intuit-gray-100">
                    <td className="px-4 py-3 text-sm text-intuit-gray-800">{client.name}</td>
                    <td className="px-4 py-3 text-sm text-intuit-gray-600">{client.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[status] || 'bg-intuit-gray-100'}`}>
                        {STATUS_LABELS[status] || status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-intuit-gray-500">
                      {status === 'consent_rejected' && rejectionReason ? rejectionReason : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex gap-2">
          <span className="text-sm text-intuit-gray-500">Filter:</span>
          {['All', 'Pending', 'In progress', 'Complete'].map((f) => (
            <button
              key={f}
              className="px-2 py-1 text-sm text-intuit-gray-600 hover:text-intuit-blue"
            >
              {f}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
