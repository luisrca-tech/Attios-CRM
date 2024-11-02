import { clerkSetup } from '@clerk/testing/playwright'

async function globalSetup() {
  await clerkSetup({
    frontendApiUrl: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  })
}

export default globalSetup;