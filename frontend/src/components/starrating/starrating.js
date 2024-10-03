import React from 'react'
import classes from './starrating.module.css'
import { StarIcon, StarBorderIcon, StarHalfIcon } from '../icon';
import { yellow } from '@mui/material/colors';

export default function StarRating({stars}) {

  function Star({number}) {
    const halfNumber = number -0.5;

    return stars >= number? <StarIcon sx={{color: yellow[700], fontSize: 18, cursor: 'pointer'}} className={classes.star} />
    : stars >= halfNumber? <StarHalfIcon sx={{color: yellow[700], fontSize: 18, cursor: 'pointer'}} className={classes.star} />
    : <StarBorderIcon sx={{color: yellow[700], fontSize: 18, cursor: 'pointer'}} className={classes.star} />
  }

  return (
    <div className={classes.rating}>
      {
        [1, 2, 3, 4, 5].map(number => <Star key={number} number={number}/>)
      }
    </div>
  )
}