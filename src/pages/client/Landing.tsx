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
        {/* Hero */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-intuit-gray-800 mb-4">
                Your tax pro recommends TurboTax for a reason
              </h1>
              <p className="text-lg text-intuit-gray-600 mb-6">
                Don't stress about changing tax pros—get matched with an expert who can handle your taxes today.
              </p>
              <Link
                to="/client/account"
                className="inline-block px-6 py-3 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
              >
                Match with an expert
              </Link>
            </div>
            <div className="w-48 h-48 bg-intuit-gray-200 rounded-lg flex items-center justify-center text-intuit-gray-400">
              Expert photo
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-12 px-6 bg-intuit-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-intuit-gray-800 mb-6">Your tax pro's trusted choice</h2>
            <ul className="space-y-3">
              {['Average 12 years of experience', 'Qualified CPAs, EAs, or tax attorneys', 'Stay up-to-date on the latest tax laws'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-intuit-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-intuit-gray-800 mb-6">How Full Service works</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-intuit-blue text-white rounded-full flex items-center justify-center font-medium">1</span>
                <div>
                  <strong>Get matched with your new expert</strong>
                  <p className="text-intuit-gray-600 text-sm">Answer a few questions about your taxes and get your price estimate.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-intuit-blue text-white rounded-full flex items-center justify-center font-medium">2</span>
                <div>
                  <strong>Your expert does your taxes</strong>
                  <p className="text-intuit-gray-600 text-sm">Meet with them in-person or online and review your return together.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-intuit-blue text-white rounded-full flex items-center justify-center font-medium">3</span>
                <div>
                  <strong>Stay connected year-round</strong>
                  <p className="text-intuit-gray-600 text-sm">Continue working with your expert, whom you know.</p>
                </div>
              </li>
            </ol>
            <p className="mt-6 text-intuit-gray-600">
              Starting at $89. Price includes W-2 and 1040. State additional. <a href="#" className="text-intuit-blue hover:underline">See price estimates</a>
            </p>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-12 px-6 bg-intuit-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-intuit-gray-800 mb-6 text-center">
              Get your taxes done right and your biggest tax refund—guaranteed
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Your tax return, backed for life®', desc: 'Accurate calculations, audit support, and your max refund—backed for the 7-year life of your return.' },
                { title: 'Your best tax outcome', desc: 'Whether filing solo or with expert help, get your max refund guaranteed—or your money back.' },
                { title: 'Taxes done right', desc: "We guarantee our calculations are 100% accurate, or we'll pay any IRS penalties." },
              ].map((g) => (
                <div key={g.title} className="bg-white rounded-lg border border-intuit-gray-200 p-6 text-center">
                  <h3 className="font-semibold text-intuit-gray-800 mb-2">{g.title}</h3>
                  <p className="text-sm text-intuit-gray-600">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 bg-intuit-blue">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to get started?</h2>
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
