import { PagesHeader } from '~/common/components/ui/PagesHeader';
import { ContentSidebar } from '~/features/ContentSidebar';
import { ProductsTable } from '~/features/Products/ProductsTable';

export default function Products() {
	return (
		<div className="flex w-full">
			<ContentSidebar.Page.Products />
			<div className="flex h-screen w-full flex-col bg-white-300 lg:px-7">
				<PagesHeader pageTitle="Products" />
				<ProductsTable />
			</div>
		</div>
	);
}
