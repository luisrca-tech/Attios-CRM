import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.625rem',
			'3xl': '2rem'
		}
	},
	plugins: []
} satisfies Config;
