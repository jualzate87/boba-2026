import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import { FIRM, getProScenario } from '../../data/sampleData'

export default function ProBusinessInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const scenario = (location.state as { proScenario?: string } | null)?.proScenario ?? getProScenario()
  const isNewUser = scenario === 'new'
  const [form, setForm] = useState({
    legalName: FIRM.name,
    dba: FIRM.dba,
    ein: FIRM.ein,
    address: FIRM.address,
    city: FIRM.city,
    state: FIRM.state,
    zip: FIRM.zip,
    businessType: FIRM.businessType,
    clientCount: String(FIRM.clientCount),
    yearsInBusiness: String(FIRM.yearsInBusiness),
    taxSoftware: FIRM.taxSoftware,
    retirementTimeline: (FIRM as { retirementTimeline?: string }).retirementTimeline ?? 'immediate',
    transitionVolume: String((FIRM as { transitionVolume?: number }).transitionVolume ?? 500),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/pro/upload', { state: { proScenario: scenario } })
  }

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  if (!isNewUser) {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <ProHeader />
        <main className="max-w-2xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-6">Your profile</h1>
          <div className="bg-white rounded-lg border border-intuit-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Legal Business Name</label>
              <p className="text-intuit-gray-800">{form.legalName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Doing Business As (DBA)</label>
              <p className="text-intuit-gray-800">{form.dba}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Employer Identification Number (EIN)</label>
              <p className="text-intuit-gray-800">{form.ein}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Business Address</label>
              <p className="text-intuit-gray-800">{form.address}, {form.city}, {form.state} {form.zip}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Business Type</label>
              <p className="text-intuit-gray-800">{form.businessType}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Total client count</label>
                <p className="text-intuit-gray-800">{form.clientCount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Retirement timeline</label>
                <p className="text-intuit-gray-800">{form.retirementTimeline === 'immediate' ? 'Immediate' : '1–3 years'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Transition volume</label>
                <p className="text-intuit-gray-800">{form.transitionVolume}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Years in business</label>
                <p className="text-intuit-gray-800">{form.yearsInBusiness}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-intuit-gray-500 mb-1">Tax software used</label>
              <p className="text-intuit-gray-800">{form.taxSoftware}</p>
            </div>
            <Link
              to="/pro/dashboard"
              state={{ proScenario: scenario }}
              className="inline-block mt-4 px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50"
            >
              Back to dashboard
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex gap-6 sm:gap-10 text-sm text-intuit-gray-600 mb-3">
            <span className="text-intuit-gray-500">1. Sign agreement</span>
            <span className="font-medium text-intuit-blue">2. About your business</span>
            <span className="text-intuit-gray-500">3. Transition your clients</span>
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 flex-1 rounded-full bg-intuit-blue" />
            <div className="h-1.5 flex-1 rounded-full bg-intuit-blue" />
            <div className="h-1.5 flex-1 rounded-full bg-intuit-gray-200" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-6">Tell us about your business</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-intuit-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Legal Business Name</label>
            <input
              value={form.legalName}
              onChange={(e) => update('legalName', e.target.value)}
              className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Doing Business As (DBA)</label>
            <input
              value={form.dba}
              onChange={(e) => update('dba', e.target.value)}
              className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Employer Identification Number (EIN)</label>
            <input
              value={form.ein}
              onChange={(e) => update('ein', e.target.value)}
              className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              placeholder="12-3456789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Business Address</label>
            <input
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md mb-2"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                className="px-3 py-2 border border-intuit-gray-300 rounded-md"
                placeholder="City"
              />
              <input
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                className="px-3 py-2 border border-intuit-gray-300 rounded-md"
                placeholder="State"
              />
              <input
                value={form.zip}
                onChange={(e) => update('zip', e.target.value)}
                className="px-3 py-2 border border-intuit-gray-300 rounded-md"
                placeholder="Zip"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-2">Business Type</label>
            <div className="flex flex-wrap gap-4">
              {['Sole Proprietorship', 'Partnership', 'S-Corp', 'C-Corp'].map((t) => (
                <label key={t} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="businessType"
                    value={t}
                    checked={form.businessType === t}
                    onChange={() => update('businessType', t)}
                  />
                  <span className="text-sm">{t}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Total client count</label>
              <input
                type="number"
                value={form.clientCount}
                onChange={(e) => update('clientCount', e.target.value)}
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
                placeholder="e.g., 1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Years in business</label>
              <input
                type="number"
                value={form.yearsInBusiness}
                onChange={(e) => update('yearsInBusiness', e.target.value)}
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-2">Retirement timeline</label>
            <div className="flex gap-6">
              {[
                { value: 'immediate', label: 'Immediate' },
                { value: '1-3_years', label: 'In 1–3 years' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="retirementTimeline"
                    value={opt.value}
                    checked={form.retirementTimeline === opt.value}
                    onChange={() => update('retirementTimeline', opt.value)}
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Transition volume</label>
            <input
              type="number"
              value={form.transitionVolume}
              onChange={(e) => update('transitionVolume', e.target.value)}
              className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              placeholder="e.g., 500"
            />
            <p className="text-xs text-intuit-gray-500 mt-1">How many clients do you want to transition to TurboTax Full Service this year?</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Tax software used</label>
            <input
              value={form.taxSoftware}
              onChange={(e) => update('taxSoftware', e.target.value)}
              className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              placeholder="e.g., Lacerte, ProSeries"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Firm logo (optional)</label>
            <p className="text-sm text-intuit-gray-500 mb-2">Upload your logo for use in client emails. This is the only branding customization.</p>
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <img src={(FIRM as { logoUrl?: string }).logoUrl} alt="Firm logo" className="h-10 w-auto object-contain" />
              </div>
              <div className="border-2 border-dashed border-intuit-gray-300 rounded-md p-4 flex-1 text-center text-intuit-gray-500 text-sm">
                Demo logo shown. Drag and drop or click to upload your own.
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              to="/pro/agreement"
              className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50"
            >
              Back
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
            >
              Next
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
