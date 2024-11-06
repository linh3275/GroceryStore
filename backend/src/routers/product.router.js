import { Router } from "express";

import { ProductModel } from "../models/products.model.js";
import handler from 'express-async-handler';
import admin from "../middleware/admin.mid.js";

const router = Router();

router.get('/', handler( async (req, res) => {
        const products = await ProductModel.find({});
        res.send(products);
    })
);

router.get('/tags', handler( async (req, res) => {
    const tags = await ProductModel.aggregate([
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
            name: 'Danh Mục',
            count: await ProductModel.countDocuments(),
        };

        tags.unshift(all);

        res.send(tags);
    })
);

router.get('/search/:searchStore', handler( async (req, res) => {
        const {searchStore} = req.params;
        const searchRegex = new RegExp(searchStore, 'i');

        const products = await ProductModel.find({ name: { $regex: searchRegex }});

        res.send(products);
    })
);

router.get('/tag/:tag', handler( async (req, res) => {
        const {tag} = req.params;
        const products = await ProductModel.find({ tags: tag });
        res.send(products);
    })
);

router.get('/:productId', handler( async (req, res) => {
        const {productId} = req.params;
        const product = await ProductModel.findById(productId);
        res.send(product);
    })
);

router.delete('/:productId', admin, handler( async (req, res) => {
        const {productId} = req.params;
        await ProductModel.deleteOne({ _id: productId });
        res.send();
    })
);

router.put('/', admin, handler( async (req, res) => {
        const {id, name, description, price, tags, favorite, imageUrl, origins} = req.body;

        await ProductModel.updateOne(
            { _id: id },
            {
                name,description, price,
                tags: tags.split ? tags.split(',') : tags,
                favorite, imageUrl,
                origins: origins.split ? origins.split(',') : origins,
            }
        );

        res.send();
    })
);

router.post('/', admin, handler( async (req, res) => {
        const {name, description, price, tags, favorite, imageUrl, origins} = req.body;

        const product = new ProductModel(
            {
                name,description, price,
                tags: tags.split ? tags.split(',') : tags,
                favorite, imageUrl,
                origins: origins.split ? origins.split(',') : origins,
            }
        );

        await product.save();

        res.send(product);
    })
);

export default router;