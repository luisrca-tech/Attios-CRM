import { ClerkProvider } from '@clerk/nextjs';
import type { Meta, StoryObj } from '@storybook/react';
import { ContentSidebar } from '~/features/ContentSidebar';

const meta = {
  title: 'Content Sidebar/Dashboard',
  component: ContentSidebar.Page.Dashboard,
  decorators: [
    (Story) => (
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''}>
          <Story />
      </ClerkProvider>
    ),
  ],
} satisfies Meta<typeof ContentSidebar.Page.Dashboard>;

export default meta;
type Story = StoryObj<typeof ContentSidebar.Page.Dashboard>;

export const Default: Story = {};