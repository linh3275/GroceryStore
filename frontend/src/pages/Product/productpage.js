import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './productpage.module.css';
import { getById } from '../../services/productservice';
import useFavorite from '../../components/hooks/favorite';
import { ShoppingIcon, FavoriteIcon, NotFavoriteIcon } from '../../components/icon';
import StarRating from '../../components/starrating/starrating';
import Tags from '../../components/tags/tags';
import Price from '../../components/price/price';
import { useCart } from '../../components/hooks/cart';
import NotFound from '../../components/notfound/notfound';

export default function ProductPage() {

    const [product, setProduct] = useState({});
    const [showNotification, setShowNotification] = useState(false); // Thêm trạng thái cho thông báo
    const { id } = useParams();
    const { favItems, toggleFav } = useFavorite();
    
    // Sử dụng useCart để truy cập addToCart
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        setShowNotification(true);  // Hiển thị thông báo

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    useEffect(() => {
        getById(id).then(setProduct);
    }, [id]);

    return (
        <>
        {/* chỉnh sửa lại chỗ quả id trên thanh tìm kiếm ? */}
            {!product ? (<NotFound message="Product not found" linkText="Back to Homepage" />) 
            : <div className={classes.container}>
                <img className={classes.image} src={product.imageUrl} alt={product.name} />
                <div className={classes.details}>
                    <div className={classes.header}>
                        <span className={classes.name}>{product.name}</span>
                        <span onClick={() => toggleFav(product.id)} style={{ cursor: 'pointer' }}>
                            {favItems[product.id] ? <FavoriteIcon /> : <NotFavoriteIcon />}
                        </span>
                    </div>
                    <div className={classes.rating}>
                        <StarRating stars={product.stars} size={25} />
                    </div>
                    <div className={classes.origins}>
                        {product.origins?.map(origin => (
                            <span key={origin}>{origin}</span>
                        ))}
                    </div>
                    <div className={classes.tags}>
                        {product.tags && (
                            <Tags tags={product.tags.map(tag => ({name: tag}))} productPage={true} />
                        )}
                    </div>
                    <div className={classes.price}>
                        <Price price={product.price} />
                    </div>

                    <button className={classes.addToCart} onClick={handleAddToCart}>
                        <ShoppingIcon />
                        Thêm vào giỏ hàng
                    </button>

                    {/* Hiển thị thông báo khi sản phẩm được thêm vào giỏ hàng */}
                    {showNotification && (
                        <div className={classes.notification}>
                            Sản phẩm đã được thêm vào giỏ hàng!
                        </div>
                    )}
                </div>    
            </div>}
        </>
    );
}
