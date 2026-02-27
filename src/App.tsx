import { Routes, Route } from 'react-router-dom'

// Home
import Home from './pages/Home'

// Pro Portal
import ProSignIn from './pages/pro/SignIn'
import ProDashboard from './pages/pro/Dashboard'
import ProSignAgreement from './pages/pro/SignAgreement'
import ProBusinessInfo from './pages/pro/BusinessInfo'
import ProUploadClients from './pages/pro/UploadClients'
import ProClientList from './pages/pro/ClientList'
import ProSendCommunication from './pages/pro/SendCommunication'
import ProClientTracker from './pages/pro/ClientTracker'
import ProClientNewsletter from './pages/pro/ClientNewsletter'

// Client flow
import ClientEmail from './pages/client/Email'
import ClientConsent from './pages/client/Consent'
import ClientStartExperience from './pages/client/StartExperience'
import ClientLanding from './pages/client/Landing'
import ClientAccount from './pages/client/Account'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Pro Portal */}
      <Route path="/pro" element={<ProSignIn />} />
      <Route path="/pro/dashboard" element={<ProDashboard />} />
      <Route path="/pro/agreement" element={<ProSignAgreement />} />
      <Route path="/pro/business" element={<ProBusinessInfo />} />
      <Route path="/pro/upload" element={<ProUploadClients />} />
      <Route path="/pro/clients" element={<ProClientList />} />
      <Route path="/pro/send" element={<ProSendCommunication />} />
      <Route path="/pro/tracker" element={<ProClientTracker />} />
      <Route path="/pro/newsletter" element={<ProClientNewsletter />} />
      {/* Client flow */}
      <Route path="/client/email" element={<ClientEmail />} />
      <Route path="/client/consent/:clientId?" element={<ClientConsent />} />
      <Route path="/client/start/:clientId?" element={<ClientStartExperience />} />
      <Route path="/client/landing" element={<ClientLanding />} />
      <Route path="/client/account/:clientId?" element={<ClientAccount />} />
    </Routes>
  )
}

export default App
