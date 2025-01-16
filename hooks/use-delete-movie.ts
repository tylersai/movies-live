import { useState } from 'react';
import { deleteMovieById } from '@/repo/movie';

export const useDeleteMovie = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const mutate = async (movieId: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await deleteMovieById(movieId);
      if (res.statusCode && res.statusCode !== 200) {
        setError(res);
        return false;
      }
      setError(null);
      return true;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  return {
    loading,
    error,
    mutate,
  };
};
