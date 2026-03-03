import { Link, useParams } from 'react-router-dom'
import { RECOMMENDED_EXPERT } from '../../data/sampleData'

export default function ClientStartExperience() {
  const { clientId } = useParams()
  const accountUrl = clientId ? `/client/account/${clientId}` : '/client/account'

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
            <span className="text-intuit-gray-400">|</span>
            <span className="text-intuit-gray-600">Full Service</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">You're all set</h1>
          <p className="text-intuit-gray-600">
            The best way to move forward is to start your experience. That way you can meet the expert we recommend for you—based on your documents.
          </p>
        </div>

        {/* Recommended expert preview */}
        <div className="bg-white rounded-lg border border-intuit-gray-200 p-6 mb-8">
          <h2 className="text-lg font-medium text-intuit-gray-800 mb-4">Your recommended expert</h2>
          <div className="flex gap-4 mb-4">
            <div className="w-16 h-16 bg-intuit-gray-200 rounded-full flex items-center justify-center text-intuit-gray-500 text-xl font-medium shrink-0">
              {RECOMMENDED_EXPERT.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-semibold text-intuit-gray-800">{RECOMMENDED_EXPERT.name}</p>
              <p className="text-sm text-intuit-gray-600">{RECOMMENDED_EXPERT.yearsExperience} years of experience</p>
              <p className="text-sm text-intuit-gray-600 mt-2">
                Specializes in: {RECOMMENDED_EXPERT.specialties.join(', ')}
              </p>
            </div>
          </div>
          <p className="text-sm text-intuit-gray-600 bg-intuit-gray-50 rounded-lg p-4">
            {RECOMMENDED_EXPERT.matchReason}
          </p>
          <p className="text-sm text-intuit-gray-600 mt-4">
            Create an account to connect with {RECOMMENDED_EXPERT.name}, learn more about your personalized offer, or explore other expert options.
          </p>
        </div>

        <div className="mb-6 p-4 bg-intuit-gray-50 rounded-lg border border-intuit-gray-100">
          <p className="text-sm font-medium text-intuit-gray-700 mb-3">Benefits of creating your account now</p>
          <ul className="text-sm text-intuit-gray-600 space-y-2">
            <li>• Lock in your expert match and personalized offer</li>
            <li>• Upload documents and get started quickly</li>
            <li>• Connect with your expert to answer questions</li>
            <li>• Pre-filled information from your tax pro — less to type</li>
          </ul>
        </div>

        <Link
          to={accountUrl}
          className="block w-full py-3 bg-intuit-blue text-white text-center font-medium rounded-md hover:bg-intuit-blue-dark"
        >
          Create account and get started
        </Link>

        <p className="mt-6 text-center text-sm text-intuit-gray-500">
          We'll pre-fill your information from what your tax pro shared with us.
        </p>
      </main>
    </div>
  )
}
