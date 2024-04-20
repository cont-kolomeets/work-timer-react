import { useEffect, useState } from "react";

export function useDebounce(value: string, timeout: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const h = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(h);
    };
  }, [value, timeout, setDebouncedValue]);

  return debouncedValue;
}
