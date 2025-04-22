import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '~/trpc/react';

type UseTeamsProps = {
	isFirstTeam?: boolean;
};

export const useTeams = ({ isFirstTeam = false }: UseTeamsProps) => {
	const router = useRouter();

	const createTeam = api.teams.create.useMutation({
		onSuccess: () => {
			toast.success('Team created successfully!');
			if (isFirstTeam) {
				router.push('/');
			}
		},
		onError: () => {
			toast.error('Failed to create team. Please try again.');
		}
	});

	return {
		createTeam
	};
};
