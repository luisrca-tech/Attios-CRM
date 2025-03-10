import { AddActionMenu } from '~/common/components/ui/AddActionMenu';
import { Icon } from '~/common/components/ui/Icons/_index';
import { PagesHeader } from '~/common/components/ui/PagesHeader';
import { ContentSidebar } from '~/features/ContentSidebar';
import { ProductsTable } from '~/features/Products/ProductsTable';

export default function Products() {
	return (
		<main className="flex w-full">
			<ContentSidebar.Page.Products />
			<div className="flex h-screen w-full flex-col bg-white-300 lg:px-7">
				<PagesHeader
					title="Products"
					iconLeft={<Icon.Search className="h-4 w-4" />}
				>
					<AddActionMenu />
				</PagesHeader>
				<ProductsTable />
			</div>
		</main>
	);
}
