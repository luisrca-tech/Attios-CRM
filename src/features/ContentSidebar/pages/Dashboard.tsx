'use client';

import Image from 'next/image';
import Logo from '/public/favicon.svg';

import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons/_index';
import { ChatPreviewItems } from '~/features/ContentSidebar/mocks/ChatPreviewItems';
import { ContentSidebar } from '..';
import { useGraphWaveImages } from '../mocks/GraphWaveImages';

export function DashboardWithSidebar() {
	const { blueWaveGraphForeground, whiteWaveGraphBackground } =
		useGraphWaveImages();

	return (
		<ContentSidebar.Root hasHeader={false}>
			<div className="flex flex-col gap-11">
				<div className="flex flex-col gap-3 pt-[5.25rem]">
					<Image src={Logo} alt="Attios logo" width={98} height={98} />
					<div>
						<h2 className="font-light text-[1.375rem] text-black/80 leading-[1.625rem]">
							Welcome,
						</h2>
						<strong className="text-2xl leading-9">Attios CRM</strong>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<span className="font-bold text-base text-black leading-6">
						Messages
					</span>
					{ChatPreviewItems.map((chat) => (
						<ContentSidebar.Card key={chat.id}>
							<div className="flex items-center justify-between gap-4">
								{chat.UserImage}
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
			</div>
			<ContentSidebar.Graph.Dinamyc className="relative mt-10 mb-6 min-h-[12rem] py-0 pt-[1.375rem]">
				<div className="flex items-center justify-between pb-7">
					<div className="flex flex-col">
						<strong className="text-base text-black leading-6">
							Conversion history
						</strong>
						<span className="font-normal text-primary-200 text-xs leading-5">
							Week to week performance
						</span>
					</div>
					<Button
						className="h-[2.625rem] w-[2.625rem] bg-primary-200/10 p-0 hover:bg-primary-200/50"
						color="secondary"
					>
						<Icon.Graph.Pizza className="h-[1.125rem] w-[1.125rem]" />
					</Button>
				</div>
				<div className="absolute right-0 bottom-0">
					<div className="h-full w-full">
						<Image
							src={whiteWaveGraphBackground.imageUrl ?? ''}
							alt="White background wave graph"
							className="-top-4 absolute h-full w-full"
							height={93}
							width={330}
						/>
					</div>
					<div className="h-full w-full">
						<Image
							src={blueWaveGraphForeground.imageUrl ?? ''}
							alt="Blue foreground wave graph"
							className="h-full w-full object-cover"
							height={93}
							width={330}
						/>
					</div>
				</div>
			</ContentSidebar.Graph.Dinamyc>
		</ContentSidebar.Root>
	);
}
