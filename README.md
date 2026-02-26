# BOBA 2026 — Book of Business Acquisition Prototype

Low-to-mid fidelity mockups for Intuit's acquisition of retiring tax firms' books of business.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 (or the port shown in the terminal).

## Send Real Email (Client Journey Demo)

To send a real email when you click "Send" in the Pro Portal:

1. **Get a Resend API key** at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. **Create `.env`** in the project root:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
3. **Run the app** with `npm run dev` (starts both frontend and API server)
4. **Go to Pro Portal** → Send communication → Click "Send email to juan_alzate@intuit.com"
5. **Check your inbox** at juan_alzate@intuit.com and click the link in the email
6. **Complete the client journey**: Consent → Landing → Create account → Upload docs → Match with expert

**Link URL**: If testing on the same machine, the default URL works. If opening the email on another device (e.g., phone), use [ngrok](https://ngrok.com) (`ngrok http 5173`) and enter the ngrok URL in the "Link URL" field before sending.

## Routes

### Pro Portal (Retiring Tax Professional)
- `/pro` — Sign in
- `/pro/dashboard` — Dashboard with next steps
- `/pro/agreement` — Step 1: Sign agreement
- `/pro/business` — Step 2: About your business (includes logo upload)
- `/pro/upload` — Step 3: Upload client list (CSV/Excel) + prior year returns (PDF/JPEG)
- `/pro/clients` — Client list review with serviceability status
- `/pro/send` — Send communication to clients (email preview)
- `/pro/tracker` — Client status tracker

### Client Flow
- `/client/email` — Email mockup (as client would see it)
- `/client/consent/:clientId` — Consent form (first touchpoint from email link)
- `/client/landing` — TurboTax Full Service landing page (after consent)
- `/client/account` — Create account → Upload docs → Match with expert

## Sample Data

Fixed examples used throughout:
- **Firm**: Anderson Tax & Associates
- **Pro**: Sarah Anderson
- **Clients**: James Wilson, Maria Garcia, Robert Chen, Emily Davis, Michael Brown

## Design

- Intuit/TurboTax color palette (blue #0376C9, red #E31837)
- Lato font
- Aligned with Intuit Content Guidelines (plainspoken, genuine, professional)
