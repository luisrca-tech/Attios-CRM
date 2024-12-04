import { ContentSidebar } from '~/features/ContentSidebar';

export default function Projects() {
	return (
		<div className="flex">
			<ContentSidebar.Page.Projects />
			<h2>You are in the projects page</h2>
		</div>
	);
}
