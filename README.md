# Green Land and Ocean Blue Energy: Website

Single-page corporate website built with Next.js (App Router), TypeScript and Tailwind CSS.
Sections: Home, Products, About Us, Locations, Contact and Distributor Registration.
Distributor leads are saved to Google Sheets through a server-side route.

## Requirements
- Node.js 20 or newer
- A Google account (for the lead spreadsheet)

## Local development
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Environment variables
Copy `.env.example` to `.env.local` and fill in real values.
`.env.local` is ignored by Git and must never be committed.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only, international format (e.g. `91XXXXXXXXXX`). No `+` or spaces. Buttons are hidden when empty. |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | Prefilled WhatsApp message. |
| `NEXT_PUBLIC_SITE_URL` | Final public domain, e.g. `https://www.example.com`. Enables the sitemap and canonical URLs. Leave empty until decided. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the service account JSON key. |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON key, in double quotes, with `\n` sequences kept. |
| `GOOGLE_SHEET_ID` | The ID in the spreadsheet URL, between `/d/` and `/edit`. |
| `GOOGLE_SHEET_TAB` | Tab name. Defaults to `Leads`. |

Never prefix Google variables with `NEXT_PUBLIC_`. That would expose them to browsers.
Restart the dev server after changing `.env.local`.

## Google Sheets setup
1. Create a Google Sheet with a tab named `Leads`. Row 1 headers (columns A to K):
   `Timestamp | Full Name | Mobile | Email | Business Name | State | District | Interest | Product Interest | Message | Consent`
2. In Google Cloud Console, create a project and enable the **Google Sheets API**.
3. Create a **service account**, then add a **JSON key** for it.
4. Share the Google Sheet with the service account's `client_email` as **Editor**.
5. Put `client_email`, `private_key` and the Sheet ID in `.env.local`.
6. Keep the JSON key file private and outside the project folder.

If Google credentials are missing, the form shows an "unavailable" message. It never shows a fake success.

## Project structure
```
src/app/            layout, single page, API route (api/distributor), robots, sitemap, error pages
src/components/     layout, products, forms, ui
src/data/           company.ts, products.ts, navigation.ts (edit content here)
src/lib/            validation (zod), google-sheets, whatsapp, site
public/images/      company and product images (add real assets here)
```

## Testing checklist
```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```
Then check manually:
- All sections and navigation links, on mobile, tablet and desktop widths.
- Form: invalid input, valid input (row appears in the Sheet), hidden honeypot filled (no row), repeated submissions (rate limit message), wrong Sheet ID (error message, never success).
- WhatsApp links open the correct number with the message prefilled.
- Keyboard navigation, focus outlines, page title, image alt text, no console errors.

## Anti-spam notes
The form uses a hidden honeypot field and a simple in-memory rate limit (5 submissions per IP per 10 minutes).
The rate limit resets on server restart and is not shared between server instances, so it only slows casual spam.
For stronger protection, add a service such as Cloudflare Turnstile.

## Remaining placeholders before launch
- Phone, email and full address (`src/data/company.ts`)
- Real WhatsApp number (`.env.local` and the hosting settings)
- Privacy notice wording (form consent text); the business must approve it
- Company logo and real images
- Descriptions for Battery Water and Drinking Water
- Final domain (`NEXT_PUBLIC_SITE_URL`)
- Hosting provider (not yet decided)

## Deployment
Hosting has not been chosen. Whatever platform is used must:
- run `npm run build` and `npm run start` (Node.js 20+),
- have every variable from the table above set in its environment settings (`.env.local` is not uploaded),
- be given the final domain via `NEXT_PUBLIC_SITE_URL`.