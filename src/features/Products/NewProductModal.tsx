import { useAtom } from "jotai";
import { selectedAddAction } from "~/common/atoms/selected-add-action";
import { Checkbox } from "~/common/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { NewProductForm } from "./components/NewProductForm";

export function NewProductModal() {
  const [, setSelectedModal] = useAtom(selectedAddAction);

  return (
    <Dialog open onOpenChange={() => setSelectedModal(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-[0.625rem]">
            <Checkbox className="h-5 w-5 rounded-[6.25rem] bg-white-200" />
            <span className="text-sm text-primary-200 font-bold leading-5">Create new product</span>
          </DialogTitle>
        </DialogHeader>
        <NewProductForm />
      </DialogContent>
    </Dialog>
  )
}
