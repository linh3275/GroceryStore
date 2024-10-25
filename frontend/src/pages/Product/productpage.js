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
    const { id } = useParams();
    const { favItems, toggleFav } = useFavorite();
    
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    useEffect(() => {
        getById(id).then(setProduct);
    }, [id]);

    return (
        <>
            {!product ? (<NotFound message="Product not found" linkText="Back to Homepage" />) 
                : <div className={classes.container}>

                    <div className={classes.info}>
                        <img className={classes.image} src={product.imageUrl} alt={product.name} />
                        <span className={classes.name}>{product.name}</span>
                    </div>

                    <div className={classes.details}>
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
                            <div className={classes.neonbbtn}>
                                <ShoppingIcon fontSize='small' />
                            </div>
                            Thêm vào giỏ hàng
                        </button>
                    </div>

                    <div className={classes.action}>
                        <div className={classes.header}>
                            <div onClick={() => toggleFav(product.id)} style={{ cursor: 'pointer' }}>
                                {favItems[product.id] ? <FavoriteIcon /> : <NotFavoriteIcon />}
                            </div>
                        </div>
                        <div className={classes.rating}>
                            <StarRating stars={product.stars} size={25} />
                        </div>
                    </div>

                </div>
            }
        </>
    );
}
