import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CLIENTS, FIRM, PRO } from '../../data/sampleData'
import ProHeader from '../../components/ProHeader'

const serviceableCount = CLIENTS.filter((c) => c.status === 'serviceable').length

export default function ProSendCommunication() {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    setTimeout(() => navigate('/pro/tracker'), 2000)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-intuit-gray-200 p-8 max-w-md text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">Emails sent</h2>
          <p className="text-intuit-gray-600 mb-4">
            We've sent the communication to {serviceableCount} clients. Switch to client mode to experience the journey.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/pro/tracker"
              className="inline-block px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
            >
              View client tracker
            </Link>
            <Link
              to="/client/email"
              className="text-sm text-intuit-blue hover:underline"
            >
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
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-6">Send communication to clients</h1>

        <div className="bg-white rounded-lg border border-intuit-gray-200 p-6 space-y-6">
          <p className="text-intuit-gray-600">
            You are about to send an email to <strong>{serviceableCount} clients</strong>. Each will receive a unique link to provide consent. Use "View as client" in the header to experience the journey.
          </p>

          <section className="border border-intuit-gray-200 rounded-lg p-4 bg-intuit-gray-50">
            <h3 className="text-sm font-medium text-intuit-gray-700 mb-3">Email preview</h3>
            <div className="bg-white rounded border border-intuit-gray-200 p-4 text-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                <span className="text-intuit-blue font-bold">Intuit</span>
                <span className="text-intuit-red font-semibold">TurboTax</span>
                <span className="text-intuit-gray-400">|</span>
                <span className="text-intuit-gray-600">{FIRM.name}</span>
              </div>
              <p className="text-intuit-gray-600 mb-2">
                <strong>Subject:</strong> Important update about your taxes — {PRO.name}
              </p>
              <p className="text-intuit-gray-700 mb-4">
                Dear [Client],<br /><br />
                After many years of serving you, I'm writing to share an important update. I've partnered with TurboTax to ensure your taxes continue to be handled by experts you can trust. TurboTax Full Service offers the same quality you're used to—with qualified experts, accuracy guarantees, and year-round support.<br /><br />
                I need you to provide consent to complete this transition. It only takes a moment.
              </p>
              <a href="#" className="inline-block px-4 py-2 bg-intuit-blue text-white rounded text-sm font-medium">
                Review and provide consent
              </a>
            </div>
          </section>

          <div className="flex gap-4">
            <Link
              to="/pro/clients"
              className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50"
            >
              Back
            </Link>
            <button
              onClick={handleSend}
              className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
            >
              Send to {serviceableCount} clients
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
