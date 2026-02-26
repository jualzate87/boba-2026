import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProSignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/pro/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-intuit-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-intuit-blue">Intuit</span>
            <span className="text-xl font-semibold text-intuit-gray-700">Accountants</span>
          </div>
          <h1 className="text-2xl font-semibold text-intuit-gray-800">Sign in or create your account</h1>
        </div>

        <form onSubmit={handleSignIn} className="bg-white rounded-lg shadow-sm border border-intuit-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-intuit-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md focus:ring-2 focus:ring-intuit-blue focus:border-intuit-blue"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-intuit-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-intuit-gray-300 rounded-md focus:ring-2 focus:ring-intuit-blue focus:border-intuit-blue"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-intuit-gray-300"
                />
                <span className="text-sm text-intuit-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-intuit-blue hover:underline">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2.5 bg-intuit-blue text-white font-medium rounded-md hover:bg-intuit-blue-dark transition-colors"
          >
            Sign In
          </button>
          <p className="mt-4 text-center text-sm text-intuit-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-intuit-blue hover:underline">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  )
}
