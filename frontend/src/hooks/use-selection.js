import { useCallback, useEffect, useState } from 'react';

export const useSelection = (items = []) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const handleSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  const handleSelectOne = useCallback((item) => {
    setSelected((prevState) => {
      if (prevState.includes(item)) {
        return prevState.filter((_item) => _item !== item);
      } else {
        return [...prevState, item];
      }
    });
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  const handleDeselectOne = useCallback((item) => {
    setSelected((prevState) => prevState.filter((_item) => _item !== item));
  }, []);

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected,
  };
};
