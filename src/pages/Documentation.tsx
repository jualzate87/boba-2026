import { Link } from 'react-router-dom'

export default function Documentation() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-8 print:py-4">
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link to="/" className="text-sm text-intuit-gray-500 hover:text-intuit-blue">← Back to prototype</Link>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-intuit-blue text-white text-sm font-medium rounded-md hover:bg-intuit-blue-dark"
          >
            Download PDF
          </button>
        </div>

        <article className="prose prose-intuit max-w-none">
          <h1 className="text-2xl font-bold text-intuit-gray-800 mb-1">BOBA 2026 — Product Overview for Stakeholders</h1>
          <p className="text-intuit-gray-600 mb-8">Book of Business Acquisition Prototype — Low-to-mid fidelity mockups for Intuit's acquisition of retiring tax firms' books of business</p>

          <h2 className="text-lg font-semibold text-intuit-gray-800 mt-8 mb-3">Executive Summary</h2>
          <p className="text-intuit-gray-700 mb-4">
            BOBA 2026 is a prototype that demonstrates the end-to-end experience for <strong>retiring tax professionals</strong> who are transitioning their client book of business to TurboTax Full Service. It also shows the <strong>client journey</strong> — how taxpayers receive communication, provide consent, and onboard into TurboTax Full Service.
          </p>
          <p className="text-intuit-gray-700 mb-4"><strong>Two primary audiences:</strong></p>
          <ol className="list-decimal list-inside text-intuit-gray-700 space-y-1 mb-6">
            <li>Tax professionals (pros) — Retiring preparers who are selling their practice</li>
            <li>Taxpayers (clients) — Individuals who will be transitioned to TurboTax Full Service</li>
          </ol>

          <h2 className="text-lg font-semibold text-intuit-gray-800 mt-8 mb-3">User Types & States</h2>
          <h3 className="text-base font-medium text-intuit-gray-700 mt-4 mb-2">Pro Portal: New User vs. Returning User</h3>
          <table className="w-full border border-intuit-gray-200 text-sm mb-6">
            <thead>
              <tr className="bg-intuit-gray-50">
                <th className="text-left p-3 font-medium">User Type</th>
                <th className="text-left p-3 font-medium">When to Use</th>
                <th className="text-left p-3 font-medium">Dashboard State</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-intuit-gray-200">
                <td className="p-3">New user</td>
                <td className="p-3">First-time pro who has not completed any steps</td>
                <td className="p-3">No estimated compensation. Steps shown as "Ready" or "In progress." No client activity.</td>
              </tr>
              <tr className="border-t border-intuit-gray-200">
                <td className="p-3">Returning user</td>
                <td className="p-3">Pro who has completed onboarding and sent communications</td>
                <td className="p-3">Estimated compensation shown. Client activity summary. Completed steps in read-only.</td>
              </tr>
            </tbody>
          </table>
          <p className="text-intuit-gray-600 text-sm mb-6">How to switch: On the Sign In page (/pro), choose "New user" or "Returning user."</p>

          <h2 className="text-lg font-semibold text-intuit-gray-800 mt-8 mb-3">Pro Portal Flow</h2>
          <ul className="list-disc list-inside text-intuit-gray-700 space-y-2 mb-6">
            <li><strong>Sign In</strong> (/pro) — New user | Returning user</li>
            <li><strong>Dashboard</strong> (/pro/dashboard) — Two states based on user type</li>
            <li><strong>Sign Agreement</strong> (/pro/agreement)</li>
            <li><strong>Business Information</strong> (/pro/business) — Firm details, logo upload</li>
            <li><strong>Upload Client Data</strong> (/pro/upload) — Bulk upload, drag-and-drop</li>
            <li><strong>Client List</strong> (/pro/clients) — Eligibility, filters, Est. Comp., Paid</li>
            <li><strong>Send Communication</strong> (/pro/send)</li>
            <li><strong>Client Tracker</strong> (/pro/tracker) — Status tracking, newsletter link</li>
            <li><strong>Bi-Weekly Newsletter</strong> (/pro/newsletter) — Returning pro only, floating button</li>
          </ul>

          <h2 className="text-lg font-semibold text-intuit-gray-800 mt-8 mb-3">Client Flow</h2>
          <p className="text-intuit-gray-700 mb-2">Email → Consent → Start Experience → Create Account → Expert Match</p>
          <ul className="list-disc list-inside text-intuit-gray-700 space-y-2 mb-6">
            <li><strong>Consent</strong> (/client/consent/:clientId) — Benefits section below form</li>
            <li><strong>Start Experience</strong> (/client/start/:clientId) — Expert preview, benefits of creating account</li>
            <li><strong>Create Account</strong> (/client/account/:clientId) — Special offer, urgency, pre-populated email</li>
          </ul>

          <h2 className="text-lg font-semibold text-intuit-gray-800 mt-8 mb-3">Key Features</h2>
          <ul className="list-disc list-inside text-intuit-gray-700 space-y-2 mb-6">
            <li>Dashboard: Two states, single "See details" CTA</li>
            <li>Client List & Tracker: Dropdown filters, Est. Comp. tooltip, Paid column logic</li>
            <li>Consent: Persuasive benefits, TurboTax Full Service language</li>
            <li>Account: Price estimate, special offer from TurboTax, urgency messaging</li>
          </ul>

          <h2 className="text-lg font-semibold text-intuit-gray-800 mt-8 mb-3">Routes Quick Reference</h2>
          <table className="w-full border border-intuit-gray-200 text-sm mb-6">
            <thead>
              <tr className="bg-intuit-gray-50">
                <th className="text-left p-3 font-medium">Route</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-3">/</td><td className="p-3">Home</td></tr>
              <tr className="border-t"><td className="p-3">/pro</td><td className="p-3">Sign in</td></tr>
              <tr className="border-t"><td className="p-3">/pro/dashboard</td><td className="p-3">Dashboard</td></tr>
              <tr className="border-t"><td className="p-3">/pro/clients</td><td className="p-3">Client list</td></tr>
              <tr className="border-t"><td className="p-3">/pro/tracker</td><td className="p-3">Client tracker</td></tr>
              <tr className="border-t"><td className="p-3">/client/consent/:clientId</td><td className="p-3">Consent form</td></tr>
              <tr className="border-t"><td className="p-3">/client/start/:clientId</td><td className="p-3">Start experience</td></tr>
              <tr className="border-t"><td className="p-3">/client/account/:clientId</td><td className="p-3">Create account</td></tr>
            </tbody>
          </table>

          <p className="text-sm text-intuit-gray-500 mt-8">Last updated: February 2026</p>
        </article>
      </div>

      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  )
}
