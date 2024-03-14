import Index from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

it('Home should have div with index-page class', () => {
	const { container } = render(<Index />);
	const element = container.getElementsByClassName('index-page');
	expect(element.length).toBe(1);
});
