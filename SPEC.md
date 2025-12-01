# pkkle Backend SPEC (V1)

## 1. Domain Summary
pkkle is a pickleball mental-performance app.

V1 backend responsibilities:
- Store Pre-Play sessions (intention).
- Store Post-Play sessions (emotion + reflection).
- Provide basic GET endpoints for both.
- SOS is frontend-only in V1 (no backend logging).

Out of scope:
- Auth
- Multi-user accounts
- Analytics / streaks / goals
- Progress dashboard
- AI logic
- SOS logging (future)

---

## 2. Data Model (Prisma)

We use separate models for Pre and Post sessions.

    enum Emotion {
      CALM
      ANXIOUS
      FRUSTRATED
      CONFIDENT
      EXCITED
      NEUTRAL
    }

    model PreSession {
      id        Int      @id @default(autoincrement())
      timestamp DateTime @default(now())
      intention String   // required, 1–1500 chars

      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
    }

    model PostSession {
      id         Int      @id @default(autoincrement())
      timestamp  DateTime @default(now())
      emotion    Emotion  // required
      reflection String   // required, 1–5000 chars

      createdAt  DateTime @default(now())
      updatedAt  DateTime @updatedAt
    }

Decisions:
- Timestamp is always server-generated.
- Strings are trimmed.
- Unknown fields → validation error.

---

## 3. API Surface

Base path: /api

### 3.1 POST /api/pre-sessions

Body:

    {
      "intention": "Play free and trust my instincts"
    }

Rules:
- intention: required, trimmed, 1–1500 chars.
- No other fields allowed.

---

### 3.2 GET /api/pre-sessions

Query params:
- limit (default 20, max 100)
- order: desc | asc (default desc)

---

### 3.3 POST /api/post-sessions

Body:

    {
      "emotion": "FRUSTRATED",
      "reflection": "I tightened up on big points but recovered faster this time."
    }

Rules:
- emotion: required enum.
- reflection: required, trimmed, 1–5000 chars.
- No other fields allowed.

---

### 3.4 GET /api/post-sessions

Query params:
- limit (default 20, max 100)
- order: desc | asc (default desc)

---

## 4. Validation Rules

General:
- Reject unknown fields.
- Trim all string fields.

### PreSession
- intention: required, 1–1500 chars.
- No other fields permitted.

### PostSession
- emotion: required enum.
- reflection: required, 1–5000 chars.
- No other fields permitted.

---

## 5. File Structure

    src/
      app.ts
      server.ts

      routes/
        preSessions.routes.ts
        postSessions.routes.ts

      controllers/
        preSessions.controller.ts
        postSessions.controller.ts

      services/
        preSessions.service.ts
        postSessions.service.ts

      validators/
        preSessions.validator.ts
        postSessions.validator.ts

      errors/
        AppError.ts
        ValidationError.ts

      prisma/
        client.ts

      config/
        env.ts

Responsibilities:
- Routes: HTTP wiring only.
- Validators: validate + normalize input.
- Controllers: orchestrate validator → service → response.
- Services: business logic + Prisma.
- Errors: central error types.
- Prisma client: shared instance.

---

## 6. Testing Plan (High Level)

### PreSession

POST:
- Creates valid session.
- Fails on missing/empty/too-long intention.
- Fails on unknown fields.

GET:
- Returns list.
- Respects limit & order.

### PostSession

POST:
- Creates valid session.
- Fails on missing emotion or reflection.
- Fails on invalid enum.
- Fails on unknown fields.

GET:
- Returns list.
- Respects limit & order.
