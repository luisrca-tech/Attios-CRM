import type { Meta, StoryObj } from '@storybook/react';
import { InputRoot } from '../common/components/ui/Input/InputRoot';
import InputText from '../common/components/ui/Input/InputText';
import InputPassword from '../common/components/ui/Input/InputPassword';
import { Icon } from '~/common/components/ui/Icons/_index';
import { Input } from '~/common/components/ui/Input';

const meta = {
	title: 'UI/Input',
	parameters: {
		layout: 'centered'
	}
} satisfies Meta;

export default meta;

export const DefaultInputRoot: StoryObj = {
	render: () => (
		<InputRoot fieldText="Label Text">
			<InputText placeholder="Type something..." />
		</InputRoot>
	)
};

export const ErrorInputRoot: StoryObj = {
	render: () => (
		<InputRoot fieldText="Label Text" error>
			<InputText placeholder="Error state..." />
		</InputRoot>
	)
};

export const ValidInputRoot: StoryObj = {
	render: () => (
		<InputRoot fieldText="Label Text" isValid>
			<InputText placeholder="Valid state..." />
		</InputRoot>
	)
};

export const InputTextWithRightIcon: StoryObj = {
	render: () => (
		<InputRoot fieldText="Label Text">
			<InputText
				placeholder="With right icon..."
				renderIconRight={() => <Icon.Search className="h-4 w-4" />}
			/>
		</InputRoot>
	)
};

export const InputPasswordInRoot: StoryObj = {
	render: () => (
		<InputRoot fieldText="Password">
			<InputPassword placeholder="Type your password..." />
		</InputRoot>
	)
};

export const SelectInputInRoot: StoryObj = {
	render: () => (
		<InputRoot className="w-48" fieldText="Select Option">
			<Input.SelectInput
				options={['Option 1', 'Option 2', 'Option 3']}
				text="Select an option"
				onSearch={() => {}}
				onChange={() => {}}
				onAdd={() => {}}
			/>
		</InputRoot>
	)
};

export const SelectInputWithOptionIcons: StoryObj = {
	render: () => (
		<InputRoot className="w-48" fieldText="Select Option">
			<Input.SelectInput
				options={['Option 1', 'Option 2', 'Option 3']}
				text="Select with icons"
				onSearch={() => {}}
				onChange={() => {}}
				onAdd={() => {}}
			/>
		</InputRoot>
	)
};
