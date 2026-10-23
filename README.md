# ScopeAI

Live Demo: https://scope-ai-lilac.vercel.app  
GitHub: https://github.com/AayushiSharma2005/ScopeAI

ScopeAI is a full-stack web application that takes a plain-English software idea and turns it into a structured technical proposal. It breaks down features into MVP vs Phase 2 modules, recommends an appropriate tech stack with rationales, estimates team sizing and timelines, and provides cost ranges.

Visitors can review their generated proposal, download it as a PDF, or submit their contact details to request a consultation. An authenticated admin dashboard allows the team to track leads, filter by deal status, search, and export data to CSV.

---

## What It Does

1. **Scoping Studio**: Users enter their product idea, target platform (Web, Mobile, Cross-Platform), budget band, and target timeline, with optional Web3 settings.
2. **AI Proposal Generation**: The app sends the requirements to Claude (Anthropic API) and forces the output into a strict JSON schema using Zod. If the output fails validation, it automatically retries once to self-correct.
3. **Smart Fallback Mode**: If no AI API key is configured, the app uses a built-in domain template engine so that the entire proposal flow still works without errors.
4. **Resilient Database Layer**: Connects to MongoDB Atlas to store proposals and consultation leads. If MongoDB is offline or unconfigured, it automatically falls back to an in-memory store so the app never throws 500 errors.
5. **PDF Export & Share**: Proposals can be downloaded as a clean PDF using custom print styles without heavy external PDF libraries.
6. **Admin CRM Pipeline**: A password-protected dashboard (`/admin`) to manage incoming leads, update statuses (New, Contacted, Won, Lost), search across leads, filter by status, and export everything to CSV.

---

## Tech Stack

* **Framework**: Next.js 14 (App Router, Server Components, API Route Handlers)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Database**: MongoDB (native driver with in-memory fallback)
* **Validation**: Zod (runtime schema validation)
* **AI Provider**: Anthropic Claude API (with template fallback)
* **Authentication**: Stateless cookie sessions signed with HMAC-SHA256

---

## Project Structure

```text
scopeai/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Homepage and scoping studio
│   │   ├── layout.tsx             # Root layout, header, footer, metadata
│   │   ├── globals.css            # Tailwind directives and print styles
│   │   ├── proposal/[id]/page.tsx # Proposal dossier view & lead form
│   │   ├── admin/
│   │   │   ├── page.tsx           # Admin CRM dashboard
│   │   │   └── login/page.tsx     # Admin login screen
│   │   └── api/
│   │       ├── proposals/route.ts          # Proposal generation endpoint
│   │       ├── proposals/[id]/lead/route.ts# Lead capture endpoint
│   │       └── admin/                      # Auth and lead status endpoints
│   ├── components/
│   │   ├── IdeaForm.tsx           # Scoping form with benchmarks
│   │   ├── ProposalView.tsx       # Executive proposal presentation
│   │   ├── LeadForm.tsx           # Consultation booking component
│   │   ├── AdminLeadsTable.tsx    # CRM table with search, filter, CSV
│   │   ├── PrintButton.tsx        # PDF print and share action bar
│   │   └── StatusSelect.tsx       # Asynchronous status update pill
│   └── lib/
│       ├── ai.ts                  # Anthropic / OpenAI integration with retries
│       ├── db.ts                  # MongoDB client + in-memory store fallback
│       ├── schema.ts              # Zod schemas for input, output, leads
│       ├── mock.ts                # Deterministic domain template engine
│       ├── auth.ts                # HMAC session creation and verification
│       ├── ratelimit.ts           # IP-based rate limiter
│       └── format.ts              # Currency and date formatting helpers
└── tailwind.config.ts
```

---

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/AayushiSharma2005/ScopeAI.git
   cd ScopeAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and configure your keys:
   ```bash
   cp .env.example .env.local
   ```
   *(The app works out-of-the-box in demo mode even if MongoDB or Anthropic keys are left blank).*

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Environment Variables

| Variable | Description | Default / Required |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas connection string | Optional (falls back to in-memory) |
| `MONGODB_DB` | Database name | `scopeai` |
| `ADMIN_PASSWORD` | Password for `/admin` access | Required for admin login |
| `ADMIN_SESSION_SECRET` | Secret key for signing HMAC cookies | Required for sessions |
| `AI_PROVIDER` | `anthropic`, `openai`, or `demo` | `demo` |
| `ANTHROPIC_API_KEY` | Anthropic API key | Optional (uses templates if blank) |
| `NEXT_PUBLIC_COMPANY_NAME` | Business name shown in UI | Optional |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email shown in UI | Optional |

---

## Author

Developed by **Aayushi Sharma**  
* GitHub: [AayushiSharma2005](https://github.com/AayushiSharma2005)  
* LinkedIn: [aayushi-sharma-4720302a0](https://www.linkedin.com/in/aayushi-sharma-4720302a0)
