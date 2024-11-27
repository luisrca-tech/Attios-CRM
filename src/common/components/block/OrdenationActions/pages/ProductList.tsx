import { Checkbox } from '~/common/components/ui/checkbox';
import { OrdenationItem } from '../OrdenationItem';
import { OrdenationRoot } from '../OrdenationRoot';
import { ProductListItems } from '~/common/constants/ProductListItems';

export function OrdenationProductList() {
	return (
		<OrdenationRoot className="lg:grid-cols-[auto_0.3fr_repeat(3,minmax(3.75rem,6.25rem))_11.25rem_2.5rem]">
			<Checkbox className="ml-7 h-5 w-5 bg-white-100" />
			{ProductListItems.map((item) => (
				<OrdenationItem label={item.label} key={item.label} />
			))}
		</OrdenationRoot>
	);
}
