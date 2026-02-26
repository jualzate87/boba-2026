import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CLIENTS } from '../../data/sampleData'
import ProHeader from '../../components/ProHeader'

const STATUS_LABELS: Record<string, string> = {
  serviceable: 'Serviceable',
  not_serviceable: 'Not serviceable',
  missing_document: 'Missing document',
  needs_review: 'Needs review',
}

const STATUS_STYLES: Record<string, string> = {
  serviceable: 'bg-green-100 text-green-700',
  not_serviceable: 'bg-amber-100 text-amber-700',
  missing_document: 'bg-red-100 text-red-700',
  needs_review: 'bg-intuit-gray-100 text-intuit-gray-600',
}

export default function ProClientList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string>('all')
  const [additionalFilesDropped, setAdditionalFilesDropped] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const serviceableClients = CLIENTS.filter((c) => c.status === 'serviceable')

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Review your clients</h1>
        <p className="text-intuit-gray-600 mb-6">
          We're open to all types of returns. Eligibility is based on TurboTax Full Service policy.{' '}
          <a href="https://ttlc.intuit.com/turbotax-support/en-us/help-article/customer-full-service-product/turbotax-full-service-cover-tax-situation/L3oLZHIYK_US_en_US" target="_blank" rel="noopener noreferrer" className="text-intuit-blue hover:underline">
            See eligibility details
          </a>
        </p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); setAdditionalFilesDropped(true) }}
          className={`mb-6 rounded-xl border-2 border-dashed transition-all min-h-[100px] flex flex-col items-center justify-center ${
            dragOver ? 'border-intuit-blue bg-intuit-blue/5' : 'border-intuit-gray-200 bg-white'
          }`}
        >
          <p className="text-sm font-medium text-intuit-gray-700">
            {additionalFilesDropped ? (
              <span className="text-green-600">✓ Additional files added. We're matching them to your clients.</span>
            ) : (
              <>
                <span className="text-intuit-blue">Add missing files?</span> Drag and drop additional prior year returns here to fill in gaps.
              </>
            )}
          </p>
          <p className="text-xs text-intuit-gray-500 mt-1">PDF or JPEG</p>
        </div>

        <div className="mb-4 flex gap-2">
          {['all', 'serviceable', 'not_serviceable', 'missing_document'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-sm font-medium ${
                filter === f ? 'bg-intuit-blue text-white' : 'bg-white border border-intuit-gray-200 text-intuit-gray-700 hover:bg-intuit-gray-50'
              }`}
            >
              {f === 'all' ? 'All' : STATUS_LABELS[f] || f}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-intuit-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-intuit-gray-50 border-b border-intuit-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Client Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Email</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Prior Year Return</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-intuit-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {CLIENTS.filter((c) => filter === 'all' || c.status === filter).map((client) => (
                <tr key={client.id} className="border-b border-intuit-gray-100 hover:bg-intuit-gray-50/50">
                  <td className="px-4 py-3 text-sm text-intuit-gray-800">{client.name}</td>
                  <td className="px-4 py-3 text-sm text-intuit-gray-600">{client.email}</td>
                  <td className="px-4 py-3 text-sm">
                    {client.priorYearReturn ? (
                      <a href="#" className="text-intuit-blue hover:underline">{client.priorYearReturn}</a>
                    ) : (
                      <span className="text-intuit-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[client.status]}`}>
                      {STATUS_LABELS[client.status]}
                      {client.reason && `: ${client.reason}`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Link to="/pro/upload" className="text-intuit-blue hover:underline text-sm">
            Back to upload
          </Link>
          <button
            onClick={() => navigate('/pro/send')}
            className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
          >
            Send communication to {serviceableClients.length} clients
          </button>
        </div>
      </main>
    </div>
  )
}
