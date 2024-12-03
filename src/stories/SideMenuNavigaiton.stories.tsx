import type { Meta, StoryObj } from '@storybook/react';
import { ClerkProvider } from '@clerk/nextjs';
import { SideMenu } from '~/common/components/ui/SideMenuNavigation';

const meta = {
  title: 'Navigation/SideMenu',
  component: SideMenu,
  decorators: [
    (Story) => (
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''}>
        <div className='flex min-h-screen'>
          <Story />
        </div>
      </ClerkProvider>
    ),
  ],
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {};