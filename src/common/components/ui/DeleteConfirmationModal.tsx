import { useAtom } from "jotai";
import { isOpenConfirmationModal } from "~/common/atoms/is-open-confirmation-modal";
import { Button } from "./Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal = ({ onConfirm, onCancel }: DeleteConfirmationModalProps) => {
  const [isOpen, setIsOpen] = useAtom(isOpenConfirmationModal);

  const handleOpenChange = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-black">Are you sure you want to delete this item?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" color="quaternary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button type="button" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}