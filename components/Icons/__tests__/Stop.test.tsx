import { render } from '@testing-library/react';

import StopSVG from 'components/Icons/Stop';

describe('StopSVG', () => {
  it('Should match snapshots', () => {
    const { container } = render(<StopSVG />);

    expect(container).toMatchSnapshot();
  });
});
