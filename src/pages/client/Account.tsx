import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CLIENTS, RECOMMENDED_EXPERT, CLIENT_ESTIMATED_PRICE, CLIENT_PRICE_OFFER_REASON, CLIENT_OFFER_URGENCY } from '../../data/sampleData'

export default function ClientAccount() {
  const { clientId } = useParams()
  const client = clientId ? CLIENTS.find((c) => c.id === clientId) : null
  const [step, setStep] = useState<'signup' | 'expert_match' | 'upload' | 'matched'>('signup')
  const [email, setEmail] = useState(client?.email || 'demo@example.com')
  const [name, setName] = useState(client?.name || '')
  const [password, setPassword] = useState('')
  const [expertChoice, setExpertChoice] = useState<'accept' | 'other' | null>(null)

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('expert_match')
  }

  const handleAcceptExpert = () => {
    setExpertChoice('accept')
    setStep('upload')
  }

  const handleFindOther = () => {
    setExpertChoice('other')
    setStep('upload')
  }

  if (step === 'expert_match') {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 max-w-6xl mx-auto">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Meet your recommended expert</h1>
          <p className="text-intuit-gray-600 mb-8">
            Based on your prior year return, we've matched you with an expert who specializes in your tax situation.
          </p>

          <div className="bg-white rounded-lg border border-intuit-gray-200 p-6 mb-6">
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 bg-intuit-gray-200 rounded-full flex items-center justify-center text-intuit-gray-500 text-xl font-medium shrink-0">
                {RECOMMENDED_EXPERT.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-intuit-gray-800">{RECOMMENDED_EXPERT.name}</p>
                <p className="text-sm text-intuit-gray-600">{RECOMMENDED_EXPERT.yearsExperience} years of experience</p>
                <p className="text-sm text-intuit-gray-600 mt-2">
                  {RECOMMENDED_EXPERT.specialties.join(' · ')}
                </p>
              </div>
            </div>
            <p className="text-sm text-intuit-gray-600 bg-intuit-gray-50 rounded-lg p-4 mb-4">
              {RECOMMENDED_EXPERT.matchReason}
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-xs font-medium text-green-800 uppercase tracking-wide mb-1">Special offer from TurboTax</p>
              <p className="text-2xl font-bold text-intuit-gray-800">${CLIENT_ESTIMATED_PRICE}</p>
              <p className="text-sm text-intuit-gray-600 mt-1">{CLIENT_PRICE_OFFER_REASON}</p>
              <p className="text-sm font-medium text-amber-800 mt-2">{CLIENT_OFFER_URGENCY}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAcceptExpert}
                className="flex-1 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
              >
                Match with {RECOMMENDED_EXPERT.name}
              </button>
              <button
                onClick={handleFindOther}
                className="flex-1 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50 font-medium"
              >
                Find other options
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (step === 'upload') {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 max-w-6xl mx-auto">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Start your Full Service journey</h1>
          <p className="text-intuit-gray-600 mb-8">
            Upload your tax documents to help your expert get started. You can add more later.
          </p>

          <div className="bg-white rounded-lg border border-intuit-gray-200 p-6 mb-6">
            <h2 className="font-medium text-intuit-gray-800 mb-4">Upload documents</h2>
            <div className="border-2 border-dashed border-intuit-gray-300 rounded-lg p-8 text-center text-intuit-gray-500 mb-4">
              Drag and drop W-2s, 1099s, and other tax documents here, or click to browse
            </div>
            <p className="text-sm text-intuit-gray-500">
              We accept PDF, JPEG, and PNG. Max 10MB per file.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep('matched')}
              className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
            >
              Skip for now
            </button>
            <button
              onClick={() => setStep('matched')}
              className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50"
            >
              Upload and continue
            </button>
          </div>

          <p className="mt-6 text-sm text-intuit-gray-500">
            <a href="#" className="text-intuit-blue hover:underline">Request help</a> or <a href="#" className="text-intuit-blue hover:underline">view more resources</a>
          </p>
        </main>
      </div>
    )
  }

  if (step === 'matched') {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg border border-intuit-gray-200 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">You're all set</h2>
          <p className="text-intuit-gray-600 mb-6">
            {expertChoice === 'accept'
              ? `${RECOMMENDED_EXPERT.name} will reach out shortly to complete your taxes. You can track progress in your TurboTax account.`
              : 'Your expert will reach out shortly to complete your taxes. You can track progress in your TurboTax account.'}
          </p>
          <Link
            to="/client/landing"
            className="inline-block px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
          >
            Back to TurboTax Full Service
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-intuit-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-xl font-semibold text-intuit-red">TurboTax</span>
          </div>
          <h1 className="text-2xl font-semibold text-intuit-gray-800">Create your account</h1>
          <p className="text-intuit-gray-600 mt-2">Sign up to continue with TurboTax Full Service</p>
          {client && (
            <p className="text-sm text-intuit-gray-500 mt-1">We've pre-filled your information from your tax pro.</p>
          )}
        </div>

        <form onSubmit={handleSignUp} className="bg-white rounded-lg shadow-sm border border-intuit-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-intuit-gray-700 mb-1">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-intuit-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-intuit-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
          >
            Create account
          </button>
          <p className="mt-4 text-center text-sm text-intuit-gray-600">
            Already have an account? <a href="#" className="text-intuit-blue hover:underline">Sign in</a>
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-intuit-gray-500">
          <Link to={clientId ? `/client/start/${clientId}` : '/client/start'} className="text-intuit-blue hover:underline">← Back</Link>
        </p>
      </div>
    </div>
  )
}
