import { vi, describe, it, expect, beforeEach } from 'vitest';
import mockDb from '~/server/api/mocks/db.mock';
import { appRouter } from '~/server/api/root';
import { createCallerFactory, createTRPCContext } from '~/server/api/trpc';
import { faker } from '@faker-js/faker';
import { mockLeads } from './constants/mockLeads';

vi.mock('~/server/db', () => ({
	db: mockDb
}));

vi.mock('@clerk/nextjs/server', () => ({
	auth: () => Promise.resolve({ userId: 'test-user-id' })
}));

describe('Leads', () => {
	const createCaller = createCallerFactory(appRouter);
	let caller: ReturnType<typeof createCaller>;

	beforeEach(async () => {
		const ctx = await createTRPCContext({
			headers: new Headers()
		});

		caller = createCaller(ctx);
	});

	it('should return all leads', async () => {
		mockDb.query.leads.findMany.mockResolvedValue(mockLeads);
		const leads = await caller.leads.getLeadsPaginated({
			page: 1,
			pageSize: 10
		});

		expect(leads).toBeDefined();
		expect(leads).toHaveLength(2);
		expect(leads[0]).toEqual(
			expect.objectContaining({
				id: 1,
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				phone: '+1234567890',
				role: 'Customer',
				convertedToCustomer: true,
				status: 'online'
			})
		);
	});

	it('should return leads with infinite scroll', async () => {
		mockDb.query.leads.findMany.mockResolvedValue(mockLeads);
		const result = await caller.leads.getControlledLeadsInfinite({
			limit: 2,
			cursor: 0
		});

		expect(result).toBeDefined();
		expect(result.items).toHaveLength(2);
		expect(result.nextCursor).toBeUndefined();
		expect(result.items[0]).toEqual(
			expect.objectContaining({
				id: 1,
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				phone: '+1234567890',
				role: 'Customer',
				convertedToCustomer: true,
				status: 'online'
			})
		);
	});

	it('should return next cursor when there are more leads', async () => {
		const extendedMockLeads = [
			...mockLeads,
			{
				id: 3,
				firstName: 'Bob',
				lastName: 'Johnson',
				email: 'bob.johnson@example.com',
				phone: '+1122334455',
				role: 'Partner',
				image: faker.image.avatar(),
				convertedToCustomer: false,
				convertedToCustomerAt: null,
				status: 'away',
				createdAt: new Date('2024-01-03'),
				updatedAt: new Date('2024-01-03'),
				tagId: 3
			}
		];

		mockDb.query.leads.findMany.mockResolvedValue(extendedMockLeads);
		const result = await caller.leads.getControlledLeadsInfinite({
			limit: 2,
			cursor: 0
		});

		expect(result).toBeDefined();
		expect(result.items).toHaveLength(2);
		expect(result.nextCursor).toBe(2);
	});

	it('should create a lead', async () => {
		const mockTag = {
			id: 1,
			name: 'Customer',
			createdAt: new Date(),
			updatedAt: new Date()
		};
		const mockCreatedLead = { id: 3 };

		mockDb.query.tags.findFirst.mockResolvedValue(mockTag);
		mockDb.transaction.mockImplementation(async (callback) => {
			const tx = {
				query: mockDb.query,
				insert: () => ({
					values: () => ({
						returning: () => Promise.resolve([mockCreatedLead])
					})
				})
			};
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			return callback(tx as any);
		});

		const result = await caller.leads.create({
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			phone: '+1234567890',
			tag: 'Customer',
			file: faker.image.avatar(),
			leadImages: [
				{
					url: faker.image.avatar(),
					key: faker.string.uuid()
				}
			]
		});

		expect(result).toBeDefined();
		expect(result).toHaveLength(1);
		expect(result[0]?.id).toBe(3);
		expect(mockDb.query.tags.findFirst).toHaveBeenCalled();
		expect(mockDb.transaction).toHaveBeenCalled();
	});
});
