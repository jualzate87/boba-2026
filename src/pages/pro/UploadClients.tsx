import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'
import { getProScenario } from '../../data/sampleData'

export type ManualClient = { id: string; name: string; email: string; returnType: string }

export default function ProUploadClients() {
  const navigate = useNavigate()
  const location = useLocation()
  const scenario = (location.state as { proScenario?: string } | null)?.proScenario ?? getProScenario()
  const [clientListUploaded, setClientListUploaded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [manualClients, setManualClients] = useState<ManualClient[]>([])
  const [manualForm, setManualForm] = useState({ name: '', email: '', returnType: '1040' })

  const handleClientListUpload = () => {
    setProcessing(true)
    setTimeout(() => {
      setClientListUploaded(true)
      setProcessing(false)
    }, 1500)
  }

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualForm.name.trim() || !manualForm.email.trim()) return
    setManualClients((prev) => [
      ...prev,
      { id: `manual-${Date.now()}`, name: manualForm.name.trim(), email: manualForm.email.trim(), returnType: manualForm.returnType },
    ])
    setManualForm({ name: '', email: '', returnType: '1040' })
  }

  const handleRemoveManual = (id: string) => {
    setManualClients((prev) => prev.filter((c) => c.id !== id))
  }

  const handleNext = () => {
    navigate('/pro/clients', { state: { proScenario: scenario, manuallyAddedClients: manualClients } })
  }

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex gap-6 sm:gap-10 text-sm text-intuit-gray-600 mb-3">
            <span className="text-intuit-gray-500">1. Sign agreement</span>
            <span className="text-intuit-gray-500">2. About your business</span>
            <span className="font-medium text-intuit-blue">3. Transition your clients</span>
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 flex-1 rounded-full bg-intuit-blue" />
            <div className="h-1.5 flex-1 rounded-full bg-intuit-blue" />
            <div className="h-1.5 flex-1 rounded-full bg-intuit-blue" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Transition your clients</h1>
        <p className="text-intuit-gray-600 mb-8">
          Upload your client list. We'll send consent requests to each client. After they consent, we'll collect prior year documents to determine serviceability.
        </p>

        <div className="space-y-8">
          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Step 1: Client list
              </h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-intuit-gray-600 mb-4">
                Upload a spreadsheet with client names and emails. You can optionally include a return type column (e.g., 1040, 1040-NR) to help us match documents later.
              </p>
              <div
                onClick={() => !clientListUploaded && !processing && handleClientListUpload()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); !clientListUploaded && !processing && handleClientListUpload() }}
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all cursor-pointer min-h-[180px] ${
                  clientListUploaded
                    ? 'border-green-300 bg-green-50/50'
                    : dragOver
                    ? 'border-intuit-blue bg-intuit-blue/5'
                    : 'border-intuit-gray-300 bg-white hover:border-intuit-gray-400 hover:bg-intuit-gray-50/50'
                } ${processing ? 'pointer-events-none opacity-70' : ''}`}
              >
                {clientListUploaded ? (
                  <div className="flex flex-col items-center gap-2 text-green-700">
                    <span className="text-3xl">✓</span>
                    <span className="font-medium">Client list uploaded</span>
                  </div>
                ) : (
                  <>
                    <span className="text-4xl text-intuit-gray-400 mb-2">📄</span>
                    <p className="font-medium text-intuit-gray-700">Drag and drop your spreadsheet here</p>
                    <p className="text-sm text-intuit-gray-500 mt-1">or click to browse</p>
                    <p className="text-xs text-intuit-gray-400 mt-2">.csv or .xlsx</p>
                  </>
                )}
              </div>
              <a href="#" className="inline-block mt-4 text-sm text-intuit-blue hover:underline">
                Download template
              </a>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-intuit-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-intuit-gray-100 bg-intuit-gray-50/50">
              <h2 className="text-sm font-semibold text-intuit-gray-800 uppercase tracking-wide">
                Add client manually
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddManual} className="flex flex-wrap gap-4 items-end">
                <div className="min-w-[140px]">
                  <label className="block text-xs font-medium text-intuit-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    value={manualForm.name}
                    onChange={(e) => setManualForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Client name"
                    className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="min-w-[180px]">
                  <label className="block text-xs font-medium text-intuit-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={manualForm.email}
                    onChange={(e) => setManualForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="client@email.com"
                    className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="min-w-[100px]">
                  <label className="block text-xs font-medium text-intuit-gray-600 mb-1">Return type</label>
                  <select
                    value={manualForm.returnType}
                    onChange={(e) => setManualForm((f) => ({ ...f, returnType: e.target.value }))}
                    className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md text-sm"
                  >
                    <option value="1040">1040</option>
                    <option value="1040-NR">1040-NR</option>
                    <option value="1040-SR">1040-SR</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-intuit-gray-100 text-intuit-gray-700 rounded-md text-sm font-medium hover:bg-intuit-gray-200"
                >
                  Add
                </button>
              </form>
              {manualClients.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {manualClients.map((c) => (
                    <li key={c.id} className="flex items-center justify-between py-2 px-3 bg-intuit-gray-50 rounded-md text-sm">
                      <span className="text-intuit-gray-800">{c.name}</span>
                      <span className="text-intuit-gray-500">{c.email}</span>
                      <span className="text-intuit-gray-500">{c.returnType}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveManual(c.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {processing && (
            <div className="flex items-center gap-2 text-intuit-blue text-sm">
              <div className="animate-spin h-4 w-4 border-2 border-intuit-blue border-t-transparent rounded-full" />
              Organizing and extracting information...
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Link
              to="/pro/business"
              className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-lg hover:bg-intuit-gray-50 font-medium"
            >
              Back
            </Link>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-lg hover:bg-intuit-blue-dark"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
