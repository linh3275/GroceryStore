import { Link } from "react-router-dom";
import Price from "../price/price";
import classes from './order.module.css';

export default function OrderList ({order}) {
    return (
        <table className={classes.table}>
            <tbody>
                <tr>
                    <td colSpan="5">
                        <h3>Order Items:</h3>
                    </td>
                </tr>

                {order.items.map(item => (
                    <tr key={item.product.id}>
                        <td>
                            <Link to={`/product/${item.product.id}`}>
                                <img src={item.product.imageUrl} />
                            </Link>
                        </td>
                        <td>{item.product.name}</td>
                        <td>
                            <Price price={item.product.price} />
                        </td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}

                <tr>
                    <td>
                        <strong>Total: </strong>
                    </td>
                    <td>
                        <Price price={order.totalPrice} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}