import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function useQuery() {
  const location = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(location.search));
  useEffect(() => {
    const newQuery = new URLSearchParams(location.search);
    setQuery(newQuery);
  }, [location.search]);
  return query;
}
