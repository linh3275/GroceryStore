import React from 'react';
import classes from './cartpage.module.css';
import { useCart } from '../../components/hooks/cart';
import Title from '../../components/title/title';
import { Link } from 'react-router-dom';
import Price from '../../components/price/price';
import NotFound from '../../components/notfound/notfound';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) { // Đảm bảo số lượng không nhỏ hơn 1
      changeQuantity(item, newQuantity);
    }
  };

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />
      {cart.items.length === 0 ? (
        <NotFound message="Cart Page is Empty" />
        ) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map(item => (
              <li key={item.product.id}>
                <div className={classes.imageWrapper}>
                  <img src={item.product.imageUrl} alt={item.product.name} />
                </div>
                <div className={classes.productName}>
                  <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                </div>

                {/* Bắt đầu phần số lượng với các nút + và - */}
                <div className={classes.quantitySelector}>
                  <button
                    className={classes.quantityButton}
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
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
                {/* Kết thúc phần số lượng với các nút + và - */}

                <div className={classes.productPrice}>
                  <Price price={item.price} />
                </div>
                <div className={classes.removeButton}>
                  <button
                    className={classes.remove_btn}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={classes.checkout}>
            <div className={classes.product_count}>Tổng sản phẩm: {cart.totalCount}</div>
            <div className={classes.totalPrice}>
              <Price price={cart.totalPrice} />
            </div>
            <Link to="/checkout">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </>
  );
}
