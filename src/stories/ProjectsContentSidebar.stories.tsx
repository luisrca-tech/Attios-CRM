import { ClerkProvider } from '@clerk/nextjs';
import type { Meta, StoryObj } from '@storybook/react';
import { ContentSidebar } from '~/features/ContentSidebar';

const meta = {
	title: 'Content Sidebar/Project',
	component: ContentSidebar.Page.Projects,
	decorators: [
		(Story) => (
			<ClerkProvider
				publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''}
			>
				<div className="flex">
					<Story />
				</div>
			</ClerkProvider>
		)
	]
} satisfies Meta<typeof ContentSidebar.Page.Projects>;

export default meta;
type Story = StoryObj<typeof ContentSidebar.Page.Projects>;

export const Default: Story = {};
