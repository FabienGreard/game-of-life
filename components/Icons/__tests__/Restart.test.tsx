import { render } from '@testing-library/react';

import RestartSVG from 'components/Icons/Restart';

describe('RestartSVG', () => {
  it('Should match snapshots', () => {
    const { container } = render(<RestartSVG />);

    expect(container).toMatchSnapshot();
  });
});
