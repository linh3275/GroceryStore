import { useState, useEffect } from 'react';

function useFavorite() {
  const [favItems, isFav] = useState(() => {
    const storedFavItems = localStorage.getItem('favItems');
    return storedFavItems ? JSON.parse(storedFavItems) : {};
  });

  useEffect(() => {
    localStorage.setItem('favItems', JSON.stringify(favItems));
  }, [favItems]);

  const toggleFav = (productId) => {
    isFav((prevFavItems) => ({
      ...prevFavItems,
      [productId]: !prevFavItems[productId],
    }));
  };

  return { favItems, toggleFav };
}

export default useFavorite;
