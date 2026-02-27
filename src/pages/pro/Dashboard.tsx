import { Link, useLocation } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import {
  PRO_DEMO_USER_KEY,
  EXISTING_USER_SERVICEABLE_COUNT,
  EXISTING_USER_ESTIMATED_COMP,
  EXISTING_USER_ACTIVITY_COUNTS,
} from '../../data/sampleData'

const STEPS_DEFAULT = [
  { id: 'agreement', label: 'Sign agreement', description: 'Review and sign the terms for transitioning your book of business.', status: 'ready' as const, path: '/pro/agreement' },
  { id: 'business', label: 'Tell us about your business', description: 'Share your firm details and upload your logo for client communications.', status: 'in_progress' as const, path: '/pro/business' },
  { id: 'upload', label: 'Upload your client data', description: 'Upload your client list and prior year returns. We\'ll organize and extract the information.', status: 'ready' as const, path: '/pro/upload' },
  { id: 'review', label: 'Review clients and send communication', description: 'See which clients we can serve, then send them the transition email.', status: 'ready' as const, path: '/pro/clients' },
]

const STATUS_LABELS: Record<string, string> = {
  email_sent: 'Email sent',
  email_opened: 'Email opened',
  consent_provided: 'Consent provided',
  consent_rejected: 'Consent rejected',
  account_created: 'Account created',
  help_requested: 'Help requested',
}

function getIsNewUser(location: ReturnType<typeof useLocation>): boolean {
  const fromState = location.state as { isNewUser?: boolean } | null
  if (typeof fromState?.isNewUser === 'boolean') return fromState.isNewUser
  return sessionStorage.getItem(PRO_DEMO_USER_KEY) !== 'existing'
}

