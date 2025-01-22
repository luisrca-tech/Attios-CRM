import type { Meta, StoryObj } from '@storybook/react';
import { BottomMenu } from '~/common/components/ui/BottomMenuNavigation';
import { ClerkProvider } from '@clerk/nextjs';
import { env } from '~/env';

const meta = {
	title: 'Navigation/BottomMenu',
	component: BottomMenu,
	decorators: [
		(Story) => (
			<ClerkProvider
				publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''}
			>
				<div className="h-screen bg-white-100">
					<div className="p-4">
						<h1 className="font-bold text-2xl">
							Please, place the screen on mobile to see the bottom menu
						</h1>
					</div>
					<Story />
				</div>
			</ClerkProvider>
		)
	]
} satisfies Meta<typeof BottomMenu>;

export default meta;
type Story = StoryObj<typeof BottomMenu>;

export const Default: Story = {};
