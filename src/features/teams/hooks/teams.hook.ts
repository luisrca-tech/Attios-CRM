import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '~/trpc/react';
import { getSubdomain } from '~/utils/subdomain';

type UseTeamsProps = {
	isFirstTeam?: boolean;
};

export const useTeams = ({ isFirstTeam = false }: UseTeamsProps) => {
	const router = useRouter();

	const createTeam = api.subdomain.create.useMutation({
		onSuccess: (data) => {
			toast.success('Team and subdomain created successfully!');
			if (isFirstTeam) {
				router.refresh();
				const domain = getSubdomain(data.subDomain);
				router.push(domain);
			}
		},
		onError: () => {
			toast.error('Failed to create team and subdomain. Please try again.');
		}
	});

	return {
		createTeam
	};
};
