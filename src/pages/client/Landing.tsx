import { Link } from 'react-router-dom'

export default function ClientLanding() {
  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-intuit-red text-white text-sm font-medium rounded">Full Service</span>
            <Link to="/" className="text-sm text-intuit-gray-600 hover:text-intuit-blue">View as pro</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero - shorter, focused on starting */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-intuit-gray-800 mb-4">
                Your tax pro recommends TurboTax for a reason
              </h1>
              <p className="text-lg text-intuit-gray-600 mb-6">
                Get matched with an expert who can handle your taxes—based on your documents. Start your experience to meet your recommended expert.
              </p>
              <Link
                to="/client/account"
                className="inline-block px-6 py-3 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
              >
                Create account and get started
              </Link>
            </div>
            <div className="w-48 h-48 bg-intuit-gray-200 rounded-lg flex items-center justify-center text-intuit-gray-400">
              Expert photo
            </div>
          </div>
        </section>

        {/* Trust - compact */}
        <section className="py-12 px-6 bg-intuit-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-intuit-gray-800 mb-4">Your tax pro's trusted choice</h2>
            <ul className="space-y-2 text-intuit-gray-700">
              {['Average 12 years of experience', 'Qualified CPAs, EAs, or tax attorneys', 'Stay up-to-date on the latest tax laws'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works - compact */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-intuit-gray-800 mb-4">How Full Service works</h2>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-intuit-blue text-white rounded-full flex items-center justify-center font-medium text-sm">1</span>
                <div>
                  <strong>Get matched with your expert</strong>
                  <p className="text-intuit-gray-600 text-sm">We recommend experts based on your tax situation.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-intuit-blue text-white rounded-full flex items-center justify-center font-medium text-sm">2</span>
                <div>
                  <strong>Your expert does your taxes</strong>
                  <p className="text-intuit-gray-600 text-sm">Meet in-person or online.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-intuit-blue text-white rounded-full flex items-center justify-center font-medium text-sm">3</span>
                <div>
                  <strong>Stay connected year-round</strong>
                  <p className="text-intuit-gray-600 text-sm">Continue with your expert at no extra cost.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 bg-intuit-blue">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Ready to get started?</h2>
            <Link
              to="/client/account"
              className="inline-block px-8 py-3 bg-white text-intuit-blue font-medium rounded-md hover:bg-intuit-gray-50"
            >
              Create account and match with an expert
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
