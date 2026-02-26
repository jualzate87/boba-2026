import { Link } from 'react-router-dom'

export default function ProHeader() {
  return (
    <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-intuit-blue">Intuit</span>
          <span className="text-lg font-semibold text-intuit-gray-700">Accountants</span>
        </div>
        <nav className="flex gap-6">
          <Link to="/pro/dashboard" className="text-intuit-gray-600 hover:text-intuit-gray-800">Home</Link>
          <Link to="/pro/tracker" className="text-intuit-gray-600 hover:text-intuit-gray-800">Client Tracker</Link>
          <Link to="/client/email" className="text-intuit-blue font-medium">View as client</Link>
        </nav>
      </div>
    </header>
  )
}
