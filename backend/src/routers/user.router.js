import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { bad_request } from '../constants/httpStatus.js';

const router = Router();

import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;

router.post('/login', handler(async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(genTokenRes(user));
        return;
    }

    res.status(bad_request).send('Username or password is invalid !');
}));

router.post('/register', handler( async (req, res) => {
        const { name, email, password, address } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            res.status(bad_request).send('User already exists, please login !');
            return ;
        }

        const encryptedPassword =  await bcrypt.hash(
            password,
            PASSWORD_HASH_SALT_ROUNDS
        );

        const newUser = {
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address
        };

        const result = await UserModel.create(newUser);
        res.send(genTokenRes(result));
    })
);

const genTokenRes = user => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token,
    }
}

export default router;