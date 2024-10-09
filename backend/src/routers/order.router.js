// import { Router } from 'express';
// import handler from 'express-async-handler';
// import { bad_request } from '../constants/httpStatus.js';
// import { OrderModel } from '../models/order.model.js';
// import { OrderStatus } from '../constants/orderStatus.js';
// import auth from '../middleware/auth.mid.js';

// const router = Router();
// router.use(auth);

// router.post(
//     '/create',
//     handler( async (req, res) => {
//         const order = req.body;

//         if (order.items.length <= 0 ) res.status(bad_request).send('Cart is Empty !');

//         await OrderModel.deleteOne({
//             user: req.user.id,
//             status: OrderStatus.new,
//         });

//         const newOrder = new OrderModel({ ...order, user: req.user.id });
//         await newOrder.save();
//         res.send(newOrder);
//     })
// )

// export default router;