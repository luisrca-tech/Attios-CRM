import { PagesHeader } from '~/common/components/ui/PagesHeader';
import { ContentSidebar } from '~/features/ContentSidebar';
import { ProductsList } from '~/features/Products/ProductsList';

export default function Products() {
	return (
		<div className="flex">
			<ContentSidebar.Page.Products />
			<div className="flex flex-1 flex-col">
				<PagesHeader pageTitle="Products" />
				<ProductsList />
			</div>
		</div>
	);
}
