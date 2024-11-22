import { seedProducts } from './products';

async function seed() {
	try {
		await seedProducts();

		console.log('✅ Database seeded successfully');
	} catch (e) {
		console.error('❌ Error seeding database:', e);
		process.exit(1);
	} finally {
		process.exit(0);
	}
}

seed();
