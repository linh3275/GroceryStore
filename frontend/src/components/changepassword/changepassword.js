import React from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../hooks/auth";

import Title from "../HTML_DOM/title";
import Input from "../HTML_DOM/input";
import Button from "../HTML_DOM/button";

import classes from './changepass.module.css';

export default function ChangePassword() {
    const {
        handleSubmit, register, getValues,
        formState: { errors },
    } = useForm();

    const { changePassword } = useAuth();
    const submit = password => {
        changePassword(password);
    }

    return (
        <div className={classes.container}>
            <Title title="Đổi mật khẩu" />
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <Input
                        type="password"
                        label="Mật khẩu hiện tại"
                        {...register('currentPassword', { required: true })}
                        error={errors.currentPassword}
                    />
                    <Input
                        type="password"
                        label="Mật khẩu mới"
                        {...register('newPassword', {
                            required: true,
                            minLength: 5,
                        })}
                        error={errors.newPassword}
                    />
                    <Input
                        type="password"
                        label="Xác nhận lại mật khẩu"
                        {...register('confirmPassword', {
                            required: true,
                            validate: value => value !== getValues('newPassword')
                                ? 'Mật khẩu không khớp' : 'Thông tin điền quá ngắn',
                        })}
                        error={errors.confirmPassword}
                    />
                </div>

                <Button type="submit" text="Đổi mật khẩu" backgroundColor="var(--rouge-red)"/>
            </form>
        </div>
    );
}