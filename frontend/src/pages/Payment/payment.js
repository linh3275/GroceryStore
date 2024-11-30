import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getNewOrder, } from "../../services/orderservice";

import Map from "../../components/map/map";
import Title from "../../components/HTML_DOM/title";
import OrderList from "../../components/orderlist/orderlist";
import PaymentButtons from "../../components/paymentbutton/paymentbtn";

import classes from './paymentpage.module.css';
import NotFound from "../../components/notfound/notfound";

export default function PaymentPage() {
    const [order, setOrder] = useState();

    useEffect(() => {

        // const token = localStorage.getItem('token');
        // if (!token) {
        //     toast.error('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
        //     return;
        // }

        getNewOrder()
            .then((data) => {
                setOrder(data);
            })
            .catch((err) => {
                
            });
    }, []);

    if (!order) return (
        <NotFound message="Trang gặp sự cố !" linkText="Xin vui lòng trở lại sau !" />
    );

    return (
        <>
            <div className={classes.container}>
                <div className={classes.content}>

                    <div className={classes.main}>
                        <Title title="Xác nhận đơn đặt hàng" />
                        <div className={classes.detail}>
                            <div className={classes.name}>
                                <h3>Tên khách hàng: {order.name}</h3>
                            </div>
                            <div className={classes.address}>
                                <h3>Địa chỉ: {order.address}</h3>
                            </div>
                        </div>

                        <div className={classes.map}>
                            <Title title="Vị trí của bạn" />
                            <Map readonly={true} location={order.addressLatLng} />
                        </div>
                    </div>

                    <div className={classes.section}>
                        <OrderList order={order} />

                        <div className={classes}>
                            <div className={classes}>
                                <PaymentButtons orders={order} />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}