import { model, Schema } from "mongoose";

export const ProductSchema = new Schema(
    {
        name: {type: String, require: true,},
        price: {type: Number, require: true,},
        imageUrl: {type: String, require: true,},
        description: {type: String, require: true,},
        favorite: {type: Boolean, default: false,},
        stars: {type: Number, default: 0,},
        tags: {type: [String]},
        origins: {type: [String], require: true,},
        quantity: {type: Number, default: 1,},
        storageQuantity: {type: Number, default: 10,},
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    },
);

export const productModel = model('product', ProductSchema);