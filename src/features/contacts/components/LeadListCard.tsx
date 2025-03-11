import type { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';
import type { leads } from '~/server/db/schema';
import { Button } from '../../../common/components/ui/Button';
import { Icon } from '../../../common/components/ui/Icons/_index';
import { UserStatusLogged } from '~/common/components/ui/UserStatusLogged';
import type { UserStatus } from '~/common/types/userStatus';

type Lead = InferSelectModel<typeof leads>;

export function LeadListCard({
	firstName,
	lastName,
	status,
	image,
	role
}: Lead) {
	return (
		<div className="flex w-full items-center justify-between rounded-xl bg-white-100 px-[0.875rem] py-[0.6875rem] md:hidden lg:hidden">
			<div className="flex gap-4">
				<div className="relative h-[3.25rem] w-[3.25rem]">
					<Image
						className="h-[3.25rem] w-[3.25rem] rounded-md object-cover"
						src={image ?? ''}
						alt={`${firstName} ${lastName}`}
						width={52}
						height={52}
					/>
					<UserStatusLogged userStatus={status as UserStatus} />
				</div>
				<div className="flex flex-col">
					<strong className="text-base leading-6">
						{firstName} {lastName}
					</strong>
					<span className="font-normal text-primary-200 text-sm leading-5">
						{role}
					</span>
				</div>
			</div>
			<Button color="septenary" className="h-9 w-9 border border-white-200">
				<Icon.MoreActions />
			</Button>
		</div>
	);
}
