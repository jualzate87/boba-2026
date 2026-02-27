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
}

export const PRO = {
  name: 'Sarah Anderson',
  email: 'sarah@andersontax.com',
}

export const CLIENTS = [
  { id: '1', name: 'James Wilson', email: 'james.wilson@email.com', status: 'serviceable' as const, priorYearReturn: '1040_2024.pdf', estimatedComp: 85 },
  { id: '2', name: 'Maria Garcia', email: 'maria.garcia@email.com',   status: 'serviceable' as const, priorYearReturn: '1040_2024.pdf', estimatedComp: 120 },
  { id: '3', name: 'Robert Chen', email: 'robert.chen@email.com', status: 'serviceable' as const, priorYearReturn: '1040_2024.pdf', estimatedComp: 95 },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@email.com', status: 'not_serviceable' as const, priorYearReturn: '1040_2024.pdf', reason: 'Complex foreign transactions', estimatedComp: 0 },
  { id: '5', name: 'Michael Brown', email: 'michael.brown@email.com', status: 'missing_document' as const, priorYearReturn: null, estimatedComp: 0 },
]

// Status for serviceable clients in the tracker
export const CLIENT_STATUSES: Record<string, string> = {
  '1': 'consent_provided',
  '2': 'account_created',
  '3': 'email_opened',
}

export const CONSENT_REJECTION_REASONS: Record<string, string> = {
  // Demo: no rejections in current data
}

// Whether client has completed their return (pro is paid only when account created AND return completed)
export const CLIENT_RETURN_COMPLETED: Record<string, boolean> = {
  '1': false,
  '2': true,  // account created + return completed = pro paid
  '3': false,
}

// Recommended expert for each client (based on prior year return analysis)
export const RECOMMENDED_EXPERT = {
  name: 'Eric Martinez',
  yearsExperience: 11,
  specialties: ['W-2 income', 'Schedule C', 'Retirement income'],
  matchReason: 'Based on your 2024 return, Eric specializes in situations like yours and has helped hundreds of clients with similar filings.',
}

// Client price offer (shown on expert match card)
export const CLIENT_ESTIMATED_PRICE = 149
export const CLIENT_PRICE_OFFER_REASON = 'Your tax pro has arranged a preferred rate for you.'
export const CLIENT_OFFER_URGENCY = 'Limited offer — match soon to lock in this rate.'

// Demo user type for prototype (new vs existing)
export const PRO_DEMO_USER_KEY = 'proDemoUser'

// Existing user (Sarah) - 100 clients, higher comp
export const EXISTING_USER_SERVICEABLE_COUNT = 100
export const EXISTING_USER_ESTIMATED_COMP = 8500
export const EXISTING_USER_ACTIVITY_COUNTS: Record<string, number> = {
  consent_provided: 35,
  account_created: 22,
  email_opened: 28,
  email_sent: 15,
}

// Generate 100 clients for existing user tracker
const FIRST_NAMES = ['James', 'Maria', 'Robert', 'Emily', 'Michael', 'Jennifer', 'David', 'Sarah', 'John', 'Lisa']
const LAST_NAMES = ['Wilson', 'Garcia', 'Chen', 'Davis', 'Brown', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore']
const STATUSES = ['email_sent', 'email_opened', 'consent_provided', 'account_created'] as const

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
