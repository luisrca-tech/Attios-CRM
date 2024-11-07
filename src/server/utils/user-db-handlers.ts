import type { UserJSON, WebhookEvent } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';

export async function handleUserDeleted(evt: WebhookEvent) {
  if (!evt.data.id) throw new Error('No user id provided');
  await db.delete(users).where(eq(users.id, evt.data.id));
}

export async function handleUserCreated(evt: WebhookEvent) {
  const userData = evt.data as UserJSON;
  if (!userData.id) throw new Error('No user id provided');
  
  await db.insert(users).values({
    id: userData.id,
    fullName: `${userData.first_name ?? ''} ${userData.last_name ?? ''}`.trim(),
    email: userData.email_addresses[0]?.email_address ?? ''
  });
}

export async function handleUserUpdated(evt: WebhookEvent) {
  const userData = evt.data as UserJSON;
  if (!userData.id) throw new Error('No user id provided');

  await db
    .update(users)
    .set({ 
      email: userData.email_addresses[0]?.email_address ?? '' 
    })
    .where(eq(users.id, userData.id));
} 