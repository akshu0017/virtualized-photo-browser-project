import { useState, useEffect } from 'react';
import { Photo } from '../types/photos';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!res.ok) throw new Error('Failed to fetch photos');
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};