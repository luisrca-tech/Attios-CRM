import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			screens: {
				'2xl': '87.5rem',
				'3xl': '100rem'
			}
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.625rem',
			'3xl': '2rem'
		},
		colors: {
			black: 'rgb(var(--color-black) / <alpha-value>)',
			transparent: 'transparent',
			white: {
				'100': 'rgb(var(--color-white-100) / <alpha-value>)',
				'200': 'rgb(var(--color-white-200) / <alpha-value>)',
				'300': 'rgb(var(--color-white-300) / <alpha-value>)',
				'400': 'rgb(var(--color-white-400) / <alpha-value>)'
			},
			primary: {
				'100': 'rgb(var(--color-primary-100) / <alpha-value>)',
				'200': 'rgb(var(--color-primary-200) / <alpha-value>)'
			},
			secondary: {
				'100': 'rgb(var(--color-secondary-100) / <alpha-value>)',
				'200': 'rgb(var(--color-secondary-200) / <alpha-value>)',
				'300': 'rgb(var(--color-secondary-300) / <alpha-value>)',
				'400': 'rgb(var(--color-secondary-400) / <alpha-value>)',
				'500': 'rgb(var(--color-secondary-500) / <alpha-value>)'
			},
			outline: {
				'100': 'rgb(var(--color-outline-100) / <alpha-value>)'
			}
		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' }
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			spin: 'spin 1s linear infinite'
		}
	},
	plugins: [require('tailwindcss-animate')]
} satisfies Config;
