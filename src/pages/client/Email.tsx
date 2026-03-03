import { Link } from 'react-router-dom'
import { FIRM, PRO } from '../../data/sampleData'

export default function ClientEmail() {
  return (
    <div className="min-h-screen bg-intuit-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-intuit-gray-500 mb-4">Email mockup — as the client would see it</p>

        <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
          {/* Email header */}
          <div className="border-b border-intuit-gray-200 px-6 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-intuit-blue">Intuit</span>
              <span className="text-base font-semibold text-intuit-red">TurboTax</span>
              <span className="text-intuit-gray-400">|</span>
              <span className="text-intuit-gray-600 font-medium">{FIRM.name}</span>
            </div>
            <p className="text-sm text-intuit-gray-500">From: {PRO.name} &lt;{PRO.email}&gt;</p>
            <p className="text-sm text-intuit-gray-500">Subject: Important update about your taxes — {PRO.name}</p>
          </div>

          {/* Email body */}
          <div className="px-6 py-6 text-intuit-gray-700 space-y-4">
            <p>Dear [Client],</p>
            <p>
              I am working with the TurboTax Full Service team to help you find the best service alternative after my retirement—or our transition. I want to make sure your taxes continue to be handled with the same care and expertise you expect.
            </p>
            <div className="p-4 bg-intuit-gray-50 rounded-lg border border-intuit-gray-100">
              <p className="font-semibold text-intuit-gray-800 mb-2">Here's why I think this is a great idea:</p>
              <ul className="text-sm space-y-1.5 text-intuit-gray-700">
                <li>• Qualified experts who specialize in situations like yours</li>
                <li>• Accuracy guarantees that back your return</li>
                <li>• Year-round support when you need it</li>
                <li>• Smooth handoff — your new expert will have the context they need</li>
              </ul>
            </div>
            <p>
              If you think this will work for you, please sign your consent to move forward. It only takes a moment, and you'll be able to create your account and get matched with the right expert for your situation.
            </p>
            <Link
              to="/client/consent/1"
              className="inline-block px-6 py-3 border-2 border-intuit-gray-300 text-intuit-gray-700 font-medium rounded-lg hover:bg-intuit-gray-50"
            >
              Review and provide consent
            </Link>
            <p className="text-sm text-intuit-gray-500">
              This link is unique to you. If you have questions, reply to this email or call us.
            </p>
          </div>

          <div className="border-t border-intuit-gray-200 px-6 py-4 text-xs text-intuit-gray-500">
            Intuit Inc. | Privacy | Unsubscribe | Contact us
          </div>
        </section>

      </div>
    </div>
  )
}
