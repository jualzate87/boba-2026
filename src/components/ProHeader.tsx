import { Link, useLocation } from 'react-router-dom'
import { getProScenario } from '../data/sampleData'
import NewsletterFloatingButton from './NewsletterFloatingButton'

export default function ProHeader() {
  const location = useLocation()
  const scenario = getProScenario()
  const isNewUser = scenario === 'new'

  return (
    <>
      <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-gray-700">Accountants</span>
          </div>
          <nav className="flex gap-6">
            <Link
              to="/pro/dashboard"
              state={{ proScenario: scenario }}
              className="text-intuit-gray-600 hover:text-intuit-gray-800"
            >
              Home
            </Link>
            <Link
              to="/pro/tracker"
              state={{ proScenario: scenario }}
              className="text-intuit-gray-600 hover:text-intuit-gray-800"
            >
              Client Tracker
            </Link>
          </nav>
        </div>
      </header>
      <NewsletterFloatingButton
        visible={!isNewUser && location.pathname !== '/pro/newsletter'}
      />
    </>
  )
}
