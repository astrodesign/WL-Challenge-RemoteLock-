import { useCallback, useState } from "react";

export const useFetchData = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const fetchData = useCallback(() => {
    if (url) {
      setLoading(true);
      fetch(url, {
        method: "get",
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setData(json.data);
          setLoading(false);
        });
    }
  }, [url]);
  return { data, loading, fetchData };
};
