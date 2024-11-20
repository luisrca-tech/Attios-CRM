import type { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { env } from 'src/env';
import { Webhook } from 'svix';
import {
	handleUserCreated,
	handleUserDeleted,
	handleUserUpdated
} from '~/server/api/routers/user/actions';

export async function POST(req: Request) {
	const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400
		});
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);

	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400
		});
	}

	try {
		if (!evt.data.id) return new Response('No id provided');
		switch (evt.type) {
			case 'user.deleted':
				await handleUserDeleted(evt);
				break;
			case 'user.created':
				await handleUserCreated(evt);
				break;
			case 'user.updated':
				await handleUserUpdated(evt);
				break;
			default:
				console.error('Unhandled event type');
		}
	} catch (error) {
		console.error('Error handling event:', error);
		return Response.json(
			{ success: false, eventType: evt.type },
			{ status: 500 }
		);
	}

	return new Response('Creation of user is successful', { status: 200 });
}
