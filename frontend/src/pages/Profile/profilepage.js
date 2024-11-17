import React from "react";
import { useForm } from "react-hook-form";
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

                </div>

                <ChangePassword />

            </div>

        </div>
    )
}