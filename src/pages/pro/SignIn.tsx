import { useNavigate, useSearchParams } from 'react-router-dom'
import { PRO_DEMO_USER_KEY } from '../../data/sampleData'

type ProScenario = 'new' | 'consent_received' | 'existing'

export default function ProSignIn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const scenarioParam = searchParams.get('scenario') as ProScenario | null

  const handleContinue = () => {
    // "Start as a new pro" lands in new user experience; URL param can override for prototype testing
    const scenario: ProScenario =
      (scenarioParam && ['new', 'consent_received', 'existing'].includes(scenarioParam) ? scenarioParam : null) ??
      'new'
    sessionStorage.setItem(PRO_DEMO_USER_KEY, scenario)
    navigate('/pro/dashboard', { state: { proScenario: scenario } })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-intuit-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-xl font-semibold text-intuit-gray-700">Accountants</span>
          </div>
          <h1 className="text-2xl font-semibold text-intuit-gray-800">Sign in</h1>
          <p className="mt-2 text-sm text-intuit-gray-600">
            Continue to your dashboard
          </p>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark transition-colors"
        >
          Start as a new pro
        </button>

        <p className="mt-6 text-center text-xs text-intuit-gray-500">
          Use the Prototype control to switch scenarios (New / Mid-transition / Completed).
        </p>
      </div>
    </div>
  )
}
