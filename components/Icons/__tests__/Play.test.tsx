import { render } from '@testing-library/react';

import PlaySVG from 'components/Icons/Play';

describe('PlaySVG', () => {
  it('Should match snapshots', () => {
    const { container } = render(<PlaySVG />);

    expect(container).toMatchSnapshot();
  });
});
