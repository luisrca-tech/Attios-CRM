import { AddActionMenu } from "~/common/components/ui/AddActionMenu";
import { Icon } from "~/common/components/ui/Icons/_index";
import { NotFoundItem } from "~/common/components/ui/NotFoundItem";
import { PagesHeader } from "~/common/components/ui/PagesHeader";
import { NotFoundImage } from "~/common/components/ui/images/NotFound";
import { ContentSidebar } from "~/features/ContentSidebar";
import { ProductActions } from "~/features/products/components/ProductActions";
import { UpdateProductForm } from "~/features/products/components/UpdateProductForm";
import { api } from "~/trpc/server";

export default async function Product({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id, 10);
  if (Number.isNaN(productId)) {
    return (
      <NotFoundItem
        href="/products"
        className="w-full"
        renderImage={() => <NotFoundImage />}
        title="Invalid ID"
        description="The product ID is invalid."
        textButton="Go back"
      />
    );
  }

  const product = await api.product.getById(productId);

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
    <main className="flex h-screen w-full">
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
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
