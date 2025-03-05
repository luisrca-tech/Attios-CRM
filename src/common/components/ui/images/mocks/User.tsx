'use client';

import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import { useUploadThingImage } from '~/common/hooks/useUploadThingImage';

const userImageKeys = {
	1: 'oOhzVgQXSdmBdfqz8csTIFvtcaLjoZq0bH3DMzdrOyNERJg4',
	2: 'oOhzVgQXSdmBar0zusi2PlzsqbJwL7MgFrSQZ5OHK40yfEeW',
	3: 'oOhzVgQXSdmBDpZoO9VK7VlSR4CNs5UwZa8T6vo0BfgM1GJW',
	4: 'oOhzVgQXSdmBE35DC6ptzn6H9LYyifo5maQcOkFSN3VrdWeG'
} as const;

type UserNumber = keyof typeof userImageKeys;

interface UserProps extends IconProps {
	userNumber: UserNumber;
}

export function User({ className, userNumber }: UserProps) {
	const { imageUrl, isLoading } = useUploadThingImage(
		userImageKeys[userNumber]
	);

	if (isLoading || !imageUrl) {
		return (
			<div
				className={cn(
					'h-[2.375rem] w-[2.375rem] animate-pulse rounded-full bg-gray-200',
					className
				)}
			/>
		);
	}

	return (
		<Image
			className={cn('h-[2.375rem] w-[2.375rem]', className)}
			src={imageUrl}
			alt={`User ${userNumber}`}
			width={38}
			height={38}
		/>
	);
}
