'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';
import { Button } from '~/common/components/ui/Button';
import ErrorMessage from '~/common/components/ui/ErrorMessage';
import { Input } from '~/common/components/ui/Input';
import { createTeamSchema } from '~/server/api/routers/teams/schemas/teams.schema';
import type { CreateTeamInputType } from '~/server/api/routers/teams/types/teams.type';
import { useTeams } from '../hooks/teams.hook';

// TODO: handle the global state of the team to be able to relate the team to the lead and product

// TODO: create a menu to select the team

// TODO: create a new page to create a team or edit a team

type TeamsFormProps = {
	isFirstTeam?: boolean;
};

export default function TeamsForm({ isFirstTeam = false }: TeamsFormProps) {
	const { createTeam } = useTeams({ isFirstTeam });
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateTeamInputType>({
		resolver: zodResolver(createTeamSchema)
	});

	const onSubmit: SubmitHandler<CreateTeamInputType> = async (data) => {
		try {
			await createTeam.mutateAsync({
				subDomain: data.subdomain,
				teamName: data.name
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to create team. Please try again.');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label
					htmlFor="teamName"
					className="block font-medium text-gray-700 text-sm"
				>
					Team Name
				</label>
				<Input.Root className="mt-1">
					<Input.Text
						id="teamName"
						{...register('name')}
						placeholder="Enter your team name"
					/>
				</Input.Root>
				<ErrorMessage>{errors.name?.message}</ErrorMessage>
			</div>
			<div>
				<label
					htmlFor="subdomain"
					className="block font-medium text-gray-700 text-sm"
				>
					Subdomain
				</label>
				<div className="mt-1 flex rounded-md shadow-sm">
					<Input.Root className="flex-1">
						<Input.Text
							id="subdomain"
							{...register('subdomain')}
							placeholder="your-team"
						/>
					</Input.Root>
					<span className="inline-flex items-center rounded-r-md border border-gray-300 border-l-0 bg-gray-50 px-3 text-gray-500 text-sm">
						.attios.com
					</span>
				</div>
				<ErrorMessage>{errors.subdomain?.message}</ErrorMessage>
			</div>
			<Button type="submit" className="w-full" color="primary">
				Create Team
			</Button>
		</form>
	);
}
