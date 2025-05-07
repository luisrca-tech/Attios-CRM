import { faker } from '@faker-js/faker';

export const mockLeads = [
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
		updatedAt: new Date('2024-01-01'),
		tagId: 1
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
		updatedAt: new Date('2024-01-02'),
		tagId: 2
	}
];
