import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import classes from './userE.module.css';
import { useParams } from 'react-router-dom';
import { getById, updateUser } from '../../../services/userservice';
import Title from '../../../components/HTML_DOM/title';
import Input from '../../../components/HTML_DOM/input';
import { EMAIL } from '../../../components/constants/patterns';
import Button from '../../../components/HTML_DOM/button';

export default function UserEdit() {

    const {
        register, reset, handleSubmit,
        formState: {errors},
    } = useForm();

    const {userId} = useParams();
    const isEditMode = userId;

    const loaderUser = async () => {
        const user = await getById(userId);
        reset(user);
    }
    
    const submit = (userData) => {
        updateUser(userData);
    }

    useEffect(() => {
        if(isEditMode) loaderUser();
    }, [userId]);

  return (
    <div className={classes.container}>
        <div className={classes.content}>
            <Title title={isEditMode ? 'Edit User' : 'Add User'} />

            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input
                    label="Name"
                    {...register('name', {required: true, minLength: 3})}
                    error={errors.name}
                />
                <Input
                    label="Email"
                    {...register('email', {required: true, pattern: EMAIL})}
                    error={errors.email}
                />
                <Input
                    label="Address"
                    {...register('address', {required: true, minLength: 5})}
                    error={errors.address}
                />
                <Input
                    label="isAdmin"
                    type="checkbox"
                    {...register('isAdmin')}
                />
                <Button type="submit" />
            </form>
        </div>
    </div>
  )
}
