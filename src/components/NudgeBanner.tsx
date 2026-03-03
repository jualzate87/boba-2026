import { useNavigate, useLocation } from 'react-router-dom'
import { PRO_DEMO_USER_KEY } from '../data/sampleData'

type NudgeConfig = {
  path: string
  scenario?: string
  message: string
  action: string
  target: 'client' | 'pro_mid' | 'pro_completed'
}

const NUDGES: NudgeConfig[] = [
  {
    path: '/pro/send',
    scenario: 'new',
    message: 'After sending, use Prototype controls to switch to Client and try the consent flow.',
    action: 'Switch to Client',
    target: 'client',
  },
  {
    path: '/client/consent',
    message: 'You\'ve completed consent. Switch to Returning Pro to see how your pro tracks your progress.',
    action: 'Switch to Pro (mid-transition)',
    target: 'pro_mid',
  },
  {
    path: '/client/account',
    message: 'You\'ve requested your pro to upload documents. Switch to Pro (mid-transition) to see their view.',
    action: 'Switch to Pro (mid-transition)',
    target: 'pro_mid',
  },
]

// Shown on post-send confirmation (handled in SendCommunication component)
export const POST_SEND_NUDGE = {
  message: 'Consent requests sent. View as client to see what they receive.',
  action: 'View as client',
  target: '/client/email',
}

export default function NudgeBanner() {
  const navigate = useNavigate()
  const location = useLocation()
  const scenario = sessionStorage.getItem(PRO_DEMO_USER_KEY)

  const matchingNudge = NUDGES.find((n) => {
    const pathMatch = location.pathname.startsWith(n.path) || location.pathname === n.path
    if (n.scenario && scenario !== n.scenario) return false
    return pathMatch
  })

  if (!matchingNudge) return null

  const handleAction = () => {
    if (matchingNudge.target === 'client') {
      navigate('/client/email')
    } else if (matchingNudge.target === 'pro_mid') {
      sessionStorage.setItem(PRO_DEMO_USER_KEY, 'consent_received')
      navigate('/pro/dashboard', { state: { proScenario: 'consent_received' } })
    } else {
      sessionStorage.setItem(PRO_DEMO_USER_KEY, 'existing')
      navigate('/pro/dashboard', { state: { proScenario: 'existing' } })
    }
  }

  return (
    <div className="px-4 py-2 bg-intuit-gray-50 border-b border-intuit-gray-200">
      <div className="max-w-4xl mx-auto bg-intuit-blue/10 border border-intuit-blue/30 rounded-lg px-4 py-3 flex items-center justify-between gap-4">
      <p className="text-sm text-intuit-gray-700">{matchingNudge.message}</p>
      <button
        type="button"
        onClick={handleAction}
        className="shrink-0 px-3 py-1.5 text-sm font-medium text-intuit-blue hover:text-intuit-blue-dark hover:underline"
      >
        {matchingNudge.action}
      </button>
      </div>
    </div>
  )
}
