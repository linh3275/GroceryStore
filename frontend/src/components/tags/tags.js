import React from 'react';
import classes from './tags.module.css';
import {Link} from 'react-router-dom';

export default function Tags({ tags, productPage }) {
  return (
    <div className={classes.container} 
      style={{ flexDirection: productPage ? 'row' : 'column' }}>
        {tags.map(
            tag => (
              <Link key={tag.name} to={`/tag/${tag.name}`}>
                  {tag.name}
              </Link>
            )
          )
        }
    </div>
  )
}
