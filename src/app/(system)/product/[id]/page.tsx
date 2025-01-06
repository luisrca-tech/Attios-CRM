import { AddActionMenu } from "~/common/components/ui/AddActionMenu";
import { Icon } from "~/common/components/ui/Icons/_index";
import { PagesHeader } from "~/common/components/ui/PagesHeader";
import { ContentSidebar } from "~/features/ContentSidebar";
import { productActions } from "~/server/api/routers/product/queries/actions";
import { api } from "~/trpc/server";

export const generateStaticParams = async () => {
  const productsIds = await productActions.getAllIds();
  return productsIds.map((product) => ({ id: product.id }));
}

export default function Product({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full">
			<ContentSidebar.Page.Dashboard />
			<div className="flex w-full flex-col">
				<PagesHeader iconLeft={<Icon.Arrow.Left className="h-3 w-3" />} title={`Product ${params.id}`}>
					<AddActionMenu />
				</PagesHeader>
			</div>
		</div>
  )
}