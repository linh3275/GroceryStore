import React, { useEffect, useState } from "react";
import classes from './paymentpage.module.css';
import { getNewOrderForCurrentUser } from "../../services/orderservice";
import Title from "../../components/HTML_DOM/title";
import OrderList from "../../components/orderlist/orderlist";
import Map from "../../components/map/map";
import PaymentButtons from "../../components/paymentbutton/paymentbtn";

export default function PaymentPage() {
    const [order, setOrder] = useState();

    useEffect(() => {
        getNewOrderForCurrentUser().then(data => setOrder(data));
    }, []);

    if (!order) return;

    return (
        <>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title="Order Form" fontSize="1.6rem" />
                    <div className={classes.summary}>
                        <div>
                            <h3>Name: </h3>
                            <span>{order.name}</span>
                        </div>
                        <div>
                            <h3>Address: </h3>
                            <span>{order.address}</span>
                        </div>
                    </div>
                    <OrderList order={order} />
                </div>

                <div className={classes.map}>
                    <Title title="Your Location" fontSize="1.6rem" />
                    <Map readonly={true} location={order.addressLatLng} />
                </div>

                <div className={classes.btn_container}>
                    <div className={classes.btn}>
                        <PaymentButtons order={order} />
                    </div>
                </div>
            </div>
        </>
    )
}