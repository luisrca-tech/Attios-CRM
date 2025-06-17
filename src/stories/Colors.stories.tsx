import type { Meta, StoryObj } from '@storybook/react';

interface ColorSwatchProps {
	colorName: string;
	colorVar: string;
}

const ColorSwatch = ({ colorName, colorVar }: ColorSwatchProps) => (
	<div className="flex flex-col gap-2">
		<div
			className="h-24 w-24 rounded-lg shadow-md"
			style={{ backgroundColor: `rgb(var(--color-${colorVar}))` }}
		/>
		<div className="text-sm">
			<p className="font-medium">{colorName}</p>
			<p className="text-gray-600">var(--color-{colorVar})</p>
		</div>
	</div>
);

const ColorPalette = () => {
	return (
		<div className="p-6">
			<h2 className="mb-6 font-bold text-2xl">Color Palette</h2>

			<div className="space-y-8">
				<section>
					<h3 className="mb-4 font-semibold text-xl">Base Colors</h3>
					<div className="flex gap-6">
						<ColorSwatch colorName="Black" colorVar="black" />
						<ColorSwatch colorName="White 100" colorVar="white-100" />
						<ColorSwatch colorName="White 200" colorVar="white-200" />
						<ColorSwatch colorName="White 300" colorVar="white-300" />
						<ColorSwatch colorName="White 400" colorVar="white-400" />
					</div>
				</section>

				<section>
					<h3 className="mb-4 font-semibold text-xl">Primary Colors</h3>
					<div className="flex gap-6">
						<ColorSwatch colorName="Primary 100" colorVar="primary-100" />
						<ColorSwatch colorName="Primary 200" colorVar="primary-200" />
					</div>
				</section>

				<section>
					<h3 className="mb-4 font-semibold text-xl">Secondary Colors</h3>
					<div className="flex gap-6">
						<ColorSwatch colorName="Secondary 100" colorVar="secondary-100" />
						<ColorSwatch colorName="Secondary 200" colorVar="secondary-200" />
						<ColorSwatch colorName="Secondary 300" colorVar="secondary-300" />
						<ColorSwatch colorName="Secondary 400" colorVar="secondary-400" />
						<ColorSwatch colorName="Secondary 500" colorVar="secondary-500" />
					</div>
				</section>
			</div>
		</div>
	);
};

const meta = {
	title: 'Design System/Colors',
	component: ColorPalette,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
