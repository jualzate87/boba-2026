import { Link } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import { NEWSLETTER_DATA } from '../../data/sampleData'

export default function ProClientNewsletter() {
  const { period, signedUp, sentiment, statusCounts, clientQuotes } = NEWSLETTER_DATA

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/pro/tracker" className="text-sm text-intuit-blue hover:underline">← Back to client tracker</Link>
        </div>

        <p className="text-sm text-intuit-gray-500 mb-4">Email mockup — bi-weekly activity report sent to tax pros</p>

        <div className="bg-white rounded-lg border border-intuit-gray-200 shadow-sm overflow-hidden">
          {/* Email header */}
          <div className="border-b border-intuit-gray-200 px-6 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-intuit-blue">Intuit</span>
              <span className="text-base font-semibold text-intuit-gray-700">Accountants</span>
            </div>
            <p className="text-sm text-intuit-gray-500">
              From: TurboTax Book of Business &lt;noreply@intuit.com&gt;
            </p>
            <p className="text-sm text-intuit-gray-500">Subject: Your bi-weekly client activity report — {period}</p>
          </div>

          {/* Email body */}
          <div className="px-6 py-6 text-intuit-gray-700 space-y-6">
            <p>Hi Sarah,</p>
            <p>

              Here's your bi-weekly update on client activity for your book of business transition.
            </p>

            <section>
              <h2 className="text-base font-semibold text-intuit-gray-800 mb-2">Summary</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-intuit-gray-50 rounded-lg p-4">
                  <p className="text-2xl font-semibold text-intuit-blue">{signedUp}</p>
                  <p className="text-sm text-intuit-gray-600">Clients signed up</p>
                </div>
                <div className="bg-intuit-gray-50 rounded-lg p-4">
                  <p className="text-2xl font-semibold text-intuit-gray-800">{sentiment}</p>
                  <p className="text-sm text-intuit-gray-600">Overall sentiment</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-intuit-gray-800 mb-2">Status breakdown</h2>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between py-1">
                  <span>Waiting for response</span>
                  <span className="font-medium">{statusCounts.waitingForResponse}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Inactive</span>
                  <span className="font-medium">{statusCounts.inactive}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>In progress</span>
                  <span className="font-medium">{statusCounts.inProgress}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Complete</span>
                  <span className="font-medium">{statusCounts.complete}</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-intuit-gray-800 mb-2">Client testimonials</h2>
              <div className="space-y-3">
                {clientQuotes.map((q, i) => (
                  <blockquote key={i} className="border-l-4 border-intuit-blue pl-4 py-2 bg-intuit-gray-50 rounded-r-lg">
                    <p className="text-intuit-gray-700 italic">"{q.quote}"</p>
                    <p className="text-sm text-intuit-gray-500 mt-1">— {q.client}</p>
                  </blockquote>
                ))}
              </div>
            </section>

            <p className="text-sm text-intuit-gray-500">
              View your full client tracker in the Pro Portal for detailed status on each client.
            </p>
          </div>

          <div className="border-t border-intuit-gray-200 px-6 py-4 text-xs text-intuit-gray-500">
            Intuit Inc. | Privacy | Unsubscribe | Contact us
          </div>
        </div>
      </main>
    </div>
  )
}
