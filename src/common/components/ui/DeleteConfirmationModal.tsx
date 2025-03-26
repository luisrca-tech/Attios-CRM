import { Button } from './Button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from './dialog';

interface DeleteConfirmationModalProps {
	onConfirm: () => void;
	onCancel: () => void;
	isOpen: boolean;
}

export const DeleteConfirmationModal = ({
	onConfirm,
	onCancel,
	isOpen
}: DeleteConfirmationModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="font-bold text-base text-black">
						Are you sure you want to delete this item?
					</DialogTitle>
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
	);
};
