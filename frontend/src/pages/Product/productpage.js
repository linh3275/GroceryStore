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
import useClick from '../../components/hooks/click';

export default function ProductPage() {

    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { favItems, toggleFav } = useFavorite();

    const [detail, showDetail] = useState(true);
    const [tags, showTags] = useState(false);
    const [origin, showOrigin] = useState(false); 

    const {clicked, toggleClick} = useClick();

    const toggleSection = (section) => {
        showDetail(section === 'detail');
        showTags(section === 'tags');
        showOrigin(section === 'origin');
    }
    
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);

        toggleClick();
    };

    useEffect(() => {
        getById(id).then(setProduct);
    }, [id]);

    return (
        <>
            {!product ? (<NotFound message="Product not found" linkText="Back to Homepage" />) 
                : <div className={classes.container}>

                <div className={classes.details}>
                    <img className={classes.image} src={product.imageUrl} alt={product.name} />

                    <div className={classes.artile}>

                        <div className={classes.navbar}>

                            <div className={classes.section}>
                                <span onClick={() => toggleSection('detail')}>
                                    Thông tin sản phẩm
                                </span>
                                <span onClick={() => toggleSection('tags')}>
                                    Danh mục sản phẩm
                                </span>
                                <span onClick={() => toggleSection('origin')}>
                                    Xuất xứ
                                </span>
                            </div>
                            
                            {detail && <span>Dầu gội nam xuất xứ từ ....</span> }

                            { tags && product.tags && (
                                <Tags tags={product.tags.map(tag => ({name: tag}))} productPage={true} />
                            )}
                            
                            { origin && product.origins?.map(origin => (
                                <span key={origin}>{origin}</span>
                            ))}
                        </div>

                        <div className={classes.evaluation}>
                            <div className={classes.fav}>
                                <div onClick={() => toggleFav(product.id)} style={{ cursor: 'pointer' }}>
                                    {favItems[product.id] ? <FavoriteIcon /> : <NotFavoriteIcon />}
                                </div>
                            </div>

                            <div className={classes.price}>
                                <Price price={product.price} />
                            </div>
                        
                            <button className={classes.addToCart} onClick={handleAddToCart}>
                                <div className={clicked ? `${classes.cartbtn} ${classes.click}` : classes.cartbtn}>
                                    <ShoppingIcon />
                                    <span>Thêm vào giỏ hàng</span>
                                </div>
                            </button>
                        
                        </div>

                    </div>

                </div>

                    <div className={classes.view}>
                        <div className={classes.name}>{product.name}</div>

                        <div className={classes.rating}>
                            <StarRating stars={product.stars} size={25} />
                        </div>
                    </div>

                </div>
            }
        </>
    );
}
