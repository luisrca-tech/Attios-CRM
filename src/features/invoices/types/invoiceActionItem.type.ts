export type InvoiceActionItem = {
  key: "BillTo" | "From" | "Description";
  text: string;
  label: string;
  icon: (fill: string) => React.ReactNode;
  isDisabled: boolean;
};
