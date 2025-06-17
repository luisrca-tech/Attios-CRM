'use client';

import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import { useUploadThingImage } from '~/common/hooks/useUploadThingImage';

const userImageKeys = {
	1: 'oOhzVgQXSdmBuMO3xUlUg5SBZb8KH1zpY7wVjPr3mQ9CEWof',
	2: 'oOhzVgQXSdmBVt2PfJFhLn0qGZd5QTxfXrgBUbKwHcM9e4ak',
	3: 'oOhzVgQXSdmBN8XbiBCyLR6ZbaYK2E4BjS1HGFOIh8M7x3qN',
	4: 'oOhzVgQXSdmBVNCNWzFhLn0qGZd5QTxfXrgBUbKwHcM9e4ak'
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
