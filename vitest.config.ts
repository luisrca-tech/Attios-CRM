import path from 'node:path'; // Use node: protocol for built-in modules
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src') // Adjust this path according to your project structure
		}
	},
	test: {
		setupFiles: ['./vitest.setup.ts']
	}
});
