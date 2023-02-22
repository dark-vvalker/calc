import { useState, useEffect } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async (...args) => {
      setLoading(true);
      const response = await apiFunc(...args);
      setLoading(false);

      setError(!response.ok);
      setData(response.data.data);

      return response;
    };

    request();
  }, [apiFunc]);

  return { data, error, loading };
};

export default useApi;
