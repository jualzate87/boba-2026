import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import { FIRM } from '../../data/sampleData'

export default function ProBusinessInfo() {
  const navigate = useNavigate()
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
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/pro/upload')
  }

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <div className="flex gap-2 text-sm text-intuit-gray-600 mb-2">
            <span>1. Sign agreement</span>
            <span className="font-medium text-intuit-blue">2. About your business</span>
            <span>3. Transition your clients</span>
          </div>
          <div className="h-1 bg-intuit-gray-200 rounded-full">
            <div className="h-full w-2/3 bg-intuit-blue rounded-full" />
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
              <label className="block text-sm font-medium text-intuit-gray-700 mb-1">Number of clients</label>
              <input
                type="number"
                value={form.clientCount}
                onChange={(e) => update('clientCount', e.target.value)}
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
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
            <div className="border-2 border-dashed border-intuit-gray-300 rounded-md p-6 text-center text-intuit-gray-500 text-sm">
              Drag and drop or click to upload
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
