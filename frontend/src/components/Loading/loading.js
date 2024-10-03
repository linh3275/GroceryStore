import React from 'react';
import { useLoading } from '../hooks/loading';
import classes from './loading.module.css';

export default function Loading() {

    const {isLoading} = useLoading();

    if (!isLoading) return;

  return (
    <div className={classes.container}>
        <div className={classes.item}>
            
            <h1>Loading</h1>
        </div>
    </div>
  )
}
