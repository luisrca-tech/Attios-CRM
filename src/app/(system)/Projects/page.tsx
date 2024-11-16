import { ContentSidebar } from '~/features/auth/components/block/ContentSidebar';

export default function Projects() {
	return (
		<div className="flex">
			<ContentSidebar.Page.Project />
			<h2>You are in the projects page</h2>
		</div>
	);
}
