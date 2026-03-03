import { Link, useLocation } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import {
  getProScenario,
  EXISTING_USER_SERVICEABLE_COUNT,
  EXISTING_USER_ESTIMATED_COMP,
  EXISTING_USER_ACTIVITY_COUNTS,
  CLIENTS,
  CLIENT_STATUSES,
  CLIENT_REQUESTED_PRO_UPLOAD,
} from '../../data/sampleData'

const STEPS_DEFAULT = [
  { id: 'agreement', label: 'Sign agreement', description: 'Review and sign the terms for transitioning your book of business.', status: 'ready' as const, path: '/pro/agreement' },
  { id: 'business', label: 'Tell us about your business', description: 'Share your firm details and upload your logo for client communications.', status: 'in_progress' as const, path: '/pro/business' },
  { id: 'upload', label: 'Upload your client list', description: 'Upload your client list with names and emails. We\'ll send consent requests after you review.', status: 'ready' as const, path: '/pro/upload' },
  { id: 'review', label: 'Review clients and send consent', description: 'See your client list, then send the consent request to all clients.', status: 'ready' as const, path: '/pro/clients' },
]

const STATUS_LABELS: Record<string, string> = {
  consent_request_sent: 'Consent request sent',
  email_sent: 'Email sent',
  email_opened: 'Email opened',
  consent_provided: 'Consent provided',
  consent_rejected: 'Consent rejected',
  documents_submitted: 'Documents submitted',
  serviceability_determined: 'Serviceability determined',
  account_created: 'Account created',
  starting_journey: 'Starting journey',
  help_requested: 'Help requested',
}

