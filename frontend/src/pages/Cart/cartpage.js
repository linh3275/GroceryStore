import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../components/hooks/cart';
import Title from '../../components/HTML_DOM/title';
import Price from '../../components/price/price';
import NotFound from '../../components/notfound/notfound';
import { FavoriteIcon, DeleteIcon } from '../../components/icon';

import classes from './cartpage.module.css';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      changeQuantity(item, newQuantity);
    }
  };

  return (
    <>
      <div className={classes.header}>
        <Title title="Giỏ hàng của bạn" margin="1.5rem 0 0 2.5rem" />
        <div className={classes.favIcon}>
          <FavoriteIcon />
        </div>
      </div>
      {cart.items.length === 0 ? (
          <NotFound message="Chưa có sản phẩm nào được thêm vào giỏ hàng !" linkText="Xin hãy tham khảo thêm các mặt hàng khác !" />
        ) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map(item => (
              <li key={item.product.id}>
                <div className={classes.image}>
                  <img src={item.product.imageUrl} alt={item.product.name} />
                </div>
                <div className={classes.name}>
                  <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                </div>

                <div className={classes.quantitySelector}>
                  <button
                    className={classes.quantityButton}
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item, Number(e.target.value))}
                    className={classes.quantityInput}
                  />

                  <button
                    className={classes.quantityButton}
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className={classes.productPrice}>
                  <Price price={item.price} />
                </div>
                <div className={classes.remove}>
                  <button
                    className={classes.remove_btn}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={classes.checkout}>
            <div className={classes.count}>{cart.totalCount}</div>
            <div className={classes.price}>
              <Price price={cart.totalPrice} />
            </div>
            <Link to="/checkout">Thanh Toán</Link>
          </div>
        </div>
      )}
    </>
  );
}
