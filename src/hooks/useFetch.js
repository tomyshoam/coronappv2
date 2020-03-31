// hooks.js
import { useState, useEffect } from 'react';
function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUrl() {
      if (url !== null) {
        const response = await fetch(url, {
          headers: { 'Subscription-Key': '09b965281531451ebbd7c97facdc2a7b' }
        });
        const json = await response.json();
        setData(json);
        setLoading(false);
      } else {
        setData(null);
        setLoading(false);
      }
    }
    fetchUrl();
  }, [url]);
  return [data, loading];
}
export { useFetch };
