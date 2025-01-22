'use client';

import { useRouter } from 'next/navigation';
import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons/_index';
import { PagesHeader } from '~/common/components/ui/PagesHeader';
import { useIsDesktop } from '~/common/hooks/useMediaQuery';
import { NewProductForm } from '~/features/Products/components/NewProductForm';

export default function NewProduct() {
	const router = useRouter();
	const isDesktop = useIsDesktop();

	if (isDesktop) {
		router.replace('/products');
		return null;
	}

	return (
		<div className="flex w-full flex-col bg-white-300">
			<PagesHeader
				iconLeft={<Icon.Arrow.Left className="h-3 w-3" />}
				title="Create New Product"
				onClickIconLeft={() => router.back()}
			>
				<Button
					className="h-10 w-10 p-0 hover:bg-white-200/60"
					color="secondary"
				>
					<Icon.MoreActions />
				</Button>
			</PagesHeader>
			<div className="px-4 lg:px-0">
				<NewProductForm />
			</div>
		</div>
	);
}
