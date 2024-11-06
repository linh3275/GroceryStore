import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import classes from './thumbnails.module.css';
import StarRating from '../starrating/starrating';
import Price from '../price/price';
import { FavoriteIcon, NotFavoriteIcon, ShoppingIcon } from '../icon';
import useFavorite from '../hooks/favorite';
import { useCart } from '../hooks/cart';
import Tags from '../tags/tags';

export default function ThumbNails({ products, tags }) {
  const { searchTerm } = useParams();  
  const { favItems, toggleFav } = useFavorite();
  const { addToCart } = useCart();
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState('all');
  const [searchResults, setSearchResults] = useState(products);  

  // Xử lý tìm kiếm
  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(products);
    }
  }, [searchTerm, products]);

  // Xử lý phân loại và áp dụng chế độ xem
  useEffect(() => {
    const applyViewMode = (productsToFilter) => {
      switch (viewMode) {
        case 'favorite':
          return productsToFilter.filter((product) => favItems[product.id]);
        case 'cheapest':
          return [...productsToFilter].sort((a, b) => parseInt(a.price) - parseInt(b.price));
        case 'bestRated':
          return [...productsToFilter].sort((a, b) => b.stars - a.stars);
        default:
          return productsToFilter;
      }
    };

    setFilteredProducts(applyViewMode(searchResults));
  }, [searchResults, viewMode, favItems]);

  // Xử lý thay đổi chế độ xem
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Xử lý thêm vào giỏ hàng và hiển thị thông báo
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (

    <>
      { <div className={classes.container}>
      {/* <div className={classes.bubble}></div> */}

      <Tags tags={tags} />

      <div className={classes.mainContent}>
        <div className={classes.navbar}>
          <span
            onClick={() => handleViewModeChange('all')}
            className={viewMode === 'all' ? classes.activeView : ''}
          >
            Tất cả sản phẩm
          </span>
          <span
            onClick={() => handleViewModeChange('favorite')}
            className={viewMode === 'favorite' ? classes.activeView : ''}
          >
            Sản phẩm yêu thích
          </span>
          <span
            onClick={() => handleViewModeChange('cheapest')}
            className={viewMode === 'cheapest' ? classes.activeView : ''}
          >
            Giá tiền thấp nhất
          </span>
          <span
            onClick={() => handleViewModeChange('bestRated')}
            className={viewMode === 'bestRated' ? classes.activeView : ''}
          >
            Sản phẩm đánh giá tốt nhất
          </span>
        </div>

        <ul className={classes.product_container}>
          {filteredProducts.map((product) => (
            <li key={product.id} className={classes.product}>
              <Link to={`/product/${product.id}`} className={classes.link}>
                <img
                  className={classes.image}
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className={classes.name}>{product.name}</div>
                <div className={classes.price}>
                  <Price price={product.price} />
                </div>
              </Link>
              <div className={classes.actions}>
                <div className={classes.evaluation}>
                  <div className={classes.stars}>
                    <StarRating stars={product.stars} />
                  </div>
                  <span
                    onClick={() => toggleFav(product.id)}
                    className={classes.favIcon}
                  >
                    {favItems[product.id] ? 
                      <div className={classes.fav}>
                        <FavoriteIcon /> 
                      </div> : <NotFavoriteIcon />
                    }
                  </span>
                </div>
                <button 
                  className={classes.addToCart} 
                  onClick={() => handleAddToCart(product)} 
                >
                  <div className={classes.cartbtn}>
                    <ShoppingIcon fontSize='small' />
                  </div>
                </button>
              </div>
              {/* <div className={classes.stock}>Còn lại: {product.storageQuantity} sản phẩm</div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
      }
    </>
  );
}
