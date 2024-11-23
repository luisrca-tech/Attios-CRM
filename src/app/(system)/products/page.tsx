import { ContentSidebar } from '~/features/ContentSidebar';

export default function Products() {
	return (
		<div className="flex">
			<ContentSidebar.Page.Products />
			<h2>You are in Products page</h2>
		</div>
	);
}
