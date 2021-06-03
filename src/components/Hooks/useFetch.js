import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useFetch = (url, action) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            'Wystąpił problem z serwerem, spróbuj ponownie później'
          );
        }
        const data = await response.json();
        dispatch(action(data));
        setLoading(false);
        setError('');
      } catch ({ message }) {
        setError(message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, error };
};

export default useFetch;
