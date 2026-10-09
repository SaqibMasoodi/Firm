# Current status: WhatsApp only

The contact form redirects directly to WhatsApp with all form details. It does not call the email endpoint or display a popup. Email delivery is disabled by default (`CONTACT_EMAIL_ENABLED=false`). The email integration below is retained for future setup; enabling it also requires reconnecting the form to the email endpoint.

# Contact email and WhatsApp setup

The old endpoint only logged submissions. It now sends one email per enquiry through Resend's HTTPS API (`https://api.resend.com/emails`). It uses a retry idempotency key so retrying the same submission does not create duplicate emails.

The recipient defaults to the contact email in Admin → Site Settings, currently `masudisaqib1@gmail.com`. Optional `CONTACT_TO_EMAIL` overrides that recipient. The visitor's email is set as Reply-To, so replying to the enquiry addresses the visitor. Name, email, phone, subject and full message are included as plain text.

## Enable real email delivery

1. Create your Resend account and API key: https://resend.com/api-keys
2. Verify a domain you own in Resend by adding its required DNS records. Use an address on that verified domain as the sender. You cannot verify `gmail.com` or the shared `vercel.app` domain as your own sender domain.
3. Set these server-only environment variables in Vercel's project settings and in `.env.local` for local development:
   - `CONTACT_EMAIL_ENABLED`: set to `true` when ready to re-enable email.
   - `RESEND_API_KEY`: your Resend API key.
   - `CONTACT_FROM_EMAIL`: your approved sender, e.g. `Northforge Labs <enquiries@your-owned-domain.com>`.
   - `CONTACT_TO_EMAIL`: optional; defaults to the site contact email.
4. Redeploy the Vercel project (or restart the local development server) after setting variables.
5. Send a real test enquiry and confirm it arrives in your inbox. Resend acceptance is not a guarantee of final inbox delivery; delivery status is available in Resend's dashboard.

For an initial restricted test, Resend's `onboarding@resend.dev` sender can send only to the email address associated with the Resend account. If that account is registered with `masudisaqib1@gmail.com`, it can be used to test delivery there. Use a verified sender domain for unrestricted production sending.

Never place the API key in public variables, browser code, admin fields or source control. No credentials are included in this implementation. Without configured credentials, the endpoint returns an error and does not pretend the enquiry was sent.

## Visitor flow

The browser sends the form to `/api/contact`. The server validates it, calls Resend, and waits for provider acceptance. Only then does the browser show the optional WhatsApp dialog. Choosing Open WhatsApp opens `https://wa.me/919622720283` with a URL-encoded template containing all submitted details. The visitor must press Send in WhatsApp; the site does not send WhatsApp messages automatically. No WhatsApp API account is needed for this click-to-chat flow.

The WhatsApp number remains editable in Admin → Site Settings. Declining or pressing Escape dismisses the prompt, and the email submission is retained. Email failures preserve the filled form and show an error; they do not open the WhatsApp success prompt.

References:
- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
