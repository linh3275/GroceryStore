import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../../components/input/input';
import Title from '../../components/title/title';
import Button from '../../components/button/button';
import classes from './registerpage.module.css';
import { useAuth } from '../../components/hooks/auth';


export default function RegisterPage() {

    const [ params ] = useSearchParams();
    const returnUrl = params.get('returnUrl');
    
    const auth = useAuth();
    const { user } = auth;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user])

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const submit = async data => {
        await auth.register(data);
    };

  return (
    <div className={classes.container}>
        <div className={classes.details}>
            <Title title="Register" />
            <form onSubmit={handleSubmit(submit)} noValidate>

                <Input
                    type="text"
                    label="name"
                    {...register('name', {
                        required: true,
                        minLength: 5,
                    })}
                    error={errors.name}
                />

                <Input
                    type="email"
                    label="Email"
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                            message: 'Email is not valid !', 
                        }
                    })}
                    error={errors.email}
                />

            <Input
                type="password"
                label="Password"
                {...register('password', {
                required: true,
                minLength: 5,
                })}
                error={errors.password}
            />

            <Input
                type="password"
                label="Confirm Password"
                {...register('confirmPassword', {
                required: true,
                validate: value => value !== getValues('password')
                ? 'Password is not match !' : true,
                })}
                error={errors.confirmPassword}
            />

            <Input
                type="text"
                label="Address"
                {...register('address', {
                required: true,
                minLength: 10,
                })}
                error={errors.address}
            />

            <Button type="submit" text="Register" />

            <div className={classes.login}>
                Already a user? &nbsp;
                <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                    Login Here !
                </Link>
            </div>

            </form>
        </div>
    </div>
  )
}
