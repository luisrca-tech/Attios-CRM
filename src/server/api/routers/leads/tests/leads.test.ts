import { vi, describe, it, expect, beforeEach } from 'vitest';
import mockDb from '~/server/api/mocks/db.mock';
import { appRouter } from '~/server/api/root';
import { createCallerFactory, createTRPCContext } from '~/server/api/trpc';
import { faker } from '@faker-js/faker';

vi.mock('~/server/db', () => ({
	db: mockDb
}));

vi.mock('@clerk/nextjs/server', () => ({
	auth: () => Promise.resolve({ userId: 'test-user-id' })
}));

describe('Leads', () => {
	const createCaller = createCallerFactory(appRouter);
	let caller: ReturnType<typeof createCaller>;

	const mockLeads = [
		{
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			phone: '+1234567890',
			role: 'Customer',
			image: faker.image.avatar(),
			convertedToCustomer: true,
			convertedToCustomerAt: new Date('2024-01-01'),
			status: 'online',
			createdAt: new Date('2024-01-01'),
			updatedAt: new Date('2024-01-01')
		},
		{
			id: 2,
			firstName: 'Jane',
			lastName: 'Smith',
			email: 'jane.smith@example.com',
			phone: '+0987654321',
			role: 'Prospect',
			image: faker.image.avatar(),
			convertedToCustomer: false,
			convertedToCustomerAt: null,
			status: 'offline',
			createdAt: new Date('2024-01-02'),
			updatedAt: new Date('2024-01-02')
		}
	];

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
				updatedAt: new Date('2024-01-03')
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

	it('should return total pages for leads', async () => {
		mockDb.select.mockReturnValue({
			from: () => Promise.resolve([{ count: 30 }])
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any);
		const totalPages = await caller.leads.getTotalPages({
			pageSize: 10
		});

		expect(totalPages).toBe(3); // 30 items with pageSize 10 should give 3 pages
	});
});
