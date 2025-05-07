import { toast } from 'sonner';
import { api } from '~/trpc/react';

export const useProduct = () => {
	const trpcUtils = api.useUtils();

	const createProduct = api.product.create.useMutation({
		onSuccess: () => {
			toast.success('Product created successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const updateProduct = api.product.update.useMutation({
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const deleteProduct = api.product.delete.useMutation({
		onSuccess: () => {
			trpcUtils.product.getProductsPaginated.invalidate();
			trpcUtils.product.getControlledProductsInfinite.invalidate();
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const bulkDeleteProducts = api.product.bulkDelete.useMutation({
		onSuccess: () => {
			trpcUtils.product.getProductsPaginated.invalidate();
			trpcUtils.product.getControlledProductsInfinite.invalidate();
		}
	});

	return {
		createProduct,
		updateProduct,
		deleteProduct,
		bulkDeleteProducts
	};
};
