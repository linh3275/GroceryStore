import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLoading } from "../hooks/loading";
import { useCart } from "../hooks/cart";

import { PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { pay } from "../../services/orderservice";

export default function PaymentButtons({ order }) {
    return (
        <PayPalScriptProvider
            options={{
                clientId:'AdSuniThSBBTeYPX4e4tXPEVsd4BXPjGCuPu571tJjRphNTCo5NTITijyHuvTZjEEeGxgEwsy9zufV69'
            }}>
                <PayButton orders={order} />
            </PayPalScriptProvider>
    )
}

function PayButton ({order}) {
    const [{isPending}] = usePayPalScriptReducer();
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