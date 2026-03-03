// Fixed example data for BOBA 2026 prototype

export const FIRM = {
  name: 'Anderson Tax & Associates',
  dba: 'Anderson Tax',
  ein: '12-3456789',
  address: '123 Main Street',
  city: 'Austin',
  state: 'TX',
  zip: '78701',
  businessType: 'Sole Proprietorship',
  clientCount: 5,
  yearsInBusiness: 15,
  taxSoftware: 'Lacerte',
  retirementTimeline: 'immediate' as 'immediate' | '1-3_years',
  transitionVolume: 500,
  logoUrl: '/boba-2026/demo-logo.svg',
}

export const PRO = {
  name: 'Sarah Anderson',
  email: 'sarah@andersontax.com',
}

// Client base data — status/priorYearReturn/eligibility determined after documents submitted
export const CLIENTS = [
  { id: '1', name: 'James Wilson', email: 'james.wilson@email.com', returnType: '1040' as const },
  { id: '2', name: 'Maria Garcia', email: 'maria.garcia@email.com', returnType: '1040' as const },
  { id: '3', name: 'Robert Chen', email: 'robert.chen@email.com', returnType: '1040' as const },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@email.com', returnType: '1040' as const },
  { id: '5', name: 'Michael Brown', email: 'michael.brown@email.com', returnType: '1040-NR' as const },
]

// Client status flow: not_contacted → consent_request_sent → consent_provided → documents_submitted → serviceability_determined → account_created → starting_journey
export const CLIENT_STATUSES: Record<string, string> = {
  '1': 'consent_provided',
  '2': 'account_created',
  '3': 'consent_request_sent',
}

// For clients who have submitted documents: serviceability outcome (computed after docs)
// Use 'awaiting_documentation' when no docs submitted yet (displayed in ClientList)
export const CLIENT_ELIGIBILITY: Record<string, 'serviceable' | 'not_serviceable' | 'missing_document' | 'pending' | 'awaiting_documentation'> = {
  '1': 'serviceable',
  '2': 'serviceable',
  '3': 'pending',
  '4': 'not_serviceable',
  '5': 'missing_document',
}

// Prior year return filename (populated after client or pro uploads)
export const CLIENT_PRIOR_YEAR_RETURN: Record<string, string | null> = {
  '1': '1040_2024.pdf',
  '2': '1040_2024.pdf',
  '3': null,
  '4': '1040_2024.pdf',
  '5': null,
}

// Estimated comp (from prior year return analysis, when available)
export const CLIENT_ESTIMATED_COMP: Record<string, number> = {
  '1': 85,
  '2': 120,
  '3': 0,
  '4': 0,
  '5': 0,
}

export const CLIENT_NOT_SERVICEABLE_REASON: Record<string, string> = {
  '4': 'Complex foreign transactions',
}

// Document attribution: who uploaded what
export type DocumentUpload = {
  clientId: string
  fileName: string
  uploadedBy: 'client' | 'pro'
  uploadedAt: string
}

export const CLIENT_DOCUMENTS: DocumentUpload[] = [
  { clientId: '1', fileName: '1040_2024.pdf', uploadedBy: 'client', uploadedAt: '2026-01-15' },
  { clientId: '2', fileName: '1040_2024.pdf', uploadedBy: 'pro', uploadedAt: '2026-01-16' },
]

// Client has authorized pro to upload documents on their behalf
export const CLIENT_REQUESTED_PRO_UPLOAD: Record<string, boolean> = {
  '1': true,
  '2': false,
  '3': true,
  '4': false,
  '5': false,
}

// Decline reasons (structured)
export const CONSENT_REJECTION_REASONS: Record<string, string> = {
  '4': "I'm switching to another tax pro",
}

// Whether client has completed their return (pro is paid only when account created AND return completed)
export const CLIENT_RETURN_COMPLETED: Record<string, boolean> = {
  '1': false,
  '2': true,
  '3': false,
}

// Tax situation derived from documents (for profile page)
export type ClientTaxSituation = {
  incomeTypes: string[]
  complexity: 'simple' | 'moderate' | 'complex'
  serviceability: 'serviceable' | 'not_serviceable' | 'pending'
  serviceabilityReason?: string
  recommendedExpertId?: string
  estimatedPrice?: number
}

export const CLIENT_TAX_SITUATION: Record<string, ClientTaxSituation> = {
  '1': {
    incomeTypes: ['W-2 income', 'Schedule C', 'Retirement income'],
    complexity: 'moderate',
    serviceability: 'serviceable',
    recommendedExpertId: 'eric',
    estimatedPrice: 149,
  },
  '2': {
    incomeTypes: ['W-2 income', '1099-INT'],
    complexity: 'simple',
    serviceability: 'serviceable',
    recommendedExpertId: 'eric',
    estimatedPrice: 149,
  },
  '3': {
    incomeTypes: [],
    complexity: 'simple',
    serviceability: 'pending',
    serviceabilityReason: 'Waiting for prior year documents',
  },
  '4': {
    incomeTypes: ['W-2 income', 'Foreign income'],
    complexity: 'complex',
    serviceability: 'not_serviceable',
    serviceabilityReason: 'Complex foreign transactions',
  },
  '5': {
    incomeTypes: [],
    complexity: 'simple',
    serviceability: 'pending',
    serviceabilityReason: 'Prior year documents needed',
  },
}

