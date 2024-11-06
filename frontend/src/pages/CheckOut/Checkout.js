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
            toast.warning('Please select your location on the map.');
            return;
        }

        await createOrder({ ...order, name: data.name, address: data.address });
        navigate('/payment');
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className={classes.container}>
                <div className={classes.content}>
                    <Title title="Order Form" fontSize="1.6rem" />
                    <div className={classes.inputs}>
                        <Input
                            defaultValue={user.name}
                            label="Name"
                            {...register('name')}
                            error={errors.name}
                        />
                        <Input
                            defaultValue={user.address}
                            label="address"
                            {...register('address')}
                            error={errors.address}
                        />
                    </div>
                    <OrderList order={order} />
                </div>

                <div>
                    <Title title="Choose your location" fontSize="1.6rem" />
                    <Map
                        location={order.addressLatLng}
                        onChange={latlng => {
                            setOrder({ ...order, addressLatLng: latlng});
                        }}
                    />
                </div>

                <div className={classes.btn_container}>
                    <div className={classes.btns}>
                        <Button
                            type="submit"
                            text="Go to Payment"
                            width="100%"
                            height="3rem"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}