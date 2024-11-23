import Image from 'next/image';
import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons';
import { ChatPreviewItems } from '~/features/mocks/ChatPreviewItems';
import { UserStatusLogged } from '~/common/components/ui/UserStatusLogged';
import { Badge } from '~/common/components/ui/Badge';
import { ContentSidebar } from '..';

export function ProjectsWithSidebar() {
	return (
		<ContentSidebar.Root>
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1">
						<strong className="text-black text-sm leading-4">Messages</strong>
						<Badge variant="rounded" color="green">
							{ChatPreviewItems.length}
						</Badge>
					</div>
					<Button
						className="border-none p-0 hover:bg-transparent hover:text-primary-100/60"
						variant="outlined"
						color="primary"
					>
						View all
					</Button>
				</div>
				{ChatPreviewItems.map((chat) => (
					<ContentSidebar.Card key={chat.id}>
						<div className="flex items-center justify-between gap-4">
							<div className="relative">
								<Image
									src={chat.userImage}
									alt={chat.userName}
									width={38}
									height={38}
									className="h-[2.375rem] w-[2.375rem] self-start"
								/>
								<UserStatusLogged
									className="-right-1 bottom-0] absolute"
									userStatus={`${chat.userStatus}`}
								/>
							</div>
							<div className="flex flex-col">
								<strong className="text-black text-sm leading-5">
									{chat.userName}
								</strong>
								<p className="font-normal text-primary-200 text-xs leading-[1.125rem]">
									{chat.userDescription}
								</p>
							</div>
							<span className="self-start font-normal text-primary-200 text-xs leading-[1.125rem]">
								{chat.messageTimestamp}
							</span>
						</div>
					</ContentSidebar.Card>
				))}
			</div>
			<ContentSidebar.Graph.Dinamyc>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-2">
						<strong className="text-base text-black leading-6">
							Progress History
						</strong>
						<span className="font-normal text-primary-200 text-xs leading-5">
							Week to week performance
						</span>
					</div>
					<Button
						className="h-[2.625rem] w-[2.625rem] bg-primary-200/10 p-0 hover:bg-primary-200/50"
						color="secondary"
					>
						<Icon.Graph.Statistics className="h-[1.125rem] w-[1.125rem]" />
					</Button>
				</div>
				<div className="mt-6 flex items-end justify-between gap-2">
					{Array.from({ length: 8 }).map((_, index) => (
						<div className="flex items-center gap-2" key={`week-${index + 1}`}>
							<div
								className="w-[0.1875rem] rounded-t-sm bg-secondary-400"
								style={{
									height: `${(Math.random() * (5 - 1.875) + 1.875).toFixed(3)}rem`
								}}
							/>
							<div
								className="w-[0.1875rem] rounded-t-sm bg-secondary-200"
								style={{
									height: `${(Math.random() * (6.25 - 2.5) + 2.5).toFixed(3)}rem`
								}}
							/>
						</div>
					))}
				</div>
			</ContentSidebar.Graph.Dinamyc>
		</ContentSidebar.Root>
	);
}
