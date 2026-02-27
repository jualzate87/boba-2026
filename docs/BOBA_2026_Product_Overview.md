# BOBA 2026 — Product Overview for Stakeholders

**Book of Business Acquisition Prototype**  
*Low-to-mid fidelity mockups for Intuit's acquisition of retiring tax firms' books of business*

---

## Executive Summary

BOBA 2026 is a prototype that demonstrates the end-to-end experience for **retiring tax professionals** who are transitioning their client book of business to TurboTax Full Service. It also shows the **client journey** — how taxpayers receive communication, provide consent, and onboard into TurboTax Full Service.

**Two primary audiences:**
1. **Tax professionals (pros)** — Retiring preparers who are selling their practice
2. **Taxpayers (clients)** — Individuals who will be transitioned to TurboTax Full Service

---

## User Types & States

### Pro Portal: New User vs. Returning User

| User Type | When to Use | Dashboard State |
|-----------|-------------|-----------------|
| **New user** | First-time pro who has not completed any steps | No estimated compensation. Steps shown as "Ready" or "In progress." No client activity. |
| **Returning user** | Pro who has completed onboarding and sent communications | Estimated compensation shown. Client activity summary. Completed steps in read-only. |

**How to switch:** On the Sign In page (`/pro`), choose "New user" or "Returning user." No form fields — just two buttons for demo purposes.

---

## Pro Portal Flow

### Step 1: Sign In
- **Route:** `/pro`
- **Options:** New user | Returning user
- **Purpose:** Demo shortcut to see both dashboard states

### Step 2: Dashboard
- **Route:** `/pro/dashboard`
- **New user:** Welcome message, estimated compensation explanation (no amount yet), steps list, timeline, contact support
- **Returning user:** Estimated compensation ($8,500 for 100 clients), client activity at a glance, completed steps (view contract, profile, upload more, contact support), "See details" CTA to Client Tracker

### Step 3: Sign Agreement
- **Route:** `/pro/agreement`
- **Purpose:** Review and sign terms for transitioning the book of business

### Step 4: Business Information
- **Route:** `/pro/business`
- **Purpose:** Firm details, logo upload for client communications

### Step 5: Upload Client Data
- **Route:** `/pro/upload`
- **Purpose:** Bulk upload client list (CSV/Excel) and prior year returns (PDF/JPEG). Guided, modern drag-and-drop experience. Simulated extraction and organization.

### Step 6: Client List
- **Route:** `/pro/clients`
- **Purpose:** Review all clients with eligibility status (Serviceable, Not serviceable, Missing document). Filters: Eligibility dropdown, Client status dropdown. Est. Comp. column with tooltip: "Provide calculations based on their prior year 1040." Paid column hidden for new pro; shown for returning pro (only Yes for completed engagements).

### Step 7: Send Communication
- **Route:** `/pro/send`
- **Purpose:** Preview and send transition email to serviceable clients

### Step 8: Client Tracker
- **Route:** `/pro/tracker`
- **Purpose:** Track client status (Not contacted, Email sent, Consent provided, Account created, etc.). Eligibility column. Est. Comp. tooltip. Paid column for returning pro only. Filters: Eligibility, Client status (dropdowns).

### Step 9: Bi-Weekly Newsletter (Returning Pro Only)
- **Route:** `/pro/newsletter`
- **Access:** Floating button (bottom-right) visible only for returning pro
- **Purpose:** Mock-up of bi-weekly activity report — client sign-ups, sentiment, testimonials

---

## Client Flow

### Entry Point
- **Route:** `/client/email` — Email mockup (or "View as client" from Pro Portal)
- **Flow:** Email → Consent → Start Experience → Create Account → Expert Match

### Step 1: Consent
- **Route:** `/client/consent/:clientId`
- **Purpose:** Transition consent form. I agree / I decline. Benefits section below: Quick experience, Accuracy guaranteed, Meet in person or online, Easy collaboration, 24/7 support, Maximum refund guarantee.

### Step 2: Start Experience
- **Route:** `/client/start/:clientId`
- **Purpose:** Recommended expert preview. Benefits of creating account now. CTA: "Create account and get started."

### Step 3: Create Account
- **Route:** `/client/account/:clientId`
- **Purpose:** Sign up, upload docs, expert match. Pre-populated email. Special offer from TurboTax with urgency ("Limited offer — match soon to lock in this rate").

---

## Key Features by Component

| Component | Highlights |
|-----------|------------|
| **Dashboard** | Two states (new vs. returning). Single "See details" CTA. No redundant client tracker links. |
| **Client List** | All clients (including non-eligible). Dropdown filters. Est. Comp. tooltip. Paid column logic. |
| **Client Tracker** | Same as Client List. Newsletter floating button (returning pro only). |
| **Consent** | Persuasive benefits below form. TurboTax Full Service language. |
| **Start Experience** | Benefits of creating account. Expert preview. |
| **Account** | Price estimate, special offer, urgency. Pre-populated email. |

---

## Data & Logic Summary

- **Communication sent:** New pro = not sent → all clients show "Not contacted." Returning pro = sent → real statuses.
- **Paid column:** New pro = hidden. Returning pro = Yes only for clients with account_created + return_completed.
- **Est. Comp. tooltip:** "Provide calculations based on their prior year 1040."
- **Sample firm:** Anderson Tax & Associates. Pro: Sarah Anderson. Clients: James Wilson, Maria Garcia, Robert Chen, Emily Davis, Michael Brown.

---

## Routes Quick Reference

| Route | Description |
|-------|-------------|
| `/` | Home — Pro Portal or Client Flow entry |
| `/pro` | Sign in (New user / Returning user) |
| `/pro/dashboard` | Dashboard |
| `/pro/agreement` | Sign agreement |
| `/pro/business` | Business info + logo |
| `/pro/upload` | Upload client data |
| `/pro/clients` | Client list |
| `/pro/send` | Send communication |
| `/pro/tracker` | Client tracker |
| `/pro/newsletter` | Bi-weekly report |
| `/client/email` | Client email mockup |
| `/client/consent/:clientId` | Consent form |
| `/client/start/:clientId` | Start experience |
| `/client/account/:clientId` | Create account, expert match |

---

## How to Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 (or the port shown). Base path: `/boba-2026/` when deployed.

---

## Export to PDF

To create a PDF from this document:

1. **VS Code:** Install "Markdown PDF" extension → Right-click this file → "Markdown PDF: Export (pdf)"
2. **Pandoc:** `pandoc docs/BOBA_2026_Product_Overview.md -o BOBA_2026_Product_Overview.pdf`
3. **Online:** Paste content into Google Docs or Word, then File → Download → PDF

---

*Last updated: February 2026*
