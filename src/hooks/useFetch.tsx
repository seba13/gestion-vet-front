import { useState, useCallback } from "react";

function useFetch(url: string, options: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      setError(null);
      return result;
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { data, loading, error, fetchData, setLoading };
}

export default useFetch;
