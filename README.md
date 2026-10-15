# ScopeAI: Project Scoping and Proposal Generator

A full-stack web application that converts a plain-English product idea into a structured project proposal (scope, technology stack, team, timeline, cost range, risks), lets the visitor capture themselves as a lead, and gives the sales team a password-protected dashboard to track leads.

## Features
- Idea intake form with platform, budget, timeline and Web3 options, plus one-click example ideas
- AI-generated proposal as **validated structured JSON** (Zod), with one automatic retry on invalid output
- Shareable proposal page (`/proposal/<id>`) and **PDF download** (print stylesheet)
- Lead capture saved to MongoDB against the proposal
- Admin dashboard (`/admin`) with summary counts, lead table and status workflow (New / Contacted / Won / Lost)
- Per-IP rate limiting on AI, lead and login endpoints
- **Demo mode**: runs without an AI key using built-in templates, so the app always works

## Tech stack
Next.js 14 (App Router, API routes), TypeScript, Tailwind CSS, MongoDB (native driver), Zod, Anthropic or OpenAI API.

## Architecture
```
Browser -> Next.js pages (server components) ---> MongoDB (proposals collection)
        -> /api/proposals            -> lib/ai.ts -> Anthropic / OpenAI (or demo templates)
        -> /api/proposals/:id/lead   -> MongoDB
        -> /api/admin/*              -> signed-cookie session -> MongoDB
```
Each proposal is one document: `{ input, proposal, source, lead?, status, createdAt }`. A lead is a proposal that has a `lead` field.

## Run locally
```bash
npm install
cp .env.example .env.local     # then fill in values
npm run dev                    # http://localhost:3000
```
Required: `MONGODB_URI`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`. Optional: `ANTHROPIC_API_KEY` (or `OPENAI_API_KEY` with `AI_PROVIDER=openai`). Without a key the app runs in demo mode.

A free MongoDB Atlas cluster works. In Atlas, create a database user and allow network access from `0.0.0.0/0` (needed for Vercel).

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel (framework: Next.js, no build changes).
3. Add the environment variables from `.env.example` under Project Settings, Environment Variables.
4. Deploy. Open `/admin` and sign in with `ADMIN_PASSWORD`.

## Design decisions
- **Structured output with validation**: the model must return JSON matching a Zod schema; invalid output triggers one corrective retry, so the page never renders malformed data.
- **Prompt-injection hygiene**: the client's idea is delimited and the model is told to treat it as data.
- **Demo fallback**: reviewers can run the full flow without any API key.
- **Stateless sessions**: the admin cookie is an HMAC-signed expiry timestamp; no session store needed.
- **PDF via print stylesheet**: zero dependencies and reliable on serverless.

## Known limitations and next steps
- Rate limiting is in memory (per instance); move to Redis or MongoDB for multi-instance production.
- Single shared admin password; replace with per-user auth (e.g. Auth.js) for a team.
- Add email notifications to sales on new leads, and CSV export of leads.
- Cost figures are indicative model estimates, not quotations.
