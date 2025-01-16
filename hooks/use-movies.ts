import { useEffect, useState } from 'react';
import { fetchMovieList } from '@/repo/movie';
import { Movie } from '@/types/movie';

export const useMovies = (filters: Record<string, string>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<Movie[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchMovieList(filters);
      if (res.statusCode && res.statusCode !== 200) {
        setError(res);
        setData([]);
      } else {
        setError(null);
        setData(res);
      }
    } catch (error) {
      setError(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return {
    loading,
    error,
    data,
    fetchData,
  };
};
