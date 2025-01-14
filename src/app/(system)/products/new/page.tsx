'use client'

import { useRouter } from "next/navigation";
import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import { PagesHeader } from "~/common/components/ui/PagesHeader";
import { useIsDesktop } from "~/common/hooks/useMediaQuery";
import { NewProductForm } from "~/features/Products/components/NewProductForm";

export default function NewProduct() {
  const router = useRouter();
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    router.replace('/products');
    return null;
  }

  return (
    <div className="flex flex-col w-full bg-white-300">
      <PagesHeader 
        iconLeft={<Icon.Arrow.Left className="w-3 h-3" />} 
        title="Create New Product"
        onClickIconLeft={() => router.back()}
      >
        <Button className="w-10 h-10 p-0 hover:bg-white-200/60" color="secondary">
          <Icon.MoreActions />
        </Button>
      </PagesHeader>
      <div className="px-4 lg:px-0">
        <NewProductForm />
      </div>
    </div>
  );
} 