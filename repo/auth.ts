import { API_URL } from '@/utils/constant';
import { getBearerToken } from '@/utils/helper';

export const processLogin = async (payload: { email: string; password: string }) => {
  const resp = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const processSignup = async (payload: {
  name?: string;
  email: string;
  password: string;
}) => {
  const resp = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const getProfile = async () => {
  const url = `${API_URL}/auth/profile`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: getBearerToken() },
  });
  const result = await resp.json();
  return result;
};
