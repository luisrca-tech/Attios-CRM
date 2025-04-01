'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/common/components/ui/Button';
import ErrorMessage from '~/common/components/ui/ErrorMessage';
import { Input } from '~/common/components/ui/Input';

export default function CreateTeamPage() {
	const router = useRouter();
	const [teamName, setTeamName] = useState('');
	const [subdomain, setSubdomain] = useState('');
	const [errors, setErrors] = useState<{
		teamName?: string;
		subdomain?: string;
	}>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});

		// Basic validation
		if (!teamName.trim()) {
			setErrors((prev) => ({ ...prev, teamName: 'Team name is required' }));
			return;
		}

		if (!subdomain.trim()) {
			setErrors((prev) => ({ ...prev, subdomain: 'Subdomain is required' }));
			return;
		}

		// TODO: Add API call to create team and subdomain
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success('Team created successfully!');
			router.push('/dashboard');
		} catch (error) {
			console.error(error);
			toast.error('Failed to create team. Please try again.');
		}
	};

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
						<form onSubmit={handleSubmit} className="space-y-4">
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
										value={teamName}
										onChange={(e) => setTeamName(e.target.value)}
										placeholder="Enter your team name"
									/>
								</Input.Root>
								<ErrorMessage>{errors.teamName}</ErrorMessage>
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
											value={subdomain}
											onChange={(e) =>
												setSubdomain(e.target.value.toLowerCase())
											}
											placeholder="your-team"
										/>
									</Input.Root>
									<span className="inline-flex items-center rounded-r-md border border-gray-300 border-l-0 bg-gray-50 px-3 text-gray-500 text-sm">
										.attios.com
									</span>
								</div>
								<ErrorMessage>{errors.subdomain}</ErrorMessage>
							</div>
							<Button type="submit" className="w-full" color="primary">
								Create Team
							</Button>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
