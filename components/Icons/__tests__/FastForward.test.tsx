import { render } from '@testing-library/react';

import FastForwardSVG from 'components/Icons/Play';

describe('FastForwardSVG', () => {
  it('Should match snapshots', () => {
    const { container } = render(<FastForwardSVG />);

    expect(container).toMatchSnapshot();
  });
});
