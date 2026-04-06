# Stage 1 — Project Status (For review)

**Date:** 6 April 2026  
**Purpose:** First formal checkpoint — scope locked, work underway, clear path to the next milestone.

---

## 1. What Stage 1 is

Stage 1 is the **foundation sprint**: we turned a broad idea into a **structured task list**, **owners**, and **deadlines**, and started execution on the pieces that everything else depends on (UI flow, occupation/search, data, and integrations). This document is what we can show to confirm the project is **actively managed**, not only discussed once.

---

## 2. Project snapshot (one sentence)

We are building a **mobile application** with onboarding, **occupation search** (including voice input), **profile and contact** experiences, **notifications**, **payments (Razorpay)**, and **location (Google)** — with backend/data flow validated and storage/backup considered for sensitive features (e.g. status updates).

---

## 3. How the team is organised

| Area | Main owner | Notes |
|------|------------|--------|
| UI / UX | Akshay | Bottom bar, profile, contact effects, onboarding alignment, back navigation |
| Search & occupation | Kamran | Search flow, SQLite checks, contact/trusted people, backend integration with mentor |
| Testing & costs | Prathvi | Occupation testing, Google Location API usage/cost, demos, tracker |
| Backend & data | Team + mentor (“Sir”) | Data flow, folders, chat routes (send/receive) |
| Cross-cutting | Kamran, Soham, Aditya, **Lalit** | **Update page** review/fixes; **status update** feature with drive/cloud backup story |

---

## 4. What is **done or locked in** during Stage 1

- **Requirements and scope** are written down (screens, flows, integrations).
- **Roles and deadlines** are assigned (e.g. occupation mic + UI targets around 5–6 April; **Tuesday** as finalisation target for this phase).
- **Risky items** are flagged early: **notification crashes**, **API costs**, **Razorpay timeline (~10 days + buffer)**.
- **Dependencies** are clear: occupation E2E and SQLite correctness unblock profile/onboarding; back-button behaviour is reviewed across screens with design/dev alignment.

*(If your teacher asks for “evidence”: the team artefact is the master task breakdown; my personal artefact is Section 5.)*

---

## 5. My contribution (Lalit) — **active ownership**

I am responsible for the **cross-functional “update” workstream** with Kamran, Soham, and Aditya:

1. **End-to-end review of the update page** — list issues, prioritise fixes, align with UI and backend.
2. **Status update feature** — work with Akshay and Kamran so that:
   - data can be **saved to drive/cloud** as agreed,
   - **backup flow** is understandable on the user side.

**By the next checkpoint** I will deliver: a short **written review** (what works / what breaks / what to fix first) and **acceptance criteria** for “status saved and recoverable,” so implementation is testable.

---

## 6. What we are **executing now** (Stage 1 execution focus)

- Fix **bottom UI** and complete core **UI** for the agreed date.
- **Occupation search** end-to-end + **SQLite** validation; **microphone** in search bar.
- **Contact page** + **trusted people** sliding effect; **profile** improvements; remove **email/phone** from profile settings where decided.
- **Vendor screen** animation; **notification** stability (push + in-app).
- **Back button** consistency; remove **back button from occupation screen** where specified.
- **Backend:** verify data retrieval from folders; collect **chat** routes for send/receive.

---

## 7. Next stage preview (after Stage 1 sign-off)

- **Order screen** (after design/flow review).
- **Razorpay** integration (full timeline with buffer).
- **Market direction** for the mobile app and **iOS developer account** setup.

---

## 8. One slide you can say out loud (30 seconds)

> “We completed Stage 1 as a **planned sprint**: scope, owners, and deadlines are fixed. UI and occupation search are in active development with SQLite and API checks. I own the **update page review** and **status update** feature with clear backup criteria. Risks like notifications and API costs are tracked. Next we finalise this wave and move to orders and payments.”

---

## 9. Optional: questions we’re ready for

- **How do you know work is real?** — Task owners, dates, and dependencies; demos from Prathvi; my written update-page review.
- **What could slip?** — Integrations (Razorpay length), API billing, notification edge cases; we’ve named them upfront.
- **What’s the next deliverable?** — Working occupation flow + stable core UI + my update/status criteria document.

---

*End of Stage 1 teacher handout.*
