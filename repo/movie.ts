import queryString from 'query-string';
import { API_URL } from '@/utils/constant';
import { getBearerToken } from '@/utils/helper';

export const fetchMovieList = async (filters?: Record<string, string>) => {
  let url = `${API_URL}/movie`;
  const query = filters && queryString.stringify(filters);
  if (query) {
    url += `?${query}`;
  }
  const resp = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await resp.json();
  return result;
};

export const deleteMovieById = async (id: string) => {
  const url = `${API_URL}/movie/${id}`;
  const resp = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: getBearerToken() },
  });
  const result = await resp.json();
  return result;
};
