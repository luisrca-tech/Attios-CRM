'use client';

import { useState } from 'react';
import { Button } from '../../../common/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../../common/components/ui/dropdown-menu';
import { Icon } from '../../../common/components/ui/Icons/_index';
import { DeleteConfirmationModal } from '../../../common/components/ui/DeleteConfirmationModal';
import { useRouter } from 'next/navigation';
import type { Product } from '~/features/products/types/product.type';
import { useProduct } from '~/features/products/hooks/useProduct';
import { toast } from 'sonner';

interface MoreActionsProps {
	product: Product;
}

export function ProductMoreActions({ product }: MoreActionsProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { deleteProduct } = useProduct();
	const router = useRouter();

	const toggleModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleDelete = async () => {
		try {
			await deleteProduct.mutateAsync({ id: product.id });
			setIsModalOpen(false);
			toast.success(`Product ${product.name} deleted successfully`);
		} catch (error) {
			console.error('Error deleting product:', error);
			toast.error('Failed to delete product');
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button color="septenary" className="h-9 w-9 border border-white-200">
						<Icon.MoreActions />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="z-10 bg-white-100 p-0">
					<DropdownMenuItem
						onClick={() => router.push(`/product/${product.id}`)}
					>
						Item Details
					</DropdownMenuItem>
					<DropdownMenuItem>Item Settings</DropdownMenuItem>
					<DropdownMenuItem
						onClick={toggleModal}
						className="flex items-center justify-between bg-secondary-300"
					>
						Delete Item
						<Icon.Trash fill="#FFFFFF" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeleteConfirmationModal
				isOpen={isModalOpen}
				onCancel={handleCancel}
				onConfirm={handleDelete}
			/>
		</>
	);
}
