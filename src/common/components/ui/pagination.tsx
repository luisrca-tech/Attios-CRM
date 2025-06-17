import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { cn } from '~/lib/utils';
import type { LinkProps } from './Button';
import { LinkButton } from './Button';
import { Icon } from './Icons/_index';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
	<nav
		aria-label="pagination"
		className={cn('flex w-full items-center justify-between', className)}
		{...props}
	/>
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn('flex flex-row items-center gap-1', className)}
		{...props}
	/>
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
	isActive?: boolean;
} & LinkProps;

const PaginationLink = ({
	className,
	isActive,
	children,
	...props
}: PaginationLinkProps) => (
	<LinkButton
		variant={isActive ? 'outlined' : 'filled'}
		color="secondary"
		className={cn(
			'bg-transparent text-black hover:border hover:border-primary-200 hover:bg-transparent',
			className
		)}
		{...props}
	>
		{children}
	</LinkButton>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
	isActive,
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to previous page"
		className={cn(
			'flex h-8 w-8 items-center justify-center rounded-md bg-white-200 p-0',
			className
		)}
		{...props}
	>
		<Icon.Arrow.Left />
	</PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to next page"
		className={cn(
			'flex h-8 w-8 items-center justify-center rounded-md bg-white-200 p-0',
			className
		)}
		{...props}
	>
		<Icon.Arrow.Right />
	</PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<'span'>) => (
	<span
		aria-hidden
		className={cn('flex h-9 w-9 items-center justify-center', className)}
		{...props}
	>
		<DotsHorizontalIcon className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
};
