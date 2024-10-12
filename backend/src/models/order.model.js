import { model, Schema } from "mongoose";
import { ProductModel } from "./products.model.js";
import { OrderStatus } from "../constants/orderStatus.js";

export const LatLngSchema = new Schema(
    {
        lat: {type: String, required: true},
        lng: {type: String, required: true},
    },
    {
        _id: false,
    }
)

export const OrderItemSchema = new Schema(
    {
        product: {type: ProductModel.schema, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
    },
    {
        _id: false
    }
)

OrderItemSchema.pre('validate', function (next) {
    this.price = this.product.price * this.quantity;
    next();
})

const orderSchema = new Schema (
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        addressLatLng: {type: LatLngSchema, required: true},
        paymentId: {type: String},
        totalPrice: {type: Number, required: true},
        items: {type: [OrderItemSchema], required: true},
        status: {type: String, default: OrderStatus.new},
        user: {type: Schema.Types.ObjectId, required: true},
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
)

export const OrderModel = model('order', orderSchema);