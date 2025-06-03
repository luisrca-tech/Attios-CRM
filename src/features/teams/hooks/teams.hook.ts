import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '~/trpc/react';
import { getWorkspaceDomain } from '~/utils/workspace';

type UseTeamsProps = {
	isFirstTeam?: boolean;
};

export const useTeams = ({ isFirstTeam = false }: UseTeamsProps) => {
	const router = useRouter();

	const createTeam = api.workspace.create.useMutation({
		onSuccess: (data) => {
			toast.success('Team and subdomain created successfully!');
			if (isFirstTeam) {
				router.refresh();
				const domain = getWorkspaceDomain(data.workspace);
				router.push(`${domain}/sign-in`);
			}
		},
		onError: () => {
			toast.error('Failed to create team and workspace. Please try again.');
		}
	});

	return {
		createTeam
	};
};
