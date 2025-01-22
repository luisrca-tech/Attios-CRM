import { forwardRef, useState } from 'react';
import { Icon } from '~/common/components/ui/Icons/_index';
import InputText from './InputText';

interface InputPasswordProps {
	className?: string;
	placeholder?: string;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
	({ className, placeholder, ...rest }, ref) => {
		const [showPassword, setShowPassword] = useState(false);

		const togglePasswordVisibility = () => {
			setShowPassword((prev) => !prev);
		};

		return (
			<div>
				<div className="relative">
					<InputText
						ref={ref}
						type={showPassword ? 'text' : 'password'}
						placeholder={placeholder}
						className={className}
						{...rest}
					/>
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className="absolute top-0 right-0 bg-transparent"
					>
						{showPassword ? (
							<Icon.Padlock.Open className="mt-2 h-[1.125rem] w-[1.125rem]" />
						) : (
							<Icon.Padlock.Close className="mt-2 h-[1.125rem] w-[1.125rem]" />
						)}
					</button>
				</div>
			</div>
		);
	}
);

export default InputPassword;
