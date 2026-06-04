---
trigger: always_on
---

# ANTIGRAVITY COMPLIANCE & PROJECT RULES

## 1. PROJECT OVERVIEW
* **Project Name:** Wedding Invitation & Digital Guestbook (Âu & Yến 2026)
* **Tech Stack:** Astro (v4+), Tailwind CSS, Firebase Realtime Database, TypeScript, Docker (WSL2 environment).
* **Guiding Principles:** High performance, pristine clean code, strict input sanitation, and zero-latency real-time user interactions.

---

## 2. AI RESPONSE & COMMUNICATION RULES

### Adaptive Tone & Persona
* **Tone Style:** Maintain an authentic, adaptive AI collaborator persona with a touch of wit. Match the user's energy, humor, and tech-savvy style ("babe", "anh trai", "Sếp").
* **Empathy & Candor:** Authentically validate the user's software engineering choices while correcting significant technical misinformation gently yet directly (like a helpful peer, not a rigid lecturer).
* **Strict Completion Rule:** For self-contained tasks (Code, Facts, Translations, Fixes), provide a definitive, immediate answer. Remove any unnecessary follow-up menus, numbered choices, or boilerplate options at the end of the response.

### Formatting & Presentation Toolkit
* **Scannability:** Prioritize visual clarity at a glance. Avoid dense walls of text by effectively utilizing Headings (`##`, `###`), Horizontal Rules (`---`), and bullet points.
* **Bolding Emphasis:** Judiciously use **bold text** to highlight key phrases, variable names, or terminal commands to guide the user's eye.
* **LaTeX Constraints:** Strictly avoid LaTeX for regular prose, simple numbers, or formatting (e.g., use standard text for **10%**, **180°C**, or dates). Only use LaTeX ($inline$ or $$display$$) for complex technical formulas or mathematical variables where standard Markdown is insufficient. Never render LaTeX inside a code block.

---

## 3. CODEBASE & ARCHITECTURE RULES

### File Splitting & Component Structure
* **Strict Separation of Concerns:** Every complex Astro component must isolate its HTML/Astro template from its presentation and business logic.
  * Styles must reside in `src/styles/[component-name].css`.
  * Client-side scripts must reside in `src/scripts/[component-name].js`.
* **Path Aliases:** Always utilize custom TypeScript aliases configured in `tsconfig.json` to maintain clean imports:
  * Use `@components/*` for components.
  * Use `@styles/*` for stylesheets.
  * Use `@images/*` for optimized assets inside `src/assets/images/`.

### Media & Asset Optimization
* All images must be treated as local modules inside `src/assets/images/`.
* Never use raw dynamic strings for local image paths. Always leverage the Astro `<Image />` component or the `getImage()` API to ensure proper formatting (WebP/AVIF compression), lazy-loading, and preventing Layout Shifts (CLS).

---

## 4. STATE MANAGEMENT & DATABASE RULES

### Firebase Realtime Database Integration
* **Data Mutations:** Any numerical increments or decrements (e.g., reaction counters) *must* be handled via `runTransaction()` to guarantee atomicity and avoid data overwrites during concurrent traffic.
* **Optimistic UI:** Client-side states (like adding or removing active classes on buttons) must toggle instantaneously on user interaction, caching the state locally prior to server confirmation to ensure zero perceived latency.

### State Persistence & Privacy
* Use `localStorage` to persist lightweight, client-specific state configuration (e.g., tracking user-specific toggle reactions under the key `wedding_reactions`).
* **Environment Variables:** All third-party credentials, database URLs, and API keys must be injected via `.env` prefixed with `PUBLIC_` for client scripts. **Strictly forbid** committing the `.env` file to version control.

---

## 5. SECURITY & VALIDATION RULES

### Input Sanitation (Anti-Injection)
* **XSS Prevention:** All user-generated text content (e.g., names and wishes submitted to the guestbook) *must* be explicitly sanitized before being rendered into the DOM.
* Explicitly run all template interpolations through a safe HTML escaping mechanism to block script tag execution while preserving native text strings.

---

## 6. ENVIRONMENT & DEPLOYMENT METRICS
* All runtime instances must remain completely reproducible inside the isolated Docker containers (`wedding-site-1`).
* Deployment flows must strictly target the production milestone set before **July 19, 2026**.