import { Link } from 'react-router-dom'
import { FIRM, PRO } from '../../data/sampleData'

export default function ClientEmail() {
  return (
    <div className="min-h-screen bg-intuit-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-intuit-gray-500 mb-4">Email mockup — as the client would see it</p>

        <div className="bg-white rounded-lg border border-intuit-gray-200 shadow-sm overflow-hidden">
          {/* Email header */}
          <div className="border-b border-intuit-gray-200 px-6 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-intuit-blue">Intuit</span>
              <span className="text-base font-semibold text-intuit-red">TurboTax</span>
              <span className="text-intuit-gray-400">|</span>
              <span className="text-intuit-gray-600 font-medium">{FIRM.name}</span>
            </div>
            <p className="text-sm text-intuit-gray-500">
              From: {PRO.name} &lt;{PRO.email}&gt;
            </p>
            <p className="text-sm text-intuit-gray-500">Subject: Important update about your taxes — {PRO.name}</p>
          </div>

          {/* Email body */}
          <div className="px-6 py-6 text-intuit-gray-700">
            <p className="mb-4">Dear [Client],</p>
            <p className="mb-4">
              After many years of serving you, I'm writing to share an important update. I've partnered with TurboTax to ensure your taxes continue to be handled by experts you can trust.
            </p>
            <p className="mb-4">
              TurboTax Full Service offers the same quality you're used to—qualified experts, accuracy guarantees, and year-round support. I need you to provide consent to complete this transition. It only takes a moment.
            </p>
            <Link
              to="/client/consent/1"
              className="inline-block px-6 py-3 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
            >
              Review and provide consent
            </Link>
            <p className="mt-6 text-sm text-intuit-gray-500">
              This link is unique to you. If you have questions, reply to this email or call us.
            </p>
          </div>

          <div className="border-t border-intuit-gray-200 px-6 py-4 text-xs text-intuit-gray-500">
            Intuit Inc. | Privacy | Unsubscribe | Contact us
          </div>
        </div>

        <p className="mt-6 text-sm text-intuit-gray-500">
          <Link to="/" className="text-intuit-blue hover:underline">← Switch to Pro Portal</Link>
        </p>
      </div>
    </div>
  )
}
