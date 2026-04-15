import { useState } from 'react';

export const useLocalStorage = (key) => {
  const [data, setData] = useState(() => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });
  const setItem = (value) => {
    const dataString = JSON.stringify(value);
    localStorage.setItem(key, dataString);
    setData(value);
  };
  const removeItem = () => {
    localStorage.removeItem(key);
    setData(null);
  };

  return { data, setItem, removeItem };
};
