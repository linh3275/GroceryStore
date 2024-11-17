import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '../../components/hooks/auth';
import { EMAIL } from '../../components/constants/patterns';

import Title from '../../components/HTML_DOM/title';
import Input from '../../components/HTML_DOM/input';
import Button from '../../components/HTML_DOM/button';

import classes from './registerpage.module.css';


export default function RegisterPage() {

    const [ params ] = useSearchParams();
    const returnUrl = params.get('returnUrl');
    
    const auth = useAuth();
    const { user } = auth;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [navigate, returnUrl, user])

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

        <div className={classes.detail}>
            <Title title="Đăng ký" />

            <form onSubmit={handleSubmit(submit)} noValidate >

                <div className={classes.basic}>

                    <Input
                        type="text"
                        label="Tên người dùng"
                        {...register('name', {
                            required: true,
                            minLength: 5,
                        })}
                        error={errors.name}
                    />

                    <Input
                        type="email"
                        label="Tên tài khoản email"
                        {...register('email', {
                            required: true,
                            pattern: EMAIL,
                        })}
                        error={errors.email}
                    />

                <Input
                    type="text"
                    label="Địa chỉ"
                    {...register('address', {
                    required: true,
                    minLength: 10,
                    })}
                    error={errors.address}
                />

                </div>

                <div>

                    <div className={classes.basic}>
                        <Input
                            type="password"
                            label="Mật khẩu"
                            {...register('password', {
                            required: true,
                            minLength: 5,
                            })}
                            error={errors.password}
                        />

                        <Input
                            type="password"
                            label="Nhập lại mật khẩu"
                            {...register('confirmPassword', {
                            required: true,
                            validate: value => value !== getValues('password')
                            ? 'Password is not match !' : true,
                            })}
                            error={errors.confirmPassword}
                        />
                    </div>

                    <Button type="submit" text="Đăng ký" />

                    <div className={classes.login}>
                        <span>
                            Đã có tài khoản ? &nbsp;
                        </span>

                        <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                            Đăng nhập tại đây !
                        </Link>
                    </div>

                </div>

            </form>
        </div>
    </div>
  )
}
