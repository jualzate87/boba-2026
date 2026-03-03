import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import { getProScenario } from '../../data/sampleData'

const TERMS = `
BOOK OF BUSINESS ACQUISITION AGREEMENT

This Agreement ("Agreement") is entered into between Intuit Inc. ("Intuit") and the tax professional ("Professional") for the acquisition of the Professional's book of business.

1. DEFINITIONS
"Book of Business" means the client list, client data, and related tax preparation records owned or controlled by the Professional.

2. ACQUISITION TERMS
Intuit agrees to acquire the Book of Business in exchange for the compensation outlined in the attached schedule. The Professional agrees to transfer all client data and assist with the transition as described herein.

3. CLIENT TRANSITION
The Professional will provide client contact information and prior year returns as required. Intuit will communicate with clients regarding the transition to TurboTax Full Service. The Professional agrees to support this transition in good faith.

4. CONFIDENTIALITY
Both parties agree to maintain the confidentiality of client information and to comply with applicable privacy laws.

5. REPRESENTATIONS
The Professional represents that they have the authority to enter into this Agreement and to transfer the Book of Business as described.

6. TERM AND TERMINATION
This Agreement is effective upon signing and continues until the transition is complete or as otherwise terminated in accordance with its terms.
`.trim()

export default function ProSignAgreement() {
  const navigate = useNavigate()
  const location = useLocation()
  const scenario = (location.state as { proScenario?: string } | null)?.proScenario ?? getProScenario()
  const isNewUser = scenario === 'new'
  const [agreed, setAgreed] = useState(false)

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault()
    if (agreed) navigate('/pro/business', { state: { proScenario: scenario } })
  }

  if (!isNewUser) {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <ProHeader />
        <main className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-6">View signed contract</h1>
          <div className="bg-white rounded-lg border border-intuit-gray-200 p-6">
            <div className="h-64 overflow-y-auto border border-intuit-gray-200 rounded p-4 mb-6 bg-intuit-gray-50">
              <pre className="text-sm text-intuit-gray-700 whitespace-pre-wrap font-sans">{TERMS}</pre>
            </div>
            <p className="text-sm text-green-700 font-medium mb-4">✓ Signed on March 15, 2026</p>
            <Link
              to="/pro/dashboard"
              state={{ proScenario: scenario }}
              className="inline-block px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50"
            >
              Back to dashboard
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <div className="flex gap-2 text-sm text-intuit-gray-600 mb-2">
            <span className="font-medium text-intuit-blue">1. Sign agreement</span>
            <span>2. About your business</span>
            <span>3. Transition your clients</span>
          </div>
          <div className="h-1 bg-intuit-gray-200 rounded-full">
            <div className="h-full w-1/3 bg-intuit-blue rounded-full" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-6">Sign your agreement</h1>

        <form onSubmit={handleSign} className="bg-white rounded-lg border border-intuit-gray-200 p-6">
          <div className="h-64 overflow-y-auto border border-intuit-gray-200 rounded p-4 mb-6 bg-intuit-gray-50">
            <pre className="text-sm text-intuit-gray-700 whitespace-pre-wrap font-sans">{TERMS}</pre>
          </div>

          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 rounded border-intuit-gray-300"
            />
            <span className="text-sm text-intuit-gray-700">I have read and agree to the terms and conditions.</span>
          </label>

          <div className="flex gap-4">
            <Link
              to="/pro/dashboard"
              state={{ proScenario: scenario }}
              className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50"
            >
              Back
            </Link>
            <button
              type="submit"
              disabled={!agreed}
              className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
