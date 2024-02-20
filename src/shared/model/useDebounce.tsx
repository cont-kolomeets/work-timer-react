import { useEffect, useState } from "react";

export function useDebounce(value: string | number, timeout: number) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const h = setTimeout(() => {
      setDebounce(value);
    }, timeout);
    return () => clearTimeout(h);
  }, [value, timeout]);
  return debounce;
}
