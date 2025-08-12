"use client";

import { Icon } from "~/common/components/ui/Icons/_index";
import { cn } from "~/lib/utils";
import { invoicesActionItems } from "../constants/invoicesActionItems";
import { useAtom } from "jotai";
import { selectedInvoiceSectionAtom } from "../atoms/invoiceAtoms";

export function InvoiceActions() {
  const [selected, setSelected] = useAtom(selectedInvoiceSectionAtom);
  return (
    <div className="hidden h-full flex-col justify-between lg:flex">
      <div className="flex max-h-[28.25rem] min-w-[21.75rem] flex-col justify-between rounded-xl border border-white-400">
        {invoicesActionItems.map((item) => (
          <div
            key={item.text}
            className={cn(
              "flex gap-[1.3125rem] border-white-400 border-b px-8 py-[1.625rem] last:border-b-0",
              item.isDisabled && "opacity-50"
            )}
          >
            {item.icon("#8181A5")}
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className={cn(
                  "text-left font-bold text-black text-sm leading-4 hover:text-primary-100",
                  selected === item.key && "text-primary-100"
                )}
                disabled={item.isDisabled}
                onClick={() => setSelected(item.key)}
              >
                {item.text}
              </button>
              <p className="text-primary-200 text-xs leading-[1.125rem]">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
      <div className='flex flex-col gap-[1.3125rem] rounded-xl rounded-b-none border border-white-400 border-b-0 px-8 py-[1.625rem]'>
        <div className="flex gap-[1.3125rem]">
          <Icon.Sidebar.Invoices fill="#8181A5" />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="text-left font-bold text-black text-sm leading-4 hover:text-secondary-200"
            >
              Save As a Draft
            </button>
            <p className="text-primary-200 text-xs leading-[1.125rem]">
              Edit and send this invoice later
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-[1.3125rem] rounded-xl rounded-t-none border border-white-400 px-8 py-[1.625rem]'>
        <div className="flex gap-[1.3125rem]">
          <Icon.Trash fill="#8181A5" />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="text-left font-bold text-black text-sm leading-4 hover:text-secondary-300"
            >
              Delete Invoice
            </button>
            <p className="text-primary-200 text-xs leading-[1.125rem]">
              Hide & disable current invoice
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
