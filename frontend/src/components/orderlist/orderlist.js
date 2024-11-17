import { Link } from "react-router-dom";

import Price from "../price/price";

import classes from './order.module.css';

export default function OrderList ({order}) {
    return (
        <table className={classes.table}>
            
            <thead>
                <tr>
                    <td colSpan="5">
                        <h3>Danh sách đặt hàng:</h3>
                    </td>
                </tr>
            </thead>

            <tbody>
                {order.items.map(item => (
                    <tr key={item.product.id}>
                        <td>
                            <Link to={`/product/${item.product.id}`}>
                                <img src={item.product.imageUrl} alt='' />
                            </Link>
                        </td>
                        <td className={classes.detail}>
                            <div className={classes.name}>Tên sản phẩm: {item.product.name}</div>
                            <div>Giá:
                                <Price price={item.product.price} />
                            </div>
                            <div>Số lượng: {item.quantity}</div>

                        </td>
                    </tr>
                ))}
            </tbody>

            <tfoot>
                <tr>
                    <td className={classes.price}>
                        <h4>Tổng tiền: </h4>
                    </td>
                    <td>
                        <Price price={order.totalPrice} />
                    </td>
                </tr>
            </tfoot>

        </table>
    )
}