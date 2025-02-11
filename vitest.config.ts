import path from 'node:path'; // Use node: protocol for built-in modules
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src') // Adjust this path according to your project structure
		}
	},
	test: {
		setupFiles: ['./vitest.setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			exclude: [
				'node_modules/**',
				'src/stories/**',
				'**/*.d.ts',
				'**/*.test.{js,jsx,ts,tsx}',
				'**/*.spec.{js,jsx,ts,tsx}',
				'**/snapshots/**',
				'**/coverage/**'
			]
		},
		env: {
			NODE_ENV: 'test'
		}
	}
});
