import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../components/hooks/auth";
import classes from './profilepage.module.css';
import Title from "../../components/title/title";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import ChangePassword from "../../components/changepassword/changepassword";

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
                <Title title="Update Profile" />
                <form onSubmit={handleSubmit(submit)}>
                    <Input
                        defaultValue={user.name}
                        type="text"
                        label="name"
                        {...register('name', {
                            required: true,
                            minlength: 5,
                        })}
                        error={errors.name}
                    />
                    <Input
                        defaultValue={user.address}
                        type="text"
                        label="Address"
                        {...register('address', {
                            required: true,
                            minlength: 10,
                        })}
                        error={errors.address}
                    />
                    <Button type="submit" text="Update" backgroundColor="#009e84" />
                </form>

                <ChangePassword />
            </div>
        </div>
    )
}