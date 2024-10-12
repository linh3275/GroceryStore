import { Router } from 'express';
import handler from 'express-async-handler';
import { bad_request } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import auth from '../middleware/auth.mid.js';

const router = Router();
router.use(auth);

router.post(
    '/create',
    handler( async (req, res) => {
        const order = req.body;

        if (order.items.length <= 0 ) res.status(bad_request).send('Cart is Empty !');

        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.new,
        });

        const newOrder = new OrderModel({ ...order, user: req.user.id });
        await newOrder.save();
        res.send(newOrder);
    })
);

router.get(
    '/newOrderForCurrentUser',
    handler( async (req, res) => {
        const order = await getNewOrderForCurrentUser(req);
        if (order) res.send(order);
        else res.status(bad_request).send();
    })
);

router.put(
    '/pay',
    handler( async (req, res) => {
        const {paymentId} = req.body;
        const order = await getNewOrderForCurrentUser(req);
        
        if (!order) {
            res.status(bad_request).send('Order not found');
            return;
        }

        order.paymentId = paymentId;
        order.status = OrderStatus.paid;
        await order.save();

        res.send(order._id);
    })
)

const getNewOrderForCurrentUser = async req => await OrderModel.findOne({ user: req.user.id, status: OrderStatus.new });

export default router;