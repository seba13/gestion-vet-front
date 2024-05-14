import { useState } from "react";
import { HttpMethods } from "../interfaces/httpMethods";

function useCustomFetch(
  url: string,
  method: HttpMethods = HttpMethods.GET,
  requestBody?: any
) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
}

export default useCustomFetch;