// Recommended expert for each client (based on prior year return analysis)
export const RECOMMENDED_EXPERT = {
  id: 'eric',
  name: 'Eric Martinez',
  yearsExperience: 11,
  specialties: ['W-2 income', 'Schedule C', 'Retirement income'],
  matchReason: 'Based on your 2024 return, Eric specializes in situations like yours and has helped hundreds of clients with similar filings.',
}

// Client price offer (shown on expert match card)
export const CLIENT_ESTIMATED_PRICE = 149
export const CLIENT_PRICE_OFFER_REASON = 'Your tax pro has arranged a preferred rate for you.'
export const CLIENT_OFFER_URGENCY = 'Limited offer — match soon to lock in this rate.'

// Demo user type for prototype: 'new' | 'consent_received' | 'existing'
export const PRO_DEMO_USER_KEY = 'proDemoUser'

export type ProScenario = 'new' | 'consent_received' | 'existing'

export function getProScenario(): ProScenario {
  const v = sessionStorage.getItem(PRO_DEMO_USER_KEY)
  if (v === 'consent_received' || v === 'existing') return v
  return 'new'
}

const PRO_HAS_SENT_CONSENT_KEY = 'proHasSentConsent'

export function getProHasSentConsent(): boolean {
  return sessionStorage.getItem(PRO_HAS_SENT_CONSENT_KEY) === 'true'
}

export function setProHasSentConsent(value: boolean): void {
  if (value) sessionStorage.setItem(PRO_HAS_SENT_CONSENT_KEY, 'true')
  else sessionStorage.removeItem(PRO_HAS_SENT_CONSENT_KEY)
}

export function isNewUser(): boolean {
  return getProScenario() === 'new'
}

export function isConsentReceivedScenario(): boolean {
  return getProScenario() === 'consent_received'
}

// Existing user (Sarah) - 100 clients, higher comp
export const EXISTING_USER_SERVICEABLE_COUNT = 100
export const EXISTING_USER_ESTIMATED_COMP = 8500
export const EXISTING_USER_ACTIVITY_COUNTS: Record<string, number> = {
  consent_provided: 35,
  account_created: 22,
  consent_request_sent: 28,
  documents_submitted: 18,
  serviceability_determined: 15,
}

// Generate 100 clients for existing user tracker
const FIRST_NAMES = ['James', 'Maria', 'Robert', 'Emily', 'Michael', 'Jennifer', 'David', 'Sarah', 'John', 'Lisa']
const LAST_NAMES = ['Wilson', 'Garcia', 'Chen', 'Davis', 'Brown', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore']
const STATUSES = ['consent_request_sent', 'consent_provided', 'documents_submitted', 'account_created', 'starting_journey'] as const

function generateExistingUserClients() {
  const clients: Array<{ id: string; name: string; email: string; status: string; estimatedComp: number }> = []
  for (let i = 1; i <= 100; i++) {
    const first = FIRST_NAMES[(i - 1) % FIRST_NAMES.length]
    const last = LAST_NAMES[(i - 1) % LAST_NAMES.length]
    const status = STATUSES[(i - 1) % STATUSES.length]
    const estimatedComp = 75 + (i % 46) // 75–120 range
    clients.push({
      id: String(i),
      name: i <= 10 ? `${first} ${last}` : `${first} ${last} ${i}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@email.com`,
      status,
      estimatedComp,
    })
  }
  return clients
}

export const EXISTING_USER_CLIENTS = generateExistingUserClients()

// Return completed for existing user clients (pro paid only when account_created AND return_completed)
export const EXISTING_USER_RETURN_COMPLETED: Record<string, boolean> = Object.fromEntries(
  EXISTING_USER_CLIENTS.map((c, i) => [c.id, c.status === 'account_created' && i % 5 === 0])
)

// Bi-weekly client activity newsletter
export const NEWSLETTER_DATA = {
  period: 'Jan 15 – Jan 28, 2026',
  signedUp: 12,
  sentiment: 'Positive',
  statusCounts: {
    waitingForResponse: 8,
    inactive: 3,
    inProgress: 5,
    complete: 4,
  },
  clientQuotes: [
    { quote: 'Smooth transition. My new expert was ready to go.', client: 'Maria G.' },
    { quote: 'Appreciate the personal touch from my tax pro.', client: 'James W.' },
    { quote: 'Everything was explained clearly. No surprises.', client: 'Robert C.' },
  ],
}
