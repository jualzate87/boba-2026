import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CLIENTS, FIRM, PRO, getProScenario, setProHasSentConsent } from '../../data/sampleData'
import ProHeader from '../../components/ProHeader'

export default function ProSendCommunication() {
  const navigate = useNavigate()
  const location = useLocation()
  const clientCount = (location.state as { clientCount?: number } | null)?.clientCount ?? CLIENTS.length
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    const scenario = (location.state as { proScenario?: string })?.proScenario ?? getProScenario()
    if (scenario === 'new') setProHasSentConsent(true)
    setSent(true)
    setTimeout(() => navigate('/pro/tracker', { state: { proScenario: scenario } }), 2000)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-intuit-gray-200 shadow-lg p-8 max-w-md text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">Consent requests sent</h2>
          <p className="text-intuit-gray-600 mb-6">
            We've sent the consent request to {clientCount} clients. Each will receive a unique link to provide consent and create their account.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/pro/tracker"
              state={{ proScenario: (location.state as { proScenario?: string })?.proScenario ?? getProScenario() }}
              className="inline-block px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
            >
              View client tracker
            </Link>
            <Link to="/client/email" className="text-sm text-intuit-blue hover:underline">
              View as client
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Send consent request</h1>
        <p className="text-intuit-gray-600 mb-8">
          You are about to send a consent request to <strong>{clientCount} clients</strong>. Each will receive a unique link with a personalized message from you.
        </p>

        <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
            <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
              Email preview
            </h2>
          </div>
          <div className="p-6">
            <div className="border border-intuit-gray-200 rounded-lg p-5 bg-white">
              <div className="mb-4 pb-3 border-b border-intuit-gray-200 space-y-1">
                <p className="text-xs text-intuit-gray-500">
                  <strong>From:</strong> {PRO.email} ({FIRM.name})
                </p>
                <p className="text-xs text-intuit-gray-500">
                  <strong>To:</strong> [Client email]
                </p>
                {(FIRM as { logoUrl?: string }).logoUrl && (
                  <img src={(FIRM as { logoUrl?: string }).logoUrl} alt="" className="h-10 w-auto object-contain mt-2" />
                )}
              </div>
              <p className="text-sm text-intuit-gray-500 mb-3">
                <strong>Subject:</strong> Important update about your taxes — {PRO.name}
              </p>
              <div className="text-sm text-intuit-gray-700 space-y-4">
                <p>Dear [Client],</p>
                <p>
                  I am working with the TurboTax Full Service team to help you find the best service alternative after my retirement—or our transition. I want to make sure your taxes continue to be handled with the same care and expertise you expect.
                </p>
                <p>
                  <strong>Here's why I think this is a great idea:</strong> TurboTax Full Service offers qualified experts, accuracy guarantees, year-round support, and a smooth handoff. Your new expert will have access to the context they need to serve you well.
                </p>
                <p>
                  If you think this will work for you, please sign your consent to move forward. It only takes a moment, and you'll be able to create your account and get matched with the right expert for your situation.
                </p>
              </div>
              <a
                href="#"
                className="inline-block mt-4 px-5 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-lg text-sm font-medium hover:bg-intuit-gray-50"
              >
                Review and provide consent
              </a>
              <p className="mt-4 text-xs text-intuit-gray-500">
                This link is unique to you. If you have questions, reply to this email or call us.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex gap-4">
          <Link
            to="/pro/clients"
            state={{ proScenario: (location.state as { proScenario?: string })?.proScenario, manuallyAddedClients: (location.state as { manuallyAddedClients?: unknown })?.manuallyAddedClients }}
            className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-lg hover:bg-intuit-gray-50 font-medium"
          >
            Back
          </Link>
          <button
            onClick={handleSend}
            className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
          >
            Send to {clientCount} clients
          </button>
        </div>
      </main>
    </div>
  )
}
