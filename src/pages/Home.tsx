import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-intuit-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-intuit-gray-800 mb-2">BOBA 2026</h1>
        <p className="text-intuit-gray-600">Book of Business Acquisition Prototype</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/pro"
          className="px-8 py-4 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark transition-colors"
        >
          Pro Portal
        </Link>
        <Link
          to="/client/email"
          className="px-8 py-4 border-2 border-intuit-blue text-intuit-blue font-medium rounded-lg hover:bg-intuit-blue/5 transition-colors"
        >
          Client Flow (Email)
        </Link>
      </div>
    </div>
  )
}
