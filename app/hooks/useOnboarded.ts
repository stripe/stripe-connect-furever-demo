import React, {useState, useEffect} from 'react';

export const useOnboarded = () => {
  const [onboarded, setOnboarded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/onboarded');
        const {onboarded} = await response.json();
        setOnboarded(onboarded);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {loading, onboarded, error};
};
