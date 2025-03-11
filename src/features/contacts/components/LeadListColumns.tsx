import type { ColumnDef } from '@tanstack/react-table';
import type { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';
import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons/_index';
import type { leads } from '~/server/db/schema';
import { OrdenationButton } from '~/common/components/block/OrdenationButton';
import { Skeleton } from '~/common/components/ui/skeleton';
import { UserStatusLogged } from '~/common/components/ui/UserStatusLogged';
import type { UserStatus } from '~/common/types/userStatus';

export type ColumnType<TData> = ColumnDef<TData, unknown>[];

type Lead = InferSelectModel<typeof leads>;

interface LeadListColumnsProps {
	onSort: (column: string, direction: 'asc' | 'desc') => void;
	currentSort: {
		column: string;
		direction: 'asc' | 'desc';
	};
	isLoading?: boolean;
}

export const leadListColumns = ({
	onSort,
	currentSort,
	isLoading
}: LeadListColumnsProps): ColumnDef<Lead, unknown>[] => {
	const columns: ColumnDef<Lead, unknown>[] = [
		{
			accessorKey: 'name',
			header: () => (
				<div className="flex items-center justify-between">
					<span>Name</span>
					{isLoading ? (
						<Skeleton className="h-4 w-4" />
					) : (
						<OrdenationButton
							column="name"
							currentDirection={
								currentSort.column === 'name'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								onSort(
									'name',
									currentSort.column === 'name' &&
										currentSort.direction === 'asc'
										? 'desc'
										: 'asc'
								)
							}
						/>
					)}
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return (
						<div className="flex items-center md:gap-4 lg:gap-2 2xl:gap-4">
							<Skeleton className="h-10 w-10 rounded-md" />
							<div className="flex flex-col gap-1">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-20" />
							</div>
						</div>
					);
				}
				return (
					<div className="flex items-center gap-6">
						<div className="relative h-12 w-12 rounded-[0.375rem]">
							<Image
								src={row.original.image}
								alt={row.original.firstName}
								className="h-full w-full rounded-[0.375rem] object-cover"
								width={48}
								height={48}
							/>
							<UserStatusLogged
								userStatus={row.original.status as UserStatus}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="font-bold text-base text-black leading-6">
								{row.original.firstName} {row.original.lastName}
							</span>
							<span className="font-normal text-primary-200 text-sm leading-5">
								{row.original.role}
							</span>
						</div>
					</div>
				);
			}
		},
		{
			accessorKey: 'email',
			header: () => (
				<div className="flex items-center justify-around gap-4">
					Email
					{isLoading ? (
						<Skeleton className="h-4 w-4" />
					) : (
						<OrdenationButton
							column="email"
							currentDirection={
								currentSort.column === 'email'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								onSort(
									'email',
									currentSort.column === 'email' &&
										currentSort.direction === 'asc'
										? 'desc'
										: 'asc'
								)
							}
						/>
					)}
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return <Skeleton className="h-4 w-16" />;
				}

				return (
					<div className="flex flex-col gap-1">
						<span className="font-normal text-base text-black leading-5">
							{row.original.email}
						</span>
						<span className="font-normal text-primary-200 text-sm leading-6">
							Email
						</span>
					</div>
				);
			}
		},
		{
			accessorKey: 'phone',
			header: () => (
				<div className="flex w-full items-center justify-between gap-4">
					Phone
					{isLoading ? (
						<Skeleton className="h-4 w-4" />
					) : (
						<OrdenationButton
							column="phone"
							currentDirection={
								currentSort.column === 'phone'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								onSort(
									'phone',
									currentSort.column === 'phone' &&
										currentSort.direction === 'asc'
										? 'desc'
										: 'asc'
								)
							}
						/>
					)}
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return <Skeleton className="h-4 w-12" />;
				}
				return (
					<div className="flex flex-col gap-1">
						<span className="font-normal text-base text-black leading-5">
							{row.original.phone}
						</span>
						<span className="font-normal text-primary-200 text-sm leading-6">
							Phone
						</span>
					</div>
				);
			}
		},
		{
			accessorKey: 'tag',
			header: () => (
				<div className="flex w-full items-center justify-between lg:hidden 2xl:flex">
					Tag
					{isLoading ? (
						<Skeleton className="h-4 w-4" />
					) : (
						<OrdenationButton
							column="role"
							currentDirection={
								currentSort.column === 'role'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								onSort(
									'role',
									currentSort.column === 'role' &&
										currentSort.direction === 'asc'
										? 'desc'
										: 'asc'
								)
							}
						/>
					)}
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return (
						<div className="flex min-w-[11.25rem] items-center justify-center rounded-lg bg-white-200 px-7 py-2 lg:hidden 2xl:flex">
							<Skeleton className="h-4 w-24" />
						</div>
					);
				}
				return (
					<div className="flex min-w-[11.25rem] items-center justify-center rounded-lg bg-white-200 px-7 py-2 lg:hidden 2xl:flex">
						<span className="font-bold text-base text-primary-200 leading-5">
							{row.original.role}
						</span>
					</div>
				);
			}
		},
		{
			id: 'actions',
			enableGrouping: false,
			header: () => null,
			cell: () => {
				if (isLoading) {
					return <Skeleton className="h-9 w-9" />;
				}
				return (
					<Button color="septenary" className="h-9 w-9 border border-white-200">
						<Icon.MoreActions />
					</Button>
				);
			}
		}
	];
	return columns;
};