export default function ProDashboard() {
  const location = useLocation()
  const isNewUser = getIsNewUser(location)

  const serviceableCount = isNewUser ? 0 : EXISTING_USER_SERVICEABLE_COUNT
  const totalEstimatedComp = isNewUser ? 0 : EXISTING_USER_ESTIMATED_COMP
  const activityCounts = isNewUser ? {} : EXISTING_USER_ACTIVITY_COUNTS

  // State 1: New user (steps not complete) – original encouraging design
  if (isNewUser) {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <ProHeader />

        <main className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Welcome</h1>
          <p className="text-intuit-gray-600 mb-8">
            Here's what happens next. Complete each step below to transition your book of business. We'll guide you through the process.
          </p>

          <div className="space-y-6">
            <section className="bg-white rounded-lg border border-intuit-gray-200 p-6">
              <h2 className="text-lg font-medium text-intuit-gray-800 mb-2">Your estimated compensation</h2>
              <p className="text-intuit-gray-600 mb-2">
                We'll calculate your estimated compensation once we have your full client list and prior year returns. We use the output forms delivered within each return to estimate the total.
              </p>
              <p className="text-sm text-intuit-gray-500">
                You'll see your estimate after you complete the upload step. Payment is processed after the transition is complete and clients have been onboarded.
              </p>
            </section>

            <section className="bg-white rounded-lg border border-intuit-gray-200 p-6">
              <h2 className="text-lg font-medium text-intuit-gray-800 mb-4">Your steps</h2>
              <ul className="space-y-4">
                {STEPS_DEFAULT.map((step) => (
                  <li key={step.id} className="border-b border-intuit-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={step.path} className="font-medium text-intuit-blue hover:underline">
                          {step.label}
                        </Link>
                        <p className="text-sm text-intuit-gray-600 mt-1">{step.description}</p>
                      </div>
                      <span className={`shrink-0 text-sm px-2 py-0.5 rounded ${
                        step.status === 'ready' ? 'bg-intuit-gray-100 text-intuit-gray-600' :
                        step.status === 'in_progress' ? 'bg-intuit-blue/10 text-intuit-blue' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {step.status === 'ready' ? 'Ready' : step.status === 'in_progress' ? 'In progress' : 'Complete'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-lg border border-intuit-gray-200 p-6">
              <h2 className="text-lg font-medium text-intuit-gray-800 mb-4">Timeline</h2>
              <ul className="space-y-2 text-sm text-intuit-gray-600">
                <li>• Estimated compensation: After you upload client data</li>
                <li>• Payment: After transition is complete and clients are onboarded</li>
                <li>• Contract signing: March 15, 2026</li>
                <li>• Client data upload: March 22, 2026</li>
                <li>• Communication send: March 29, 2026</li>
              </ul>
            </section>

            <p className="text-sm text-intuit-gray-500">
              Questions? <a href="#" className="text-intuit-blue hover:underline">Contact us</a>
            </p>
          </div>
        </main>
      </div>
    )
  }

  // State 2: Existing user (Sarah) – dynamic content with comp, activity, revised steps
  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Welcome back, Sarah</h1>
        <p className="text-intuit-gray-600 mb-8">
          Here's a quick overview of where things stand.
        </p>

        <div className="space-y-6">
          <section className="bg-white rounded-lg border border-intuit-gray-200 p-6">
            <h2 className="text-lg font-medium text-intuit-gray-800 mb-2">Your estimated compensation</h2>
            <p className="text-2xl font-semibold text-intuit-blue mb-2">
              ${totalEstimatedComp.toLocaleString()}
            </p>
            <p className="text-sm text-intuit-gray-600 mb-2">
              Based on {serviceableCount} serviceable clients. We calculate this from the output forms in each prior year return.
            </p>
            <p className="text-sm text-intuit-gray-500">
              You'll receive payment after the transition is complete and clients have been onboarded to TurboTax Full Service.
            </p>
          </section>

          <section className="bg-white rounded-lg border border-intuit-gray-200 p-6">
            <h2 className="text-lg font-medium text-intuit-gray-800 mb-4">Client activity at a glance</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(activityCounts).map(([status, count]) => (
                <div key={status} className="bg-intuit-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-semibold text-intuit-gray-800">{count}</p>
                  <p className="text-sm text-intuit-gray-600">{STATUS_LABELS[status] || status}</p>
                </div>
              ))}
            </div>
            <Link
              to="/pro/tracker"
              state={{ isNewUser: false }}
              className="mt-4 inline-block px-4 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark text-sm"
            >
              See details
            </Link>
          </section>

          <section className="bg-white rounded-lg border border-intuit-gray-200 p-6">
            <h2 className="text-lg font-medium text-intuit-gray-800 mb-4">You've completed most steps</h2>
            <p className="text-sm text-intuit-gray-600 mb-4">
              Here's what you can still do:
            </p>
            <ul className="space-y-2 text-sm text-intuit-gray-700 mb-4">
              <li>
                <Link to="/pro/agreement" state={{ isNewUser: false }} className="text-intuit-blue hover:underline">View signed contract</Link>
              </li>
              <li>
                <Link to="/pro/business" state={{ isNewUser: false }} className="text-intuit-blue hover:underline">View your profile</Link>
              </li>
              <li>
                <Link to="/pro/upload" state={{ isNewUser: false }} className="text-intuit-blue hover:underline">Upload more client information</Link>
              </li>
              <li>
                <a href="#" className="text-intuit-blue hover:underline">Contact support</a>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg border border-intuit-gray-200 p-6">
            <h2 className="text-lg font-medium text-intuit-gray-800 mb-2">Need help?</h2>
            <p className="text-intuit-gray-600 mb-4">
              Questions about the agreement, your compensation, or the transition process? We're here to help.
            </p>
            <a href="#" className="inline-block px-4 py-2 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50 font-medium text-sm">
              Contact support
            </a>
          </section>

          <p className="text-sm text-intuit-gray-500">
            <a href="#" className="text-intuit-blue hover:underline">Eligibility details</a>
          </p>
        </div>
      </main>
    </div>
  )
}
