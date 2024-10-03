import { Router } from "express";

import { productModel } from "../models/products.model.js";
import handler from 'express-async-handler';

const router = Router();

router.get('/', handler( async (req, res) => {
        const products = await productModel.find({});
        res.send(products);
    })
);

router.get('/tags', handler( async (req, res) => {
    const tags = await productModel.aggregate([
            {
                $unwind: '$tags',
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count',
                },
            },
        ]).sort({ count: -1 });
        
        const all = {
            name: 'ALL',
            count: await productModel.countDocuments(),
        };

        tags.unshift(all);

        res.send(tags);
    })
);

router.get('/search/:searchStore', handler( async (req, res) => {
        const {searchStore} = req.params;
        const searchRegex = new RegExp(searchStore, 'i');

        const products = await productModel.find({ name: { $regex: searchRegex }});

        res.send(products);
    })
);

router.get('/tag/:tag', handler( async (req, res) => {
        const {tag} = req.params;
        const products = await productModel.find({ tags: tag });
        res.send(products);
    })
);

router.get('/:productId', handler( async (req, res) => {
        const {productId} = req.params;
        const product = await productModel.findById(productId);
        res.send(product);
    })
);

export default router;