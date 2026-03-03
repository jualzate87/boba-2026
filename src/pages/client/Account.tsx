import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import type { DocumentUpload } from '../../data/sampleData'
import {
  CLIENTS,
  RECOMMENDED_EXPERT,
  CLIENT_ESTIMATED_PRICE,
  CLIENT_PRICE_OFFER_REASON,
  CLIENT_OFFER_URGENCY,
  PRO,
} from '../../data/sampleData'

export default function ClientAccount() {
  const { clientId } = useParams()
  const location = useLocation()
  const accountCreated = (location.state as { accountCreated?: boolean } | null)?.accountCreated
  const client = clientId ? CLIENTS.find((c) => c.id === clientId) : null
  const [step, setStep] = useState<'signup' | 'documents' | 'serviceability' | 'expert_match' | 'matched'>(
    accountCreated ? 'documents' : 'signup'
  )
  const [email, setEmail] = useState(client?.email || 'demo@example.com')
  const [name, setName] = useState(client?.name || '')
  const [password, setPassword] = useState('')
  const [requestProUpload, setRequestProUpload] = useState(false)
  const [expertChoice, setExpertChoice] = useState<'accept' | 'other' | null>(null)
  const [localDocuments, setLocalDocuments] = useState<DocumentUpload[]>([])
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false)
  const [questionnaireStep, setQuestionnaireStep] = useState(0)
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string>>({})

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('documents')
  }

  const handleDocumentsNext = () => {
    setStep('serviceability')
  }

  const handleServiceabilityNext = () => {
    setStep('expert_match')
  }

  const handleAcceptExpert = () => {
    setExpertChoice('accept')
    setStep('matched')
  }

  const handleFindOther = () => {
    setExpertChoice('other')
    setStep('matched')
  }

  const TAX_QUESTIONNAIRE = [
    {
      id: 'returnType',
      question: 'What type of tax return do you expect to file?',
      options: ['Form 1040 (Individual)', 'Form 1040-NR (Nonresident alien)', 'Form 1040-SR (Senior)', 'Not sure'],
    },
    {
      id: 'incomeTypes',
      question: 'Which income types apply to you?',
      options: ['W-2 wages only', 'W-2 + 1099 freelance/contract', 'Self-employment (Schedule C)', 'Rental income', 'Investment income (interest, dividends)', 'Retirement (401k, IRA, pension)', 'Social Security', 'Multiple of the above'],
    },
    {
      id: 'deductions',
      question: 'How do you usually claim deductions?',
      options: ['Standard deduction', 'Itemized deductions (mortgage, charity, etc.)', 'Not sure'],
    },
    {
      id: 'lifeChanges',
      question: 'Did you have any major life changes in the past year?',
      options: ['Married or divorced', 'Bought or sold a home', 'Started or sold a business', 'Retired', 'None of these'],
    },
    {
      id: 'foreign',
      question: 'Do you have any foreign income, accounts, or assets over $10,000?',
      options: ['Yes', 'No'],
    },
  ]

  const handleSimulateUpload = () => {
    setLocalDocuments((prev) => [
      ...prev,
      {
        clientId: clientId || '',
        fileName: '1040_2024.pdf',
        uploadedBy: 'client',
        uploadedAt: new Date().toISOString().split('T')[0],
      },
    ])
  }

  // Serviceability analysis step
  if (step === 'serviceability') {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 max-w-6xl mx-auto">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-12">
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Analyzing your documents
              </h2>
            </div>
            <div className="p-6">
              <p className="text-intuit-gray-600 mb-4">
                We're analyzing your documentation to determine serviceability. This helps us match you with the right expert and ensure we can serve you.
              </p>
              <div className="flex items-center gap-2 text-intuit-blue">
                <div className="animate-spin h-4 w-4 border-2 border-intuit-blue border-t-transparent rounded-full" />
                <span className="text-sm font-medium">Analysis complete</span>
              </div>
            </div>
          </section>
          <button
            onClick={handleServiceabilityNext}
            className="w-full py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
          >
            Continue — serviceability determined
          </button>
        </main>
      </div>
    )
  }

  // Expert match step
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
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 bg-intuit-gray-200 rounded-full flex items-center justify-center text-intuit-gray-500 text-xl font-medium shrink-0">
                  {RECOMMENDED_EXPERT.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-intuit-gray-800">{RECOMMENDED_EXPERT.name}</p>
                  <p className="text-sm text-intuit-gray-600">{RECOMMENDED_EXPERT.yearsExperience} years of experience</p>
                  <p className="text-sm text-intuit-gray-600 mt-2">{RECOMMENDED_EXPERT.specialties.join(' · ')}</p>
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
                  className="flex-1 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
                >
                  Match with {RECOMMENDED_EXPERT.name}
                </button>
                <button
                  onClick={handleFindOther}
                  className="flex-1 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-lg hover:bg-intuit-gray-50 font-medium"
                >
                  Find other options
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  // Prior year documents step — flexible: questions + upload + request pro all visible
  if (step === 'documents') {
    const hasUploadedReturn = localDocuments.some((d) => d.fileName.includes('1040'))
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 max-w-6xl mx-auto">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Help us understand your tax situation</h1>
          <p className="text-intuit-gray-600 mb-8">
            To serve you well and match you with the right expert, we need to understand your tax situation. Use any option below — upload a prior year return to bypass questions, answer a short questionnaire, or ask your tax pro to submit for you.
          </p>

          {localDocuments.length > 0 && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-2">Documents submitted</p>
              <ul className="text-sm text-green-700 space-y-1">
                {localDocuments.map((d, i) => (
                  <li key={i}>
                    {d.fileName} — uploaded by {d.uploadedBy === 'client' ? 'you' : PRO.name}
                  </li>
                ))}
              </ul>
              {hasUploadedReturn && (
                <p className="text-sm text-green-700 mt-2">Prior year 1040 submitted — you can skip the questionnaire.</p>
              )}
            </div>
          )}

          <div className="space-y-6 mb-8">
            <section className="p-6 rounded-xl border-2 border-intuit-gray-200 bg-white">
              <h3 className="font-semibold text-intuit-gray-800 mb-2">Upload your prior year return</h3>
              <div
                onClick={handleSimulateUpload}
                className="border-2 border-dashed border-intuit-gray-300 rounded-lg p-8 text-center hover:border-intuit-blue/50 cursor-pointer transition-colors"
              >
                <p className="text-intuit-gray-600">Drag and drop your prior year 1040 (PDF or JPEG). Max 10MB.</p>
                <p className="text-sm text-intuit-gray-500 mt-1">Uploading bypasses the questionnaire.</p>
              </div>
            </section>

            {!hasUploadedReturn && (
              <section className="p-6 rounded-xl border-2 border-intuit-gray-200 bg-white">
                <h3 className="font-semibold text-intuit-gray-800 mb-2">Answer questions about your tax situation</h3>
                <p className="text-sm text-intuit-gray-600 mb-4">A short questionnaire. Takes about 5 minutes.</p>
                {questionnaireCompleted ? (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-800">Questionnaire completed</p>
                    <p className="text-sm text-green-700 mt-1">We've captured your tax situation.</p>
                  </div>
                ) : questionnaireStep === 0 ? (
                  <button
                    type="button"
                    onClick={() => setQuestionnaireStep(1)}
                    className="px-4 py-2 border border-intuit-gray-300 text-intuit-gray-700 rounded-lg hover:bg-intuit-gray-50 font-medium text-sm"
                  >
                    Start questionnaire
                  </button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-intuit-gray-800">
                      {questionnaireStep} of {TAX_QUESTIONNAIRE.length}. {TAX_QUESTIONNAIRE[questionnaireStep - 1].question}
                    </p>
                    <div className="space-y-2">
                      {TAX_QUESTIONNAIRE[questionnaireStep - 1].options.map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-intuit-gray-50">
                          <input
                            type="radio"
                            name={`q-${TAX_QUESTIONNAIRE[questionnaireStep - 1].id}`}
                            value={opt}
                            checked={questionnaireAnswers[TAX_QUESTIONNAIRE[questionnaireStep - 1].id] === opt}
                            onChange={() =>
                              setQuestionnaireAnswers((prev) => ({
                                ...prev,
                                [TAX_QUESTIONNAIRE[questionnaireStep - 1].id]: opt,
                              }))
                            }
                            className="rounded-full border-intuit-gray-300"
                          />
                          <span className="text-sm text-intuit-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      {questionnaireStep > 1 && (
                        <button
                          type="button"
                          onClick={() => setQuestionnaireStep((s) => s - 1)}
                          className="px-4 py-2 border border-intuit-gray-300 text-intuit-gray-700 rounded-lg hover:bg-intuit-gray-50 font-medium text-sm"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (questionnaireStep === TAX_QUESTIONNAIRE.length) {
                            setQuestionnaireCompleted(true)
                            setQuestionnaireStep(0)
                          } else {
                            setQuestionnaireStep((s) => s + 1)
                          }
                        }}
                        disabled={!questionnaireAnswers[TAX_QUESTIONNAIRE[questionnaireStep - 1].id]}
                        className="px-4 py-2 bg-intuit-blue text-white rounded-lg hover:bg-intuit-blue-dark font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {questionnaireStep === TAX_QUESTIONNAIRE.length ? 'Complete' : 'Next'}
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}

            <section className="p-6 rounded-xl border-2 border-intuit-gray-200 bg-white">
              <h3 className="font-semibold text-intuit-gray-800 mb-2">Don't have documents? Request your tax pro</h3>
              <p className="text-sm text-intuit-gray-600 mb-4">
                If you prefer {PRO.name} to upload your prior year documents, authorize them below.
              </p>
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border-2 border-intuit-gray-200 hover:border-intuit-blue/50 transition-colors">
                <input
                  type="checkbox"
                  checked={requestProUpload}
                  onChange={(e) => setRequestProUpload(e.target.checked)}
                  className="mt-1 rounded border-intuit-gray-300"
                />
                <span className="text-sm font-medium text-intuit-gray-800">
                  I authorize {PRO.name} to upload my prior year documents
                </span>
              </label>
              <p className="mt-2 text-xs text-intuit-gray-500">
                Your tax pro will see your request and can add documents for you.
              </p>
              {requestProUpload && (
                <p className="mt-2 text-sm font-medium text-green-700">Request sent to {PRO.name}.</p>
              )}
            </section>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDocumentsNext}
              className="flex-1 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
            >
              Continue
            </button>
            <button
              onClick={handleDocumentsNext}
              className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-lg hover:bg-intuit-gray-50 font-medium"
            >
              Skip for now
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Matched success
  if (step === 'matched') {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center px-4">
        <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">You're all set</h2>
          <p className="text-intuit-gray-600 mb-6">
            {expertChoice === 'accept'
              ? `${RECOMMENDED_EXPERT.name} will reach out shortly to complete your taxes. You can track progress in your TurboTax account.`
              : 'Your expert will reach out shortly to complete your taxes. You can track progress in your TurboTax account.'}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/client/landing"
              className="inline-block px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
            >
              Back to TurboTax Full Service
            </Link>
            <Link
              to={clientId ? `/client/profile/${clientId}` : '/client/profile'}
              className="text-sm text-intuit-blue hover:underline"
            >
              View your profile
            </Link>
          </div>
        </section>
      </div>
    )
  }

  // Signup step (create account)
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
          <p className="text-sm text-intuit-gray-600 mt-2">
            Create your account so we can create a personalized matching and determine how we can best serve you.
          </p>
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-intuit-gray-200 overflow-hidden">
          <form onSubmit={handleSignUp} className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-intuit-gray-700 mb-1">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg"
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
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg"
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
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
            >
              Create account
            </button>
            <p className="mt-4 text-center text-sm text-intuit-gray-600">
              Already have an account? <a href="#" className="text-intuit-blue hover:underline">Sign in</a>
            </p>
          </form>
        </section>

        <p className="mt-6 text-center text-sm text-intuit-gray-500">
          <Link to={clientId ? `/client/consent/${clientId}` : '/client/consent'} className="text-intuit-blue hover:underline">
            ← Back
          </Link>
        </p>
      </div>
    </div>
  )
}
