import { ContentSidebar } from '~/features/ContentSidebar';

export default function Dashboard() {
	return (
		<div className="flex gap-1">
			<ContentSidebar.Page.Dashboard />
			<h2>You are in dashboard page</h2>
		</div>
	);
}
