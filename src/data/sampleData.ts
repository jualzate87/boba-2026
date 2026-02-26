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
  clientCount: 4,
  yearsInBusiness: 15,
  taxSoftware: 'Lacerte',
}

export const PRO = {
  name: 'Sarah Anderson',
  email: 'sarah@andersontax.com',
}

export const CLIENTS = [
  { id: '1', name: 'James Wilson', email: 'james.wilson@email.com', status: 'serviceable' as const, priorYearReturn: '1040_2024.pdf' },
  { id: '2', name: 'Maria Garcia', email: 'maria.garcia@email.com', status: 'serviceable' as const, priorYearReturn: '1040_2024.pdf' },
  { id: '3', name: 'Robert Chen', email: 'robert.chen@email.com', status: 'serviceable' as const, priorYearReturn: '1040_2024.pdf' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@email.com', status: 'not_serviceable' as const, priorYearReturn: '1040_2024.pdf', reason: 'Complex foreign transactions' },
  { id: '5', name: 'Michael Brown', email: 'michael.brown@email.com', status: 'missing_document' as const, priorYearReturn: null },
]

// Status for serviceable clients (1, 2, 3) in the tracker
export const CLIENT_STATUSES: Record<string, string> = {
  '1': 'consent_provided',
  '2': 'account_created',
  '3': 'email_opened',
}

export const CONSENT_REJECTION_REASONS: Record<string, string> = {
  '2': 'Prefer to use a different tax preparer', // Demo: client 2 declined
}
