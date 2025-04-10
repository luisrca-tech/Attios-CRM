'use client';

import { useProduct } from '../hooks/useProduct';
import { Input } from '~/common/components/ui/Input';
import { useProductFilters } from '../hooks/useProductFilters';
export function CategorySearchFilter() {
	const { filteredCategories, setCategorySearch: onSearchCategory } =
		useProduct();

	const { handleFilterChange } = useProductFilters();
	return (
		<Input.SelectInput
			text="Category"
			options={filteredCategories}
			onSearch={(value) => {
				onSearchCategory(value);
			}}
			onChange={(value) => handleFilterChange('category', value)}
			withoutAddButton
		/>
	);
}
