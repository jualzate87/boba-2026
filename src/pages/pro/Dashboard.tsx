import { Link } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'

const STEPS = [
  {
    id: 'agreement',
    label: 'Sign agreement',
    description: 'Review and sign the terms for transitioning your book of business.',
    status: 'ready',
    path: '/pro/agreement',
  },
  {
    id: 'business',
    label: 'Tell us about your business',
    description: 'Share your firm details and upload your logo for client communications.',
    status: 'in_progress',
    path: '/pro/business',
  },
  {
    id: 'upload',
    label: 'Upload your client data',
    description: 'Upload your client list and prior year returns. We\'ll organize and extract the information.',
    status: 'ready',
    path: '/pro/upload',
  },
  {
    id: 'review',
    label: 'Review clients and send communication',
    description: 'See which clients we can serve, then send them the transition email.',
    status: 'ready',
    path: '/pro/clients',
  },
]

export default function ProDashboard() {
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
              {STEPS.map((step) => (
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
