import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '~/common/components/ui/Button';

const meta = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'outlined']
		},
		color: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'tertiary',
				'quaternary',
				'quinternary',
				'senary'
			]
		},
		isLoading: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: 'Button',
		variant: 'filled',
		color: 'primary'
	}
};

export const Loading: Story = {
	args: {
		children: 'Loading Button',
		isLoading: true
	}
};

export const Disabled: Story = {
	args: {
		children: 'Disabled Button',
		disabled: true
	}
};

export const Outlined: Story = {
	args: {
		children: 'Outlined Button',
		variant: 'outlined',
		color: 'primary'
	}
};

export const Colors: Story = {
	args: {
		color: 'primary'
	},

	render: () => (
		<div className="flex flex-wrap gap-4">
			{[
				'primary',
				'secondary',
				'tertiary',
				'quaternary',
				'quinternary',
				'senary'
			].map((color) => (
				<Button key={color} color={color as any}>
					{color.charAt(0).toUpperCase() + color.slice(1)}
				</Button>
			))}
		</div>
	)
};

export const Variants: Story = {
	render: () => (
		<div className="flex gap-4">
			<Button variant="filled">Filled Button</Button>
			<Button variant="outlined">Outlined Button</Button>
		</div>
	)
};
