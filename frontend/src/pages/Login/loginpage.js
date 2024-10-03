import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../components/hooks/auth';
import classes from './loginpage.module.css';
import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';

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
        <Title title="Log In" />
        <form onSubmit={handleSubmit(submit)} noValidate>
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
            })}
            error={errors.password}
          />

          <Button type="submit" text="Login" />

          <div className={classes.register} >
            New user ? &nbsp;
              <Link to={`/register?${returnUrl ? 'returnUrl=' + returnUrl : ''}`}>
                Register Here !
              </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
