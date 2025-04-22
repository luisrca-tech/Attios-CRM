import TeamsForm from '~/features/teams/components/TeamsForm';

export default function CreateTeamPage() {
	return (
		<main className="flex h-screen w-full">
			<div className="flex w-full flex-col bg-white-300 lg:px-7">
				<div className="flex flex-1 flex-col items-center justify-center px-4">
					<div className="w-full max-w-md space-y-6">
						<div className="text-center">
							<h1 className="font-bold text-2xl text-gray-900">
								Welcome to Attios
							</h1>
							<p className="mt-2 text-gray-600">
								Create your first team to get started
							</p>
						</div>
						<TeamsForm isFirstTeam={true} />
					</div>
				</div>
			</div>
		</main>
	);
}
