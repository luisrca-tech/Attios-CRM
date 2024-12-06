import { PagesHeader } from '~/common/components/ui/PagesHeader';
import { ContentSidebar } from '~/features/ContentSidebar';

export default function Dashboard() {
	return (
		<div className="flex w-full">
			<ContentSidebar.Page.Dashboard />
			<div className="flex w-full flex-col">
				<PagesHeader pageTitle="Dashboard" />
			</div>
		</div>
	);
}
