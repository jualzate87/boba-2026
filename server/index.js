import express from 'express'
import { Resend } from 'resend'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)
const APP_URL = process.env.APP_URL || 'http://localhost:5173'

const FIRM = { name: 'Anderson Tax & Associates' }
const PRO = { name: 'Sarah Anderson' }

app.post('/api/send-email', async (req, res) => {
  const { to = 'juan_alzate@intuit.com', baseUrl = APP_URL } = req.body

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'RESEND_API_KEY is not set. Add it to your .env file.',
    })
  }

  const consentLink = `${baseUrl}/client/consent/1`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Lato, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="border-bottom: 1px solid #E2E2E2; padding-bottom: 16px; margin-bottom: 24px;">
    <span style="font-weight: bold; color: #0376C9; font-size: 18px;">Intuit</span>
    <span style="font-weight: 600; color: #E31837; font-size: 16px;"> TurboTax</span>
    <span style="color: #AFAFAF;"> | </span>
    <span style="color: #545454;">${FIRM.name}</span>
  </div>
  
  <p>Dear [Client],</p>
  
  <p>After many years of serving you, I'm writing to share an important update. I've partnered with TurboTax to ensure your taxes continue to be handled by experts you can trust.</p>
  
  <p>TurboTax Full Service offers the same quality you're used to—qualified experts, accuracy guarantees, and year-round support. I need you to provide consent to complete this transition. It only takes a moment.</p>
  
  <p style="margin: 24px 0;">
    <a href="${consentLink}" style="display: inline-block; padding: 12px 24px; background-color: #0376C9; color: white; text-decoration: none; font-weight: 500; border-radius: 6px;">Review and provide consent</a>
  </p>
  
  <p style="font-size: 14px; color: #6B6B6B;">This link is unique to you. If you have questions, reply to this email or call us.</p>
  
  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E2E2E2; font-size: 12px; color: #6B6B6B;">
    Intuit Inc. | Privacy | Unsubscribe | Contact us
  </div>
</body>
</html>
`

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'BOBA Demo <onboarding@resend.dev>',
      to: [to],
      subject: `Important update about your taxes — ${PRO.name}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: error.message })
    }

    res.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Send error:', err)
    res.status(500).json({ error: err.message || 'Failed to send email' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`BOBA API server running on http://localhost:${PORT}`)
})
