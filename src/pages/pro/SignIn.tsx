import { Link, useNavigate } from 'react-router-dom'
import { PRO_DEMO_USER_KEY } from '../../data/sampleData'

export default function ProSignIn() {
  const navigate = useNavigate()

  const handleDemoSignIn = (isNewUser: boolean) => {
    sessionStorage.setItem(PRO_DEMO_USER_KEY, isNewUser ? 'new' : 'existing')
    navigate('/pro/dashboard', { state: { isNewUser } })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-intuit-gray-50 px-4">
      <Link to="/" className="absolute top-4 left-4 text-sm text-intuit-gray-500 hover:text-intuit-blue">Start over</Link>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-xl font-semibold text-intuit-gray-700">Accountants</span>
          </div>
          <h1 className="text-2xl font-semibold text-intuit-gray-800">Sign in</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-intuit-gray-200 p-6">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleDemoSignIn(true)}
              className="w-full py-3 text-sm border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50 font-medium"
            >
              New user
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn(false)}
              className="w-full py-3 text-sm bg-intuit-blue text-white rounded-md hover:bg-intuit-blue-dark font-medium"
            >
              Returning user
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
