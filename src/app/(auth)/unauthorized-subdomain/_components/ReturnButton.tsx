'use client';

import { Button } from '~/common/components/ui/Button';
import { useRouter } from 'next/navigation';

export function ReturnButton() {
	const router = useRouter();
	return (
		<div className="flex items-center justify-center">
			<Button onClick={() => router.back()}>Return to Home</Button>
		</div>
	);
}
