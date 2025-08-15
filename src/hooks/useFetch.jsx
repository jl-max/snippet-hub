import { useState, useEffect, useCallback } from "react";

export function useFetch(uri, options = {}, manual = false) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(!manual);

  const execute = useCallback(async () => {
    if (!uri) return;
    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch(uri, options);
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [uri, JSON.stringify(options)]);

  useEffect(() => {
    if (manual) return;
    execute();
  }, [execute, manual]);

  return { loading, data, error, execute };
}
