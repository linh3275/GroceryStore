import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { EMAIL, name } from '../../../components/constants/patterns';
import { getById, updateUser, getAllU } from '../../../services/userservice';

import Title from '../../../components/HTML_DOM/title';
import Input from '../../../components/HTML_DOM/input';
import Button from '../../../components/HTML_DOM/button';

import classes from './userE.module.css';

export default function UserEdit() {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { userId } = useParams();

    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    const checkAdmin = async () => {
        const users = await getAllU();
        const adminCount = users.filter(user => user.isAdmin).length;

        setIsAdmin(adminCount > 1);
    };

    const submit = async (userData) => {
        try {
            const updatedUser = await updateUser({ id: userId, ...userData });
            const currentUser = JSON.parse(localStorage.getItem('user'));

            if (currentUser?.id === updatedUser.id) {
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }

            alert('Cập nhật người dùng thành công!');
            navigate('/admin/users');
        } catch (error) {
            alert('Có lỗi xảy ra khi cập nhật người dùng.');
        }
    };

    useEffect(() => {

        const loadUser = async () => {
            try {
                const user = await getById(userId);
                reset(user);
                setUser(user);
            } catch (error) {
                alert('Không thể tải thông tin người dùng. Vui lòng thử lại.');
                navigate('/admin/users');
            }
        };

        loadUser();
        checkAdmin();
    }, [userId, reset, navigate, ]);

    return (
        <div className={classes.container}>
            <div className={classes.content}>

                <div className={classes.head}>
                    <div className={classes.title}>
                        <Title title="Cập nhật người dùng" />
                    </div>

                    <Button type="button" text="Trở về" backgroundColor="var(--patone-green)"
                        onClick={() => navigate('/admin/users')} />
                </div>

                <form onSubmit={handleSubmit(submit)} noValidate>
                    <div className={classes.main}>

                        <div className={classes.basic}>
                            <Input
                                label="Tên người dùng"
                                {...register('name', { required: true, minLength: 1, pattern: name })}
                                error={errors.name}
                            />
                            <Input
                                label="Tên tài khoản email"
                                {...register('email', { required: true, pattern: EMAIL })}
                                error={errors.email}
                            />

                            { 
                                (isAdmin || !user?.isAdmin) && (
                                    <div className={classes.checkbox}>
                                        <Input
                                            label="Admin"
                                            type="checkbox"
                                            {...register('isAdmin')}
                                        />
                                    </div>
                                )
                            }
                        </div>

                        <div className={classes.address}>
                            <Input
                                label="Địa chỉ"
                                {...register('address', { required: true, minLength: 5 })}
                                textarea={true}
                                error={errors.address}
                            />

                            <Button type="submit" text="Cập nhật thông tin" />
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}
