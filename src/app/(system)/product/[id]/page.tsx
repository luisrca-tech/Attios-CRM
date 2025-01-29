import { AddActionMenu } from '~/common/components/ui/AddActionMenu';
import { Icon } from '~/common/components/ui/Icons/_index';
import { NotFoundImage } from '~/common/components/ui/images/NotFound';
import { NotFoundItem } from '~/common/components/ui/NotFoundItem';
import { PagesHeader } from '~/common/components/ui/PagesHeader';
import { ContentSidebar } from '~/features/ContentSidebar';
import { ProductActions } from '~/features/Products/components/ProductActions';
import { UpdateProductForm } from '~/features/Products/components/UpdateProductForm';
import { db } from '~/server/db';
import { api } from '~/trpc/server';

export const generateStaticParams = async () => {
	const getAllIds = async () =>
		await db.query.products.findMany({
			columns: {
				id: true
			}
		});

	const productsIds = await getAllIds();
	return productsIds.map((product) => ({ id: product.id }));
};

export default async function Product({ params }: { params: { id: string } }) {
	const product = await api.product.getById(params.id);

	if (!product) {
		return (
			<NotFoundItem
				href="/products"
				className="w-full"
				renderImage={() => <NotFoundImage />}
				title="Item not found"
				description="The item you are looking for does not exist."
				textButton="Go back"
			/>
		);
	}

	return (
		<div className="flex h-screen w-full">
			<ContentSidebar.Page.Product product={product} />
			<div className="flex w-full flex-col bg-white-300">
				<PagesHeader
					iconLeft={<Icon.Arrow.Left className="h-3 w-3" />}
					title="Item Settings"
				>
					<AddActionMenu />
				</PagesHeader>
				<div className="flex-1 overflow-hidden px-3 pb-[1.625rem] lg:px-[1.625rem]">
					<div className="flex h-full gap-[1.875rem] rounded-xl bg-white-100 p-3 lg:p-[1.625rem]">
						<div className="flex-1 overflow-hidden">
							<UpdateProductForm product={product} />
						</div>
						<div className="hidden lg:block">
							<ProductActions />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
