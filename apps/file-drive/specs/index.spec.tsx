import { render } from '@testing-library/react';

import Page from '../src/app/page';

describe('Page', () => {
  it('renders successfully', () => {
    const { baseElement } = render(<Page />);

    expect(baseElement).toBeDefined();
  });
});
