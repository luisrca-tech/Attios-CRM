import { useAtom } from "jotai";
import { selectedAddAction } from "~/common/atoms/selected-add-action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { NewInvoiceForm } from "./NewInvoiceForm";

export function NewInvoiceModal() {
  const [, setSelectedModal] = useAtom(selectedAddAction);

  return (
    <Dialog
      open
      onOpenChange={() => setSelectedModal(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-primary-200 text-sm leading-5">
            Create new invoice
          </DialogTitle>
        </DialogHeader>
        <NewInvoiceForm />
      </DialogContent>
    </Dialog>
  );
}
