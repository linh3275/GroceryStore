import React from 'react';
import { Link } from 'react-router-dom';
import useClick from '../hooks/click';

import classes from './notfound.module.css';

export default function NotFound({message, linkRoute, linkText}) {

  const {clicked, toggleClick} = useClick();

  return (
    <div className={classes.container}>
        <div className={classes.title}>{message}</div>
        <Link to={linkRoute} onClick={toggleClick} className={ clicked ? `${classes.click}` : classes.link}>
          {linkText}
        </Link>
    </div>
  )
}

NotFound.defaultProps = {
    message: 'Hệ thống đang xảy ra vấn đề, vui lòng quay lại sau !',
    linkRoute: '/',
    linkText: 'Tải lại trang !',
}