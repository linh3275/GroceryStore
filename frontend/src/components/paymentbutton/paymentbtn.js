import React, { useEffect } from "react";
import { useLoading } from "../hooks/loading";
import { useCart } from "../hooks/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// chỉnh sửa sau

export default function PaymentButtons({ order }) {
    return (
        // <PayProvider options={{}}>
            <Buttons order={order} />
        // </PayProvider>
    )
}

function Buttons ({order}) {
    const [{isPending}] = pay(false);
    const {showLoading, hideLoading} = useLoading();
    const {clearCart} = useCart();
    const navigate = useNavigate();
    useEffect(() => {
        isPending ? showLoading() : hideLoading();
    });

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: {
                amount: {
                    currency_code: 'vnd',
                    value: order.totalPrice,
                },
            },
        });
    }

    const onApprove = async (data, actions) => {
        try {
            const payment = await actions.order.capture();
            const orderId = await pay(payment.id);
            clearCart();
            toast.success('Payment successfully', 'Success');
            navigate('/track/' + orderId);
        } catch (error) {
            toast.error('Payment failed', 'Error');
        }
    }

    const onError = err => {
        toast.error('Payment failed', 'Error');
    }

    return (
        <PaymentButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
        />
    )
}

function pay(a) {
    console.log(a);
    return a;
}