import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button } from '~/common/components/ui/Button';

describe('Button', () => {
	it('should render', () => {
		const { container } = render(<Button>Click me</Button>);
		expect(container).toMatchSnapshot();
	});
});
