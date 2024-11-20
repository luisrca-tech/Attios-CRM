import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		viewport: {
			viewports: {
				mobile2: {
					name: 'Mobile',
					styles: {
						width: '24.375rem',
						height: '37.5rem'
					}
				}
			},
			defaultViewport: 'mobile2'
		}
	}
};

export default preview;
