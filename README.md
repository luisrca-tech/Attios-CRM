## Attios CRM – Local Setup and UploadThing Repro Guide

Attios is a CRM where users can manage products, services, and leads. The app is multi-tenant (workspace/subdomain-based) and uses UploadThing for image uploads.

- **Frontend/Runtime**: Next.js 14, React 18, Tailwind
- **Auth**: Clerk
- **API**: tRPC 11
- **DB/ORM**: Postgres + Drizzle
- **Uploads**: UploadThing v7 (`uploadthing`, `@uploadthing/react`)

### 1) Prerequisites
- Node 18+ (tested with Node 20)
- Postgres database and `DATABASE_URL`
- UploadThing account and token
- Clerk keys

### 2) Environment
Create `.env.local` at the project root:

```bash
# Database
DATABASE_URL=postgres://user:pass@localhost:5432/attios

# Clerk (use your test instance keys)
CLERK_SECRET_KEY=sk_test_xxx
CLERK_FRONTEND_API=your-instance.clerk.accounts.dev
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx

# UploadThing
UPLOADTHING_TOKEN=ut_xxx
# For dev, force callbacks to localhost to avoid custom-domain issues
UPLOADTHING_URL=http://localhost:3000

# Optional
WEBHOOK_SECRET=dev
CC_TEST_REPORTER_ID=dev
NEXT_PUBLIC_UPLOADTHING_APP_ID=dev
```

Note: `UPLOADTHING_URL` must not have a trailing slash.

### 3) Install and DB setup
```bash
bun install    # or npm install / yarn

# Drizzle (adjust as needed for your DB)
bun run db:generate
bun run db:push
# Optional seed
bun run db:seed
```

### 4) Run the app
```bash
bun run dev    # or npm run dev / yarn dev
```
- Local: `http://localhost:3000`

### 5) Multi-tenant (workspace/subdomain) behavior
- Workspace routing/redirects live in `src/app/(system)/layout.tsx`.
- In development, redirects to the workspace subdomain are relaxed to make local testing easier.
- In production, users are redirected to their workspace subdomain.

If you want to test with a custom local domain (e.g. `naranja.localhost`):
1. Add to `/etc/hosts` (inside the runtime running Next.js):
   ```
   127.0.0.1 naranja.localhost
   ```
2. Visit `http://naranja.localhost:3000` in your browser.

### 6) UploadThing notes
- Route is exposed at `GET/POST /api/uploadthing` via `createRouteHandler`.
- Client uses `generateReactHelpers` with a same-origin URL:
  - `url: "/api/uploadthing"` (see `src/utils/storage.ts`)
- Middleware allows `/api/uploadthing` through without auth (see `src/middleware.ts`).
- Use `file.ufsUrl` instead of deprecated `file.url`.

### 7) Reproducing the custom local domain timeout (optional)
This helps reproduce an UploadThing callback timeout seen only on custom local domains.

1. Start at `http://localhost:3000`
2. Sign up at `/sign-up` and create a team/workspace
3. Navigate to “New Product” and select an image
4. Submit
   - Expected (localhost):
     - `POST /api/uploadthing?actionType=upload&slug=imageUploader` → 200
     - Callback `POST /api/uploadthing?slug=imageUploader` → 200
     - tRPC mutations run and navigation succeeds
5. Now open `http://naranja.localhost:3000` and repeat the upload
   - On some setups the callback to `/api/uploadthing` does not complete on custom local domains, and the client upload hangs until timeout

Workarounds for dev:
- Keep browsing at the custom domain if you like, but set `UPLOADTHING_URL=http://localhost:3000` so UploadThing callbacks hit localhost
- Ensure `/api/uploadthing` is public in middleware (already configured)

### 8) Common scripts
```bash
bun run dev               # Start dev server
bun run build             # Build
bun run start             # Start production server
bun run db:generate       # Drizzle generate
bun run db:push           # Apply schema
bun run db:seed           # Seed data
```

### 9) Troubleshooting
- Upload hangs ~60s in dev:
  - Verify `UPLOADTHING_URL=http://localhost:3000`
  - Confirm `POST /api/uploadthing?slug=imageUploader` callback returns 200
  - Disable any redirects around `/api/uploadthing` in dev (middleware already allows it)
- Deprecation warnings for `file.url`: switch to `file.ufsUrl` everywhere

---
This README focuses on getting contributors set up quickly and on reproducing the UploadThing custom-domain behavior we’re investigating.
