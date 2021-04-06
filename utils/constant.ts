export const SEO = {
  title: 'Game Of Life',
  description: '',
};

export { version as VERSION } from 'package.json';

export const RUNNING_ENV = process.env.NODE_ENV;
export const IS_RUNNING_DEV = process.env.NODE_ENV === 'development';
export const IS_RUNNING_PROD = process.env.NODE_ENV === 'production';
