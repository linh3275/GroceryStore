import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useCart } from "../../components/hooks/cart";
import { useAuth } from "../../components/hooks/auth";
import { createOrder } from "../../services/orderservice";

import Title from "../../components/HTML_DOM/title";
import Input from "../../components/HTML_DOM/input";
import Button from "../../components/HTML_DOM/button";
import OrderList from "../../components/orderlist/orderlist";
import Map from "../../components/map/map";

import classes from './Checkout.module.css';

export default function CheckoutPage() {

    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ order, setOrder ] = useState({...cart});

    const {
        register, formState: {errors},
        handleSubmit,
    } = useForm();

    const submit = async data => {
        if (!order.addressLatLng) {
            toast.warning('Hãy chọn vị trí bạn đang ở !');
            return;
        }

        await createOrder({ ...order, name: data.name, address: data.address });
        navigate('/payment');
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className={classes.container}>
                <div className={classes}>
                    <div className={classes.info}>

                        <Title title="Đơn đặt hàng" />

                        <div className={classes.inputs}>
                            <Input
                                defaultValue={user.name}
                                label="Tên khách hàng"
                                {...register('name', {required: true})}
                                error={errors.name}
                            />
                            
                            <Input
                                defaultValue={user.address}
                                label="Địa chỉ nhận hàng"
                                {...register('address', {required: true})}
                                error={errors.address}
                            />
                        </div>

                        <div className={classes}>
                            <Title title="Chọn vị trí của bạn" />
                            <Map
                                location={order.addressLatLng}
                                onChange={latlng => {
                                    setOrder({ ...order, addressLatLng: latlng});
                                }}
                            />
                        </div>
                        
                    </div>
                </div>

                <div>
                    <OrderList order={order} />

                    <div className={classes}>
                        <Button
                            type="submit"
                            text="Go to Payment"
                        />
                    </div>
                </div>

            </form>
        </>
    )
}