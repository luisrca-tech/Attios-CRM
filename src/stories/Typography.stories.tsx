import type { Meta, StoryObj } from '@storybook/react';

interface FontSizeDisplayProps {
	name: string;
	size: string;
	sample: string;
}

const FontSizeDisplay = ({ name, size, sample }: FontSizeDisplayProps) => (
	<div className="flex items-center gap-8 border-gray-200 border-b py-4">
		<div className="w-24">
			<p className="font-medium">{name}</p>
			<p className="text-gray-600 text-sm">{size}</p>
		</div>
		<p className={`${name} font-medium`}>{sample}</p>
	</div>
);

const TypographyScale = () => {
	return (
		<div className="max-w-3xl p-6">
			<h2 className="mb-6 font-bold text-2xl">Typography Scale</h2>

			<div className="space-y-2">
				<FontSizeDisplay
					name="text-xs"
					size="0.75rem"
					sample="Every small step forward is progress worth celebrating."
				/>
				<FontSizeDisplay
					name="text-sm"
					size="0.875rem"
					sample="Your potential is limited only by your imagination."
				/>
				<FontSizeDisplay
					name="text-base"
					size="1rem"
					sample="Success is not final, failure is not fatal: it's the courage to continue that counts."
				/>
				<FontSizeDisplay
					name="text-lg"
					size="1.125rem"
					sample="The future belongs to those who believe in the beauty of their dreams."
				/>
				<FontSizeDisplay
					name="text-xl"
					size="1.25rem"
					sample="Be the change you wish to see in the world."
				/>
				<FontSizeDisplay
					name="text-2xl"
					size="1.625rem"
					sample="Make today amazing!"
				/>
				<FontSizeDisplay name="text-3xl" size="2rem" sample="Dream big!" />
			</div>
		</div>
	);
};

const meta = {
	title: 'Design System/Typography',
	component: TypographyScale,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<typeof TypographyScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
