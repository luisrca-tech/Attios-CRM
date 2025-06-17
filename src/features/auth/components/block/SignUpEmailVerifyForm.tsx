'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '~/common/components/ui/Button';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '~/common/components/ui/input-otp';
import { useAuth } from '../../hook/useAuth';
import type { VerifyCode } from '../../types/signUpCodeVerify.type';
import { verifyCodeSchema } from '../../schemas/verifyCode.schema';

export function SignUpEmailVerify() {
	const { setValue, handleSubmit } = useForm<VerifyCode>({
		resolver: zodResolver(verifyCodeSchema),
		mode: 'onChange'
	});
	const { verifyEmail, resendCode, isLoading } = useAuth();

	async function handleConfirmCode({ code }: VerifyCode) {
		await verifyEmail({ code });
	}

	return (
		<form
			onSubmit={handleSubmit(handleConfirmCode)}
			className="flex w-[22.8125rem] flex-col gap-4"
		>
			<div className="flex flex-col items-center justify-center gap-2 pb-2">
				<InputOTP
					maxLength={6}
					onChange={(value) => setValue('code', value)}
					aria-label="Enter the code we sent to your email"
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
				<span className="font-medium text-primary-200 text-sm">
					Enter the code we sent to your email
				</span>
			</div>
			<div className="mt-3 flex gap-2">
				<Button type="submit" className="w-full" isLoading={isLoading}>
					Confirm
				</Button>
				<Button className="w-full" color="secondary" onClick={resendCode}>
					Resend code
				</Button>
			</div>
		</form>
	);
}
