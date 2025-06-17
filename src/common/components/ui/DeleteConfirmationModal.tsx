import { cn } from '~/lib/utils';
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
	title: string;
	type?: 'delete' | 'activate';
}

export const DeleteConfirmationModal = ({
	onConfirm,
	onCancel,
	isOpen,
	title,
	type = 'delete'
}: DeleteConfirmationModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="font-bold text-base text-black">
						{title}
					</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<Button
						className={cn(type === 'delete' && 'bg-secondary-300')}
						type="button"
						color="quaternary"
						onClick={onConfirm}
					>
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
