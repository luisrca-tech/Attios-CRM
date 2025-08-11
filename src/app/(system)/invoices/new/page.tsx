"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import { PagesHeader } from "~/common/components/ui/PagesHeader";
import { useIsLargeScreen } from "~/common/hooks/useMediaQuery";
import { NewInvoiceForm } from "~/features/invoices/components/NewInvoiceForm";

export default function NewInvoice() {
  const router = useRouter();
  const isDesktop = useIsLargeScreen();

  if (isDesktop) {
    return null;
  }

  return (
    <main className="flex w-full flex-col bg-white-300">
      <PagesHeader
        iconLeft={<Icon.Arrow.Left className="h-3 w-3" />}
        title="Create New Invoice"
        onClickIconLeft={() => router.back()}
      >
        <Button
          className="h-10 w-10 p-0 hover:bg-white-200/60"
          color="secondary"
        >
          <Icon.MoreActions />
        </Button>
      </PagesHeader>
      <div className="px-4 lg:px-0">
        <NewInvoiceForm />
      </div>
    </main>
  );
}
