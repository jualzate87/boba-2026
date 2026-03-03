import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FIRM, PRO, CLIENTS } from '../../data/sampleData'

const DECLINE_REASONS = [
  { value: '', label: 'Select a reason (helps us improve)' },
  { value: 'file_myself', label: "I'll file myself" },
  { value: 'switching_pro', label: "I'm switching to another tax pro" },
  { value: 'not_ready', label: "I'm not ready to decide" },
  { value: 'privacy', label: 'Privacy concerns' },
  { value: 'other', label: 'Other' },
]

export default function ClientConsent() {
  const navigate = useNavigate()
  const { clientId } = useParams()
  const client = CLIENTS.find((c) => c.id === clientId) || CLIENTS[0]
  const [choice, setChoice] = useState<'agree' | 'decline' | null>(null)
  const [name, setName] = useState(client.name)
  const [email, setEmail] = useState(client.email)
  const [signature, setSignature] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [declineOther, setDeclineOther] = useState('')
  const [submitted, setSubmitted] = useState<'consent' | 'decline' | null>(null)
  const [password, setPassword] = useState('')

  const handleConsent = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted('consent')
    setTimeout(() => navigate(clientId ? `/client/account/${clientId}` : '/client/account', { state: { accountCreated: true } }), 1500)
  }

  const handleDecline = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted('decline')
  }

  if (submitted === 'consent') {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center px-4">
        <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-lg p-8 max-w-md text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">Thank you</h2>
          <p className="text-intuit-gray-600 mb-6">
            You're all set. Continue to create your account and get started with TurboTax Full Service.
          </p>
          <Link
            to={clientId ? `/client/account/${clientId}` : '/client/account'}
            className="inline-block px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
          >
            Continue
          </Link>
        </section>
      </div>
    )
  }

  if (submitted === 'decline') {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center px-4">
        <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-lg p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">Thank you</h2>
          <p className="text-intuit-gray-600">
            We've recorded your response. If you change your mind, you can reach out to {PRO.name} or TurboTax directly.
          </p>
        </section>
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
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Consent and account creation</h1>
        <p className="text-intuit-gray-600 mb-8">
          Provide your consent and create your TurboTax Full Service account in one step.
        </p>

        <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
            <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
              Consent and terms
            </h2>
          </div>
          <div className="p-6">
            <div className="h-40 overflow-y-auto border border-intuit-gray-200 rounded-lg p-4 bg-intuit-gray-50 text-sm text-intuit-gray-700 space-y-3 mb-6">
              <p>
                <strong>Consent:</strong> By choosing to agree below, you consent to the transition of your tax preparation services from {FIRM.name} to TurboTax Full Service.
              </p>
              <p>
                <strong>TurboTax Full Service Account Terms:</strong> You agree to create a TurboTax account and to the TurboTax Terms of Service, Privacy Statement, and E-Sign Consent. Your data will be used in accordance with Intuit's Privacy Statement. Full terms at turbotax.intuit.com.
              </p>
            </div>
            <h3 className="text-sm font-semibold text-intuit-gray-800 mb-4">Your decision</h3>
            <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setChoice('agree')}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                choice === 'agree'
                  ? 'border-intuit-blue bg-intuit-blue/5 ring-2 ring-intuit-blue/20'
                  : 'border-intuit-gray-200 bg-white hover:border-intuit-gray-300'
              }`}
            >
              <span className="block text-lg font-semibold text-intuit-gray-800 mb-1">I agree</span>
              <span className="block text-sm text-intuit-gray-600">I consent to the transition and want to continue with TurboTax Full Service.</span>
            </button>
            <button
              type="button"
              onClick={() => setChoice('decline')}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                choice === 'decline'
                  ? 'border-intuit-gray-700 bg-intuit-gray-50'
                  : 'border-intuit-gray-200 bg-white hover:border-intuit-gray-300'
              }`}
            >
              <span className="block text-lg font-semibold text-intuit-gray-800 mb-1">I decline</span>
              <span className="block text-sm text-intuit-gray-600">I don't want to move forward with this option.</span>
            </button>
          </div>
          </div>
        </section>

        {choice === 'agree' && (
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Account details
              </h2>
            </div>
            <form onSubmit={handleConsent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a password"
                  className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg"
                />
                <p className="mt-1 text-xs text-intuit-gray-500">
                  Your password lets you access your account and resume your journey at any point.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Signature</label>
                <input
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  required
                  placeholder="Type your full name to sign"
                  className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 rounded border-intuit-gray-300"
                />
                <span className="text-sm text-intuit-gray-700">I agree to the consent, TurboTax Full Service account terms, and transition of my tax preparation.</span>
              </label>
              <button
                type="submit"
                disabled={!agreed || !signature}
                className="w-full py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Consent and create account
              </button>
            </form>
            <div className="px-6 pb-6">
              <div className="p-4 bg-intuit-gray-50 rounded-lg border border-intuit-gray-100">
                <p className="text-sm font-medium text-intuit-gray-700 mb-3">What you get with TurboTax Full Service</p>
                <ul className="text-sm text-intuit-gray-600 space-y-2">
                  <li>• Quick experience — your expert prepares, signs, and files your return</li>
                  <li>• Accuracy guaranteed — Full Service Guarantee backs your return</li>
                  <li>• Meet in person or online — choose what works for you</li>
                  <li>• Easy collaboration — upload documents, message, or video call</li>
                  <li>• 24/7 support when you need it</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {choice === 'decline' && (
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Help us understand your decision
              </h2>
            </div>
            <form onSubmit={handleDecline} className="p-6 space-y-4">
              <p className="text-intuit-gray-600">
                We're sorry to hear that. Your feedback helps us improve.
              </p>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-700 mb-1">
                  Why didn't you want to move forward?
                </label>
                <select
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg bg-white"
                >
                  {DECLINE_REASONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              {declineReason === 'other' && (
                <div>
                  <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Please specify</label>
                  <textarea
                    value={declineOther}
                    onChange={(e) => setDeclineOther(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg"
                    placeholder="Share your reason..."
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 border border-intuit-gray-300 text-intuit-gray-700 font-medium rounded-lg hover:bg-intuit-gray-50"
              >
                Submit
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  )
}
