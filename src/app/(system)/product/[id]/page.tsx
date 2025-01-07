import { AddActionMenu } from "~/common/components/ui/AddActionMenu";
import { Icon } from "~/common/components/ui/Icons/_index";
import { PagesHeader } from "~/common/components/ui/PagesHeader";
import { ContentSidebar } from "~/features/ContentSidebar";
import { ProductActions } from "~/features/Products/components/ProductActions";
import { UpdateProductForm } from "~/features/Products/components/UpdateProductForm";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

export const generateStaticParams = async () => {
  const getAllIds = async () => await db.query.products.findMany({
    columns: {
      id: true
    }
  })

  const productsIds = await getAllIds();
  return productsIds.map((product) => ({ id: product.id }));
}

export default async function Product({ params }: { params: { id: string } }) {
  const product = await api.product.getById(params.id);

  return (
    <div className="flex w-full">
			<ContentSidebar.Page.Dashboard />
			<div className="flex w-full flex-col bg-white-300">
				<PagesHeader iconLeft={<Icon.Arrow.Left className="h-3 w-3" />} title={`Item Settings`}>
					<AddActionMenu />
				</PagesHeader>
				<div className="bg-white-300 px-[1.625rem] pb-[1.625rem] h-full">
        <div className="p-[1.625rem] flex gap-[1.875rem] bg-white-100 rounded-xl h-full">
        <div className="flex-1">
        {product && <UpdateProductForm product={product} />}
        </div>
        <ProductActions />
        </div>
        </div>
			</div>
		</div>
  )
}