import { Icon } from "~/common/components/ui/Icons/_index";
import type { InvoiceActionItem } from "../types/invoiceActionItem.type";

export const invoicesActionItems: InvoiceActionItem[] = [
  {
    key: "BillTo",
    text: "Bill to",
    label: "Set your customer’s details",
    icon: (fill: string) => <Icon.Identity fill={fill} />,
    isDisabled: false,
  },
  {
    key: "From",
    text: "From",
    label: "Set your personal details",
    icon: (fill: string) => <Icon.Sidebar.Invoices fill={fill} />,
    isDisabled: false,
  },
  {
    key: "Description",
    text: "Description",
    label: "Add products or items",
    icon: (fill: string) => <Icon.Sidebar.Invoices fill={fill} />,
    isDisabled: true,
  },
];
