import { ACCESS_TOKEN_KEY } from './constant';

export const getBearerToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    return `Bearer ${token}`;
  }
  return '';
};
