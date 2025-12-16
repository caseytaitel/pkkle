# pkkle — V2 SPEC

---

## 1. Product Summary

pkkle is a mental-performance app for pickleball players focused on intention, emotional regulation, and reflection.

V2 is a polished, production-quality single-user app with three core pillars:

1. Today — daily mental loop (Pre + Post)
2. Regulate — nervous system grounding + reflection
3. Success — brief micro-reward states

V2 prioritizes:

* Emotional safety
* Calm, breathable UX
* Clean, readable code
* Locked scope

---

## 2. Scope & Constraints (V2)

* Pre-Session intention logging
* Post-Session emotion + reflection logging
* Daily Today orchestration
* Regulate breathing + reflection (frontend-only)
* Soft navigation + fade transitions
* Polished micro-interactions

---

## 3. System Architecture Overview

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router v6
* Axios API client

### Backend

* Node
* Express
* Prisma
* SQLite
* Zod validation

Backend is stable and locked in V2.

---

## 4. Data Model (Backend)

### Session (Prisma)

```prisma
model Session {
  id         Int      @id @default(autoincrement())
  type       String   // "pre" | "post"
  intention  String?  // pre only
  emotion    String?  // post only
  reflection String?  // post only

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### Decisions

* Single `Session` model (pre/post distinguished by `type`)
* Server-generated timestamps
* Strings are trimmed
* Unknown fields rejected

---

## 5. API Surface (LOCKED)

Base path: `/api`

### 5.1 GET `/sessions/today`

Returns all sessions created today.

Response shape:

```ts
type SessionType = "pre" | "post"

interface Session {
  id: number
  type: SessionType
  intention?: string
  emotion?: string
  reflection?: string
  createdAt: string
}
```

Used exclusively by `TodayPage`.

---

### 5.2 POST `/sessions`

Creates a new session.

#### Pre-Session Body

```json
{
  "type": "pre",
  "intention": "string",
  "secondaryIntention": "string (optional)"
}
```

Rules:

* `intention`: required, trimmed
* `secondaryIntention`: optional, trimmed
* No unknown fields

---

#### Post-Session Body

```json
{
  "type": "post",
  "emotion": "string",
  "reflection": "string"
}
```

Rules:

* `emotion`: required
* `reflection`: required, trimmed
* No unknown fields

---

## 6. Frontend Route Map

```
/                       → TodayPage
/pre                    → PreSessionPage
/post                   → PostSessionPage
/regulate               → RegulatePage
/regulate/ground        → RegulateGroundingPage
/regulate/redo          → RegulateRedoPage
/regulate/chat          → RegulateChatPage
/session/success        → SessionSuccessPage
```

All routes are children of `RootLayout`.

---

## 7. Navigation & Layout Rules

### RootLayout Responsibilities

* Render `<Outlet />`
* Control BottomNav visibility
* Maintain safe-area padding

### BottomNav Visibility

Visible:

* `/`
* `/regulate`

Hidden:

* `/pre`
* `/post`
* `/regulate/ground`
* `/regulate/redo`
* `/regulate/chat`
* `/session/success`

Reason:
These routes are immersive flows, not destinations.

---

## 8. Page-Level Behavior

### 8.1 TodayPage (`/`)

* Fetches `/sessions/today`
* Derives state:

  * No sessions → empty CTA
  * Pre only → post CTA
  * Pre + Post → completion state
* No local persistence

---

### 8.2 PreSessionPage (`/pre`)

* Category selector (Rec / Drilling / Tournament)
* Primary intention (presets + freeform)
* Optional secondary intention
* Sticky CTA
* POST `/sessions` → success

---

### 8.3 PostSessionPage (`/post`)

* Emotion select
* Reflection textarea
* POST `/sessions` → success
* No spinners
* Subtle pending opacity only if request >300ms

---

### 8.4 SessionSuccessPage (`/session/success`)

* Reads `location.state.type`
* Displays success animation + copy
* Holds ~1100–1300ms
* Auto-navigates back to Today

---

### 8.5 Regulate Flow

#### Regulate Landing (`/regulate`)

* Calm explanatory copy
* Single CTA

#### Grounding (`/regulate/ground`)

* Intro delay (~3s)
* 3 breathing cycles
* Orb-based animation
* Automatic redirect on completion

#### Redo (`/regulate/redo`)

* Gentle checkpoint
* Continue or redo
* Infinite redo supported

#### Chat (`/regulate/chat`)

* Free-form reflection
* No AI logic
* Done → Today

---

## 9. Animation & Interaction Rules

Global rules:

* No spinners by default
* Use opacity for loading feedback
* Fade transitions only (no libraries)

Standard timings:

* Navigation fade-out: 250ms
* Page fade-in: automatic
* Button press: subtle scale
* Orb transitions: 4000ms ease-in-out

Animations must:

* Add clarity
* Never distract
* Never surprise

---

## 10. UI Primitives (LOCKED)

* `Page`

  * Safe-area padding
  * Fade-in/out
  * Scroll-to-top

* `Button`

  * Primary / secondary
  * Disabled opacity
  * Press animation

* `Input / Textarea`

  * Consistent borders
  * Calm sizing
  * Focus rings

These primitives must be reused, not bypassed.

---

## 11. UX Principles (V2)

1. Flow isolation over convenience
2. One decision per screen
3. White space > density
4. Emotion before efficiency
5. Silent success
6. No fake intelligence

---

## 12. Known Extensions (Future)

Deferred intentionally:

* Regulate persistence
* AI-assisted reflection
* Insights / trends
* Multi-user support
* Dark mode
* Design system expansion

These are not V2 responsibilities.

---