'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import { Input } from "~/common/components/ui/Input";
import { useAuth } from "../../hook/useAuth";
import { confirmEmailSchema } from "../../schemas/confirmEmail.schema";
import type { ConfirmEmail } from "../../types/confirmEmail.type";
import { WelcomeHeading } from "../ui/WelcomeHeading";
import { ResetPassword } from "./ResetPasswordForm";
import { SocialAuth } from "./SocialAuth";

export function RecoverPassword() {
	const { register, handleSubmit } = useForm<ConfirmEmail>({
		resolver: zodResolver(confirmEmailSchema),
	});
	const { resendCode, confirmEmailBeforeResetPassword, verifyCode } = useAuth();

	const onSubmit = async ({ email }: ConfirmEmail) => {
		await confirmEmailBeforeResetPassword({ email });
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<WelcomeHeading
				title="Lost your password?
Enter your details to recover."
				subtitle="Enter your details to proceed further"
			/>
			{verifyCode ? <ResetPassword /> : (
				<form onSubmit={handleSubmit(onSubmit)} className="flex w-[22.8125rem] flex-col gap-9">
				<Input.Root fieldText="Email">
					<Input.Text {...register('email')} placeholder="Johndoe@example.com" renderIconRight={() => <Icon.Email />}  />
				</Input.Root>
				<div className="flex gap-2 items-center">
					<Button className="w-full" type="submit">Confirm Email</Button>
					<Button className="w-full" color="secondary" onClick={resendCode}>Resend code</Button>
				</div>
			</form>
			)}
			<SocialAuth />
		</div>
	);
}
