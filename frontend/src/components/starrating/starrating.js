import React from 'react'

import { StarIcon, StarBorderIcon, StarHalfIcon } from '../icon';

import classes from './starrating.module.css'

export default function StarRating({stars}) {

  function Star({number}) {
    const halfNumber = number -0.5;

    return stars >= number? <StarIcon className={classes.star} />
    : stars >= halfNumber? <StarHalfIcon className={classes.star} />
    : <StarBorderIcon className={classes.star} />
  }

  return (
    <div className={classes.rating}>
      {
        [1, 2, 3, 4, 5].map(number => <Star key={number} number={number}/>)
      }
    </div>
  )
}