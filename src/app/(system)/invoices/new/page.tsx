"use client";

export const dynamic = "force-dynamic";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import { PagesHeader } from "~/common/components/ui/PagesHeader";
import { FromForm } from "~/features/invoices/components/FromForm";
import { BillToForm } from "~/features/invoices/components/BillToForm";
import { InvoiceActions } from "~/features/invoices/components/InvoiceActions";
import { useAtom } from "jotai";
import { selectedInvoiceSectionAtom } from "~/features/invoices/atoms/invoiceAtoms";

export default function NewInvoice() {
  const router = useRouter();
  const [selected] = useAtom(selectedInvoiceSectionAtom);

  const invoiceNumber = useMemo(() => {
    const letters = () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const two = () => String(Math.floor(Math.random() * 100)).padStart(2, "0");
    const four = () => String(Math.floor(Math.random() * 10000)).padStart(4, "0");
    return `${letters()}-${two()}-${two()}-${four()}`;
  }, []);

  return (
    <main className="flex h-screen w-full">
      <div className="flex w-full flex-col bg-white-300">
        <PagesHeader
          iconLeft={<Icon.Arrow.Left className="h-3 w-3" />}
          title="New Invoice"
          onClickIconLeft={() => router.back()}
        >
          <Button
            className="h-10 w-10 p-0 hover:bg-white-200/60"
            color="secondary"
          >
            <Icon.MoreActions />
          </Button>
        </PagesHeader>
        <div className="flex-1 overflow-hidden px-3 pb-[1.625rem] lg:px-[1.625rem]">
          <div className="flex h-full gap-[1.875rem] rounded-xl bg-white-100 p-3 lg:p-[1.625rem]">
            <div className="flex-1 overflow-y-auto pr-1">
              {selected === "BillTo" && <BillToForm invoiceNumber={invoiceNumber} />}
              {selected === "From" && <FromForm />}
              {selected === "Description" && (
                <div className="rounded-md bg-white-100 p-4">
                  Description — Coming soon
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <InvoiceActions />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
