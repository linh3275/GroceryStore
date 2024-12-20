import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { bad_request } from '../constants/httpStatus.js';

const router = Router();

import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import auth from '../middleware/auth.mid.js';
import admin from '../middleware/admin.mid.js';

const PASSWORD_HASH_SALT_ROUNDS = 10;

router.post('/login', handler(async (req, res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(genTokenRes(user));
            return;
        }

        res.status(bad_request).send('Username or password is invalid !');
    })
);

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
            address,
        };

        const result = await UserModel.create(newUser);
        res.send(genTokenRes(result));
    })
);

router.put('/updateProfile', auth, handler( async (req, res) => {
        const {name, address} = req.body;
        const user = await UserModel.findByIdAndUpdate(
            req.user.id,
            { name, address },
            { new: true },
        );

        res.send(genTokenRes(user));
    })
);

router.put('/changePassword', auth, handler(async (req, res) => {
        const {currentPassword, newPassword} = req.body;
        const user = await UserModel.findById(req.user.id);

        if (!user) {
            res.status(bad_request).send('Change Password failed');
            return;
        }

        const equal = await bcrypt.compare(currentPassword, user.password);

        if (!equal) {
            res.status(bad_request).send('Current Password is not correct');
            return;
        }

        user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
        await user.save();

        res.send();
    })
);

router.get('/getAll/:searchTerm?', admin, handler (async (req, res) => {
        const {searchTerm} = req.params;

        const filter = searchTerm
        ? {name: { $regex: new RegExp(searchTerm, 'i' ) } }
        : {};

        const users = await UserModel.find(filter, {password: 0});
        res.send(users);
    })
);

router.put('/block/:userId', admin, handler (async (req, res) => {
        const {userId} = req.params;

        if (userId === req.user.id) {
            res.status(bad_request).send("Can't block yourself !");
            return;
        }

        const user = await UserModel.findById(userId);
        user.isBlocked = !user.isBlocked;
        user.save();

        res.send(user.isBlocked);
    })
);

router.get('/getById/:userId', admin, handler (async (req, res) => {
        const {userId} = req.params;

        const user = await UserModel.findById(userId, {password: 0});
        res.send(user);
    })
);

router.put('/update', admin, handler (async (req, res) => {
        const { id, name, email, address, isAdmin} = req.body;

        const user = await UserModel.findByIdAndUpdate(id, { name, email, address, isAdmin },);
        
        if (!user) {
            res.status(bad_request).send('User not found!');
            return;
        }
        
        res.send();
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