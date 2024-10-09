
import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { ProductModel, ProductSchema } from "../models/products.model.js";
import { sample_products, sample_users } from "../data.js";
import bcryptjs from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;

set('strictQuery', true);

export const dbconnect = async () => {
    try {
        await connect(process.env.MONGO_URI);
        await seedUsers();
        await seedProducts();
        console.log('connect successfully !');
    } catch (error) {
        console.log(error);
    }
};

async function seedUsers() {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        console.log('Users seed is already done !');
        return;
    }

    for (let user of sample_users) {
        user.password = await bcryptjs.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }

    console.log('User seed is done !');
}

async function seedProducts() {
    const products = await ProductModel.countDocuments();
    if (products > 0) {
        console.log('Product seed is already done');
        return;
    }

    for (const product of sample_products) {
        // product.imageUrl = `/products/${product.imageUrl}`;
        product.imageUrl = `${product.imageUrl}`;
        await ProductModel.create(product);
    }

    console.log('Products seed is done !');
}