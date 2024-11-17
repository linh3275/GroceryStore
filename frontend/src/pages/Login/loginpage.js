import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '../../components/hooks/auth';
import { EMAIL } from '../../components/constants/patterns';

import Title from '../../components/HTML_DOM/title';
import Input from '../../components/HTML_DOM/input';
import Button from '../../components/HTML_DOM/button';

import classes from './loginpage.module.css';

export default function LoginPage() {
  const {
    handleSubmit, register, formState: {errors},
  } = useForm();
  
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, navigate, returnUrl]);

  const submit = async ({email, password}) => {
    await login(email, password);
  };
  
  return (
    <div className={classes.container}>

      <div className={classes.detail}>

        <div className={classes.title}>
          <Title title="Đăng nhập" />
        </div>

        <form onSubmit={handleSubmit(submit)} noValidate>
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
            type="password"
            label="Mật khẩu"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
          />

          <Button type="submit" text="Đăng nhập" />

          <div className={classes.regis} >
            <span>
              Người dùng mới ? &nbsp;
            </span>
            
            <Link to={`/register?${returnUrl ? 'returnUrl=' + returnUrl : ''}`}>
              Đăng ký tại đây !
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
