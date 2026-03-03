import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PRO_DEMO_USER_KEY, setProHasSentConsent } from '../data/sampleData'

type Scenario = 'pro_new' | 'pro_mid' | 'pro_completed' | 'client'

const SCENARIO_LABELS: Record<Scenario, string> = {
  pro_new: 'Pro (new)',
  pro_mid: 'Pro (mid-transition)',
  pro_completed: 'Pro (completed)',
  client: 'Client',
}

export default function ScenarioSwitcher() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleSwitch = (scenario: Scenario) => {
    setOpen(false)
    setProHasSentConsent(false)
    if (scenario === 'client') {
      navigate('/client/email')
      return
    }
    const value = scenario === 'pro_new' ? 'new' : scenario === 'pro_mid' ? 'consent_received' : 'existing'
    sessionStorage.setItem(PRO_DEMO_USER_KEY, value)
    navigate('/pro/dashboard', { state: { proScenario: value } })
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-sm border-t border-intuit-gray-200/80">
      <Link to="/" className="text-sm text-intuit-gray-500 hover:text-intuit-gray-700">
        Start over
      </Link>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-intuit-gray-500 hover:text-intuit-gray-700 border border-intuit-gray-200 rounded-lg bg-white/60 hover:bg-white"
        >
          Switch scenario
          <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <>
            <div
              className="fixed inset-0"
              aria-hidden="true"
              onClick={() => setOpen(false)}
            />
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-intuit-gray-200 rounded-lg shadow-lg py-1">
              {(Object.keys(SCENARIO_LABELS) as Scenario[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSwitch(s)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-intuit-gray-50 text-intuit-gray-700"
                >
                  {SCENARIO_LABELS[s]}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </footer>
  )
}
