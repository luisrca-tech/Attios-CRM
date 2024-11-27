import { Checkbox } from '~/common/components/ui/checkbox';
import { OrdenationRoot } from '../OrdenationRoot';
import { OrdenationItem } from '../OrdenationItem';
import { OrdenationProductGridItems } from '~/common/constants/ordenationProductGridItems';

export function OrdenationProductGrid() {
	return (
		<OrdenationRoot className="lg:grid-cols-[auto_0.3fr_repeat(2,minmax(3.75rem,6.25rem))_11.25rem]">
			<Checkbox className="ml-6 h-5 w-5 bg-white-100" />
			{OrdenationProductGridItems.map((item) => (
				<OrdenationItem label={item.label} key={item.label} />
			))}
		</OrdenationRoot>
	);
}
