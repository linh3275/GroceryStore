import React from "react";
import { useForm } from "react-hook-form";
import Title from "../HTML_DOM/title";
import Input from "../HTML_DOM/input";
import Button from "../HTML_DOM/button";
import { useAuth } from "../hooks/auth";

export default function ChangePassword() {

    const {
        handleSubmit, register, getValues,
        formState: {errors},
    } = useForm();

    const {changePassword} = useAuth();
    const submit =  password => {
        changePassword(password);
    }

    return (
        <div>
            <Title title="Change Password" />
            <form onSubmit={handleSubmit(submit)}>
                <Input
                    type="password"
                    label="Current Password"
                    {...register('currentPassword', {
                        required: true
                    })}
                    error={errors.currentPassword}
                />
                <Input
                    type="password"
                    label="New Password"
                    {...register('newPassword', {
                        required: true,
                        minLength: 5,
                    })}
                    error={errors.newPassword}
                />
                <Input
                    type="password"
                    label="Confirm Password"
                    {...register('confirmPassword', {
                        required: true,
                        validate: value => value !== getValues('newPassword')
                            ? 'Password do not match' : true,
                    })}
                    error={errors.confirmPassword}
                />

                <Button type="Submit" text="Change" />
            </form>
        </div>
    )
}