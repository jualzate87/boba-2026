import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ClientAccount() {
  const [step, setStep] = useState<'signup' | 'upload' | 'matched'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('upload')
  }

  if (step === 'upload') {
    return (
      <div className="min-h-screen bg-intuit-gray-50">
        <header className="bg-white border-b border-intuit-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 max-w-6xl mx-auto">
            <span className="text-xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-lg font-semibold text-intuit-red">TurboTax</span>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold text-intuit-gray-800 mb-2">Almost there</h1>
          <p className="text-intuit-gray-600 mb-8">
            Upload your tax documents to help your expert get started. You can add more later.
          </p>

          <div className="bg-white rounded-lg border border-intuit-gray-200 p-6 mb-6">
            <h2 className="font-medium text-intuit-gray-800 mb-4">Upload documents</h2>
            <div className="border-2 border-dashed border-intuit-gray-300 rounded-lg p-8 text-center text-intuit-gray-500 mb-4">
              Drag and drop W-2s, 1099s, and other tax documents here, or click to browse
            </div>
            <p className="text-sm text-intuit-gray-500">
              We accept PDF, JPEG, and PNG. Max 10MB per file.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep('matched')}
              className="px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
            >
              Skip for now
            </button>
            <button
              onClick={() => setStep('matched')}
              className="px-6 py-2.5 border border-intuit-gray-300 text-intuit-gray-700 rounded-md hover:bg-intuit-gray-50"
            >
              Upload and continue
            </button>
          </div>

          <p className="mt-6 text-sm text-intuit-gray-500">
            <a href="#" className="text-intuit-blue hover:underline">Request help</a> or <a href="#" className="text-intuit-blue hover:underline">view more resources</a>
          </p>
        </main>
      </div>
    )
  }

  if (step === 'matched') {
    return (
      <div className="min-h-screen bg-intuit-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg border border-intuit-gray-200 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-intuit-gray-800 mb-2">You've been matched with an expert</h2>
          <p className="text-intuit-gray-600 mb-6">
            Your expert will reach out shortly to complete your taxes. You can track progress in your TurboTax account.
          </p>
          <Link
            to="/client/landing"
            className="inline-block px-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
          >
            Back to TurboTax Full Service
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-intuit-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-xl font-semibold text-intuit-red">TurboTax</span>
          </div>
          <h1 className="text-2xl font-semibold text-intuit-gray-800">Create your account</h1>
          <p className="text-intuit-gray-600 mt-2">Sign up to continue with TurboTax Full Service</p>
        </div>

        <form onSubmit={handleSignUp} className="bg-white rounded-lg shadow-sm border border-intuit-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-intuit-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-intuit-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark"
          >
            Create account
          </button>
          <p className="mt-4 text-center text-sm text-intuit-gray-600">
            Already have an account? <a href="#" className="text-intuit-blue hover:underline">Sign in</a>
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-intuit-gray-500">
          <Link to="/client/landing" className="text-intuit-blue hover:underline">← Back</Link>
        </p>
      </div>
    </div>
  )
}
