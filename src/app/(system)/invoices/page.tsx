import { AddActionMenu } from '~/common/components/ui/AddActionMenu';
import { Icon } from '~/common/components/ui/Icons/_index';
import { PagesHeader } from '~/common/components/ui/PagesHeader';

export default function Invoices() {
	return (
		<main className="flex h-screen w-full">
			<div className="flex h-screen w-full flex-col bg-white-300 lg:px-7">
				<PagesHeader
					title="Invoices"
					iconLeft={<Icon.Search className="h-4 w-4" />}
				>
					<AddActionMenu />
				</PagesHeader>
			</div>
		</main>
	);
}
