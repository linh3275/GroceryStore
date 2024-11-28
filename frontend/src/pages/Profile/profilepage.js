import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/hooks/auth";

import Title from "../../components/HTML_DOM/title";
import Input from "../../components/HTML_DOM/input";
import Button from "../../components/HTML_DOM/button";
import ChangePassword from "../../components/changepassword/changepassword";

import classes from './profilepage.module.css';

export default function ProfilePage() {

    const {
        handleSubmit, register,
        formState: {errors},
    } = useForm();

    const navigate = useNavigate();

    const {user, updateProfile} = useAuth();

    const submit = user => {
        updateProfile(user);
    };

    return (
        <div className={classes.container}>
            
            <div className={classes.details}>

                <div>
                    <div className={classes.title}>
                        <Title title="Cập nhật thông tin cá nhân" />
                    </div>

                    <div className={classes.main}>
                        <form onSubmit={handleSubmit(submit)}>
                            <Input
                                defaultValue={user.name}
                                type="text"
                                label="Tên người dùng"
                                {...register('name', {
                                    required: true,
                                    minlength: 5,
                                })}
                                error={errors.name}
                            />
                            <Input
                                defaultValue={user.address}
                                type="text"
                                label="Địa chỉ"
                                {...register('address', {
                                    required: true,
                                    minlength: 10,
                                })}
                                error={errors.address}
                            />

                            <Button type="submit" text="Cập nhật" />
                        </form>

                        <Button type="button" text="Trở về" backgroundColor="var(--patone-green)"
                         onClick={() => navigate('/dashboard')} />
                    </div>

                </div>

                <ChangePassword />

            </div>

        </div>
    )
}