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
import type { RecoverPassword } from '../../types/recoverPasssword.type';
import { recoverPasswordSchema } from '../../schemas/recoverPassword.schema';
import { Input } from '~/common/components/ui/Input';

export function ResetPassword() {
	const { setValue, handleSubmit, register } = useForm<RecoverPassword>({
		resolver: zodResolver(recoverPasswordSchema),
		mode: 'onChange'
	});
	const { resendCode, handleRecoverPassword } = useAuth();

	async function onSubmit({ password, code }: RecoverPassword) {
		await handleRecoverPassword({ password, code });
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-[22.8125rem] flex-col gap-9"
		>
			<div className="flex flex-col gap-2">
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
				<Input.Root fieldText="New Password">
					<Input.Password placeholder="********" {...register('password')} />
				</Input.Root>
			</div>
			<div className='flex items-center gap-2'>
				<Button className="w-full" type="submit">
					Recover password
				</Button>
				<Button className="w-full" color="secondary" onClick={resendCode}>
					Resend code
				</Button>
			</div>
		</form>
	);
}
