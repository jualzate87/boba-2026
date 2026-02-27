import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FIRM, PRO, CLIENTS } from '../../data/sampleData'

export default function ClientConsent() {
  const navigate = useNavigate()
  const { clientId } = useParams()
  const client = CLIENTS.find((c) => c.id === clientId) || CLIENTS[0]
  const [mode, setMode] = useState<'consent' | 'decline'>('consent')
  const [name, setName] = useState(client.name)
  const [email, setEmail] = useState(client.email)
  const [signature, setSignature] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [submitted, setSubmitted] = useState<'consent' | 'decline' | null>(null)

  const handleConsent = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted('consent')
    setTimeout(() => navigate(clientId ? `/client/start/${clientId}` : '/client/start'), 1500)
  }

  const handleDecline = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted('decline')
  }

  if (submitted === 'consent') {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg border border-intuit-gray-200 p-8 max-w-md text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">Thank you</h2>
          <p className="text-intuit-gray-600 mb-4">
            You're all set. Continue to get started with TurboTax Full Service.
          </p>
          <Link
            to={clientId ? `/client/start/${clientId}` : '/client/start'}
            className="inline-block px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
          >
            Continue
          </Link>
        </div>
      </div>
    )
  }

  if (submitted === 'decline') {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg border border-intuit-gray-200 p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">Thank you</h2>
          <p className="text-intuit-gray-600">
            We've recorded your response. If you change your mind, you can reach out to {PRO.name} or TurboTax directly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
            <span className="text-intuit-gray-400">|</span>
            <span className="text-intuit-gray-600">{FIRM.name}</span>
          </div>
          <Link to="/" className="text-sm text-intuit-gray-600 hover:text-intuit-blue">View as pro</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Transition consent</h1>
        <p className="text-intuit-gray-600 mb-6">
          {PRO.name} from {FIRM.name} has partnered with TurboTax. To complete the transition, we need your consent.
        </p>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('consent')}
            className={`px-4 py-2 rounded-md font-medium text-sm ${
              mode === 'consent' ? 'bg-intuit-blue text-white' : 'bg-intuit-gray-100 text-intuit-gray-600'
            }`}
          >
            I agree
          </button>
          <button
            onClick={() => setMode('decline')}
            className={`px-4 py-2 rounded-md font-medium text-sm ${
              mode === 'decline' ? 'bg-intuit-blue text-white' : 'bg-intuit-gray-100 text-intuit-gray-600'
            }`}
          >
            I decline
          </button>
        </div>

        {mode === 'consent' ? (
          <>
          <form onSubmit={handleConsent} className="bg-white rounded-lg border border-intuit-gray-200 p-6">
            <div className="mb-4 h-32 overflow-y-auto border border-intuit-gray-200 rounded p-4 bg-intuit-gray-50 text-sm text-intuit-gray-700">
              <p className="mb-2">
                By signing below, you consent to the transition of your tax preparation services from {FIRM.name} to TurboTax Full Service. TurboTax will handle your tax returns with the same care and expertise you expect.
              </p>
              <p>
                Your data will be used in accordance with Intuit's Privacy Statement. You can review the full terms at turbotax.intuit.com.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Signature</label>
                <input
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  required
                  placeholder="Type your full name to sign"
                  className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 rounded border-intuit-gray-300"
                />
                <span className="text-sm text-intuit-gray-700">I agree to the terms and transition of my tax preparation to TurboTax Full Service.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreed || !signature}
              className="w-full py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit consent
            </button>
          </form>

          <div className="mt-6 p-4 bg-intuit-gray-50 rounded-lg border border-intuit-gray-100">
            <p className="text-sm font-medium text-intuit-gray-700 mb-3">What you get with TurboTax Full Service</p>
            <ul className="text-sm text-intuit-gray-600 space-y-2">
              <li>• Quick experience — your expert prepares, signs, and files your return</li>
              <li>• Accuracy guaranteed — Full Service Guarantee backs your return</li>
              <li>• Meet in person or online — choose what works for you</li>
              <li>• Easy collaboration with your expert — upload documents, message, or video call</li>
              <li>• 24/7 support when you need it</li>
              <li>• Maximum refund guarantee</li>
            </ul>
          </div>
          </>
        ) : (
          <form onSubmit={handleDecline} className="bg-white rounded-lg border border-intuit-gray-200 p-6">
            <p className="text-intuit-gray-600 mb-4">
              We're sorry to hear that. Your response helps us improve.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-intuit-gray-700 mb-1">
                Why didn't you want to sign? (optional)
              </label>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
                placeholder="Share your reason, if you'd like..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 border border-intuit-gray-300 text-intuit-gray-700 font-medium rounded-md hover:bg-intuit-gray-50"
            >
              Submit
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
