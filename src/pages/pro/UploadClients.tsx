import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProHeader from '../../components/ProHeader'

export default function ProUploadClients() {
  const navigate = useNavigate()
  const [clientListUploaded, setClientListUploaded] = useState(false)
  const [docsUploaded, setDocsUploaded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [dragOver, setDragOver] = useState<'list' | 'docs' | null>(null)

  const handleClientListUpload = () => {
    setProcessing(true)
    setTimeout(() => {
      setClientListUploaded(true)
      setProcessing(false)
    }, 1500)
  }

  const handleDocsUpload = () => {
    setProcessing(true)
    setTimeout(() => {
      setDocsUploaded(true)
      setProcessing(false)
    }, 1500)
  }

  const handleNext = () => {
    navigate('/pro/clients')
  }

  return (
    <div className="min-h-screen bg-intuit-gray-50">
      <ProHeader />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <div className="flex gap-2 text-sm text-intuit-gray-600 mb-2">
            <span>1. Sign agreement</span>
            <span>2. About your business</span>
            <span className="font-medium text-intuit-blue">3. Transition your clients</span>
          </div>
          <div className="h-1 bg-intuit-gray-200 rounded-full">
            <div className="h-full w-full bg-intuit-blue rounded-full" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Transition your clients</h1>
        <p className="text-intuit-gray-600 mb-8">
          Upload everything in bulk. We'll organize and extract the right information from your files.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-medium text-intuit-gray-800 mb-2">Step 1: Client list</h2>
            <p className="text-sm text-intuit-gray-600 mb-4">
              Upload a spreadsheet with client names and emails. We'll match it with your tax returns.
            </p>
            <div
              onClick={() => !clientListUploaded && !processing && handleClientListUpload()}
              onDragOver={(e) => { e.preventDefault(); setDragOver('list') }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => { e.preventDefault(); setDragOver(null); !clientListUploaded && !processing && handleClientListUpload() }}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all cursor-pointer min-h-[160px] ${
                clientListUploaded
                  ? 'border-green-300 bg-green-50/50'
                  : dragOver === 'list'
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
            <a href="#" className="inline-block mt-3 text-sm text-intuit-blue hover:underline">
              Download template
            </a>
          </section>

          <section>
            <h2 className="text-lg font-medium text-intuit-gray-800 mb-2">Step 2: Prior year returns</h2>
            <p className="text-sm text-intuit-gray-600 mb-4">
              Upload all prior year tax returns (1040s) at once. We'll match them to your client list automatically.
            </p>
            <div
              onClick={() => !docsUploaded && !processing && handleDocsUpload()}
              onDragOver={(e) => { e.preventDefault(); setDragOver('docs') }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => { e.preventDefault(); setDragOver(null); !docsUploaded && !processing && handleDocsUpload() }}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all cursor-pointer min-h-[160px] ${
                docsUploaded
                  ? 'border-green-300 bg-green-50/50'
                  : dragOver === 'docs'
                  ? 'border-intuit-blue bg-intuit-blue/5'
                  : 'border-intuit-gray-300 bg-white hover:border-intuit-gray-400 hover:bg-intuit-gray-50/50'
              } ${processing ? 'pointer-events-none opacity-70' : ''}`}
            >
              {docsUploaded ? (
                <div className="flex flex-col items-center gap-2 text-green-700">
                  <span className="text-3xl">✓</span>
                  <span className="font-medium">Prior year returns uploaded</span>
                </div>
              ) : (
                <>
                  <span className="text-4xl text-intuit-gray-400 mb-2">📁</span>
                  <p className="font-medium text-intuit-gray-700">Drag and drop your tax returns here</p>
                  <p className="text-sm text-intuit-gray-500 mt-1">or click to browse</p>
                  <p className="text-xs text-intuit-gray-400 mt-2">PDF or JPEG — multiple files accepted</p>
                </>
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
              className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50"
            >
              Back
            </Link>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
