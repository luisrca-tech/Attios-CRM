import { AddActionMenu } from '~/common/components/ui/AddActionMenu';
import { Icon } from '~/common/components/ui/Icons/_index';
import { PagesHeader } from '~/common/components/ui/PagesHeader';
import { ContentSidebar } from '~/features/ContentSidebar';
import { LeadsTable } from '~/features/leads/LeadsTable';

export default function ContactsPage() {
	return (
		<main className="flex h-screen w-full">
			<ContentSidebar.Page.Leads />
			<div className="flex h-screen w-full flex-col bg-white-300 lg:px-7">
				<PagesHeader
					title="Leads"
					iconLeft={<Icon.Search className="h-4 w-4" />}
				>
					<AddActionMenu />
				</PagesHeader>
				<LeadsTable />
			</div>
		</main>
	);
}
