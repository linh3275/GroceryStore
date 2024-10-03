import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import classes from './thumbnails.module.css';
import StarRating from '../starrating/starrating';
import Price from '../price/price';
import { FavoriteIcon, NotFavoriteIcon, ShoppingIcon } from '../icon';
import useFavorite from '../hooks/favorite';
import { useCart } from '../hooks/cart';

export default function ThumbNails({ products }) {
  const { searchTerm } = useParams();  
  const { favItems, toggleFav } = useFavorite();
  const { addToCart } = useCart();
  const navigate = useNavigate(); 
  
  const uniqueTags = ['Tất cả', ...new Set(products.flatMap((product) => product.tags))];
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState('all');
  const [searchResults, setSearchResults] = useState(products);  
  const [showNotification, setShowNotification] = useState(false);

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

    const filteredByCategory = selectedCategory === 'Tất cả'
      ? searchResults
      : searchResults.filter((product) => product.tags.includes(selectedCategory));

    setFilteredProducts(applyViewMode(filteredByCategory));
  }, [searchResults, viewMode, favItems, selectedCategory]);

  // Xử lý thay đổi phân loại
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'Tất cả') {
      navigate('/');
    }
  };

  // Xử lý thay đổi chế độ xem
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Xử lý thêm vào giỏ hàng và hiển thị thông báo
  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);

    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className={classes.container}>
      <div className={classes.bubble}></div>

      <aside className={classes.sidebar}>
        <h3>Loại mặt hàng</h3>
        <ul>
          {uniqueTags.map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? classes.activeCategory : ''}
              onClick={() => handleCategoryChange(category)} 
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

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

        <ul className={classes.grid}>
          {filteredProducts.map((product) => (
            <li key={product.id} className={classes.product}>
              <Link to={`/product/${product.id}`} className={classes.link}>
                <img
                  className={classes.image}
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className={classes.content}>
                  <div className={classes.name}>{product.name}</div>
                </div>
              </Link>
              <div className={classes.stars}>
                <StarRating stars={product.stars} />
              </div>
              <div className={classes.price}>
                <Price price={product.price} />
              </div>
              <div className={classes.actions}>
                <span
                  onClick={() => toggleFav(product.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {favItems[product.id] ? <FavoriteIcon /> : <NotFavoriteIcon />}
                </span>
                <button 
                  className={classes.addToCart} 
                  onClick={() => handleAddToCart(product)} 
                >
                  <div className={classes.neonbbtn}>
                    <ShoppingIcon fontSize='small' sx={{marginRight: '4px'}} />
                    Thêm vào giỏ hàng
                  </div>
                </button>
              </div>
              <div className={classes.stock}>Còn lại: {product.storageQuantity} sản phẩm</div>
            </li>
          ))}
        </ul>

        {showNotification && (
          <div className={classes.notification}>
            Sản phẩm đã được thêm vào giỏ hàng!
          </div>
        )}
      </div>
    </div>
  );
}