export default function ProDashboard() {
  const location = useLocation()
  const scenario = (location.state as { proScenario?: string } | null)?.proScenario ?? getProScenario()

  // Consent received: summary counts
  const consentProvidedCount = CLIENTS.filter((c) => ['consent_provided', 'account_created'].includes(CLIENT_STATUSES[c.id])).length
  const consentReceivedRequestingUpload = CLIENTS.filter(
    (c) => CLIENT_STATUSES[c.id] === 'consent_provided' && CLIENT_REQUESTED_PRO_UPLOAD[c.id]
  ).length
  const documentsUploadedCount = CLIENTS.filter((c) => CLIENT_STATUSES[c.id] === 'documents_submitted' || CLIENT_STATUSES[c.id] === 'serviceability_determined' || CLIENT_STATUSES[c.id] === 'account_created').length
  const consentRequestSentCount = CLIENTS.filter((c) => CLIENT_STATUSES[c.id] === 'consent_request_sent').length
  const declinedCount = CLIENTS.filter((c) => CLIENT_STATUSES[c.id] === 'consent_rejected').length

  const serviceableCount = scenario === 'existing' ? EXISTING_USER_SERVICEABLE_COUNT : 0
  const totalEstimatedComp = scenario === 'existing' ? EXISTING_USER_ESTIMATED_COMP : 0
  const activityCounts = scenario === 'existing' ? EXISTING_USER_ACTIVITY_COUNTS : {}

  // Scenario: New user
  if (scenario === 'new') {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <ProHeader />

        <main className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Welcome</h1>
          <p className="text-intuit-gray-600 mb-6">
            Here's what happens next. Complete each step below to transition your book of business. We'll guide you through the process.
          </p>

          <Link
            to="/pro/agreement"
            state={{ proScenario: 'new' }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-intuit-blue text-white font-semibold rounded-lg hover:bg-intuit-blue-dark transition-colors mb-10"
          >
            Get started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <div className="space-y-8">
            <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
                <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                  Your estimated compensation
                </h2>
              </div>
              <div className="p-6">
                <p className="text-intuit-gray-600 mb-2">
                  We'll calculate your estimated compensation once we have your full client list and clients have provided consent and documents. We use the output forms delivered within each return to estimate the total.
                </p>
                <p className="text-sm text-intuit-gray-500">
                  You'll see your estimate after clients submit their prior year documents. Payment is processed after the transition is complete and clients have been onboarded.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
                <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                  Your steps
                </h2>
              </div>
              <ul className="divide-y divide-intuit-gray-100">
                {STEPS_DEFAULT.map((step) => (
                  <li key={step.id} className="px-6 py-4 hover:bg-intuit-gray-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={step.path} className="font-medium text-intuit-blue hover:underline">
                          {step.label}
                        </Link>
                        <p className="text-sm text-intuit-gray-600 mt-1">{step.description}</p>
                      </div>
                      <span
                        className={`shrink-0 text-sm px-2.5 py-1 rounded-md ${
                          step.status === 'ready'
                            ? 'bg-intuit-gray-100 text-intuit-gray-600'
                            : step.status === 'in_progress'
                            ? 'bg-intuit-blue/10 text-intuit-blue'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {step.status === 'ready' ? 'Ready' : step.status === 'in_progress' ? 'In progress' : 'Complete'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
                <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                  Timeline
                </h2>
              </div>
              <ul className="p-6 space-y-2 text-sm text-intuit-gray-600">
                <li>• Estimated compensation: After clients submit prior year documents</li>
                <li>• Payment: After transition is complete and clients are onboarded</li>
                <li>• Contract signing: March 15, 2026</li>
                <li>• Client list upload: March 22, 2026</li>
                <li>• Consent request send: March 29, 2026</li>
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

  // Scenario: Consent received — clients have just consented and requested pro to upload
  if (scenario === 'consent_received') {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <ProHeader />

        <main className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Welcome back, Sarah</h1>
          <p className="text-intuit-gray-600 mb-8">
            Great news — some of your clients have provided consent and are ready for the next step.
          </p>

          {/* Notification banner with summary counts */}
          <section className="mb-8 rounded-xl border-2 border-intuit-blue bg-intuit-blue/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-blue/20 bg-intuit-blue/10">
              <h2 className="text-sm font-semibold text-intuit-blue uppercase tracking-wide">
                Action required
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                <div className="bg-white rounded-lg p-3 border border-intuit-gray-100">
                  <p className="text-2xl font-semibold text-intuit-gray-800">{consentProvidedCount}</p>
                  <p className="text-xs text-intuit-gray-600">Consent provided</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-intuit-gray-100">
                  <p className="text-2xl font-semibold text-intuit-gray-800">{documentsUploadedCount}</p>
                  <p className="text-xs text-intuit-gray-600">Documents uploaded</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-intuit-blue/20 bg-intuit-blue/5">
                  <p className="text-2xl font-semibold text-intuit-blue">{consentReceivedRequestingUpload}</p>
                  <p className="text-xs text-intuit-gray-600">Requesting pro upload</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-intuit-gray-100">
                  <p className="text-2xl font-semibold text-intuit-gray-800">{consentRequestSentCount}</p>
                  <p className="text-xs text-intuit-gray-600">Awaiting response</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-intuit-gray-100">
                  <p className="text-2xl font-semibold text-intuit-gray-800">{declinedCount}</p>
                  <p className="text-xs text-intuit-gray-600">Declined</p>
                </div>
              </div>
              <p className="text-intuit-gray-600 mb-4">
                {consentReceivedRequestingUpload} client{consentReceivedRequestingUpload !== 1 ? 's have' : ' has'} requested you to upload their prior year documents.
              </p>
              <Link
                to="/pro/tracker"
                state={{ proScenario: scenario }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
              >
                Upload documents for clients
              </Link>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Quick links
              </h2>
            </div>
            <ul className="p-6 space-y-2 text-sm text-intuit-gray-700">
              <li>
                <Link to="/pro/tracker" state={{ proScenario: scenario }} className="text-intuit-blue hover:underline">
                  View client tracker
                </Link>
              </li>
              <li>
                <Link to="/pro/upload" state={{ proScenario: scenario }} className="text-intuit-blue hover:underline">
                  Upload more client information
                </Link>
              </li>
              <li>
                <a href="#" className="text-intuit-blue hover:underline">Contact support</a>
              </li>
            </ul>
          </section>
        </main>
      </div>
    )
  }

  // Scenario: Existing user
  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Welcome back, Sarah</h1>
        <p className="text-intuit-gray-600 mb-8">
          Here's a quick overview of where things stand.
        </p>

        <div className="space-y-8">
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Your estimated compensation
              </h2>
            </div>
            <div className="p-6">
              <p className="text-2xl font-semibold text-intuit-blue mb-2">
                ${totalEstimatedComp.toLocaleString()}
              </p>
              <p className="text-sm text-intuit-gray-600 mb-2">
                Based on {serviceableCount} serviceable clients. We calculate this from the output forms in each prior year return.
              </p>
              <p className="text-sm text-intuit-gray-500">
                You'll receive payment after the transition is complete and clients have been onboarded to TurboTax Full Service.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Client activity at a glance
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(activityCounts).map(([status, count]) => (
                  <div key={status} className="bg-intuit-gray-50 rounded-lg p-4">
                    <p className="text-2xl font-semibold text-intuit-gray-800">{count}</p>
                    <p className="text-sm text-intuit-gray-600">{STATUS_LABELS[status] || status}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/pro/tracker"
                state={{ proScenario: scenario }}
                className="mt-6 inline-block px-4 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark text-sm"
              >
                See details
              </Link>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Quick links
              </h2>
            </div>
            <ul className="p-6 space-y-3 text-sm text-intuit-gray-700">
              <li>
                <Link to="/pro/agreement" state={{ proScenario: scenario }} className="text-intuit-blue hover:underline">
                  View signed contract
                </Link>
              </li>
              <li>
                <Link to="/pro/business" state={{ proScenario: scenario }} className="text-intuit-blue hover:underline">
                  View your profile
                </Link>
              </li>
              <li>
                <Link to="/pro/upload" state={{ proScenario: scenario }} className="text-intuit-blue hover:underline">
                  Upload more client information
                </Link>
              </li>
              <li>
                <a href="#" className="text-intuit-blue hover:underline">Contact support</a>
              </li>
            </ul>
          </section>

          <p className="text-sm text-intuit-gray-500">
            <a href="#" className="text-intuit-blue hover:underline">Eligibility details</a>
          </p>
        </div>
      </main>
    </div>
  )
}
