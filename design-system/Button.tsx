import { ReactNode } from 'react';

export interface Props {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  children: ReactNode;
  /**
   * Optional force active state
   */
  isActive?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary = false, size = 'medium', children, isActive = false, ...props }: Props) => {
  const BASE_BUTTON = 'uppercase tracking-wider box-border';
  const PRIMARY_BUTTON = `${BASE_BUTTON} bg-blue-400 border border-blue-400 text-white focus:outline-none focus:bg-blue-600 focus:border-blue-600 hover:bg-blue-600 hover:border-blue-600`;
  const SECONDARY_BUTTON = `${BASE_BUTTON} border border-gray-400 text-gray-400 focus:outline-none focus:border-gray-600 hover:border-gray-600 focus:text-gray-600 hover:text-gray-600`;

  const SIZE_BUTTON = {
    small: 'rounded-sm text-sm px-2 py-1',
    medium: 'rounded-md text-md px-3 py-2',
    large: 'rounded-lg text-lg px-4 py-3',
  };

  const ACTIVE_BUTTON = {
    primary: 'bg-blue-600 border-blue-600',
    secondary: 'text-gray-600 border-gray-600',
  };

  return (
    <button
      type="button"
      className={`${primary ? PRIMARY_BUTTON : SECONDARY_BUTTON} ${SIZE_BUTTON[size]} ${
        isActive && ACTIVE_BUTTON[primary ? 'primary' : 'secondary']
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
