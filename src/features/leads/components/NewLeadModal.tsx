import { useAtom } from 'jotai';
import { selectedAddAction } from '~/common/atoms/selected-add-action';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '~/common/components/ui/dialog';
import { NewLeadForm } from './NewLeadForm';

export function NewLeadModal() {
	const [, setSelectedModal] = useAtom(selectedAddAction);

	return (
		<Dialog open onOpenChange={() => setSelectedModal(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<span className="font-bold text-primary-200 text-sm leading-5">
							Create new lead
						</span>
					</DialogTitle>
				</DialogHeader>
				<NewLeadForm />
			</DialogContent>
		</Dialog>
	);
}
