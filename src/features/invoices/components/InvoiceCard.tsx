import { Icon } from '~/common/components/ui/Icons/_index';
import type { invoices } from '~/server/db/schema';

interface InvoiceCardProps {
	invoice: typeof invoices.$inferSelect;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
	const date = new Date(invoice.date);
	const formattedDate = date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});

	return (
		<div className="flex items-center justify-between rounded-xl bg-white-100 p-4">
			<div className="flex items-center gap-3">
				<div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-lg bg-primary-100/30">
					<Icon.Sidebar.Invoices
						className="h-[1.125rem] w-[1.125rem]"
						fill="#5E81F4"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<p className="font-bold text-base text-black leading-6">
						{invoice.number}
					</p>
					<p className="font-normal text-primary-200 text-sm leading-5">
						{formattedDate}
					</p>
				</div>
			</div>
			<div className="flex flex-col gap-1">
				<p className="font-bold text-black text-lg leading-6">
					${invoice.amount}
				</p>
				<p className="text-end font-bold text-primary-100 text-sm leading-5">
					{invoice.status}
				</p>
			</div>
		</div>
	);
}
