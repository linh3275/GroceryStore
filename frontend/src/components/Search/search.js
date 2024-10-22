import React, { useEffect, useState } from 'react'
import classes from './search.module.css';
import { SearchIcon } from '../icon';
import { useNavigate, useParams } from 'react-router-dom';

Search.defaultProps = {
  searchRoute: '/search',
  defaultRoute: '/',
}

export default function Search({ searchRoute, defaultRoute }) {

    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const { searchStore } = useParams();

    useEffect(() => {
      setTerm(searchStore ?? '');
    }, [searchStore]);

    const search = async () => {
      if (term.trim()) {
          navigate(searchRoute + term);
      } else {
          navigate(defaultRoute);
      }
    }

    return (
        <div className={classes.searchBox}>
          <input className={classes.searchInput} placeholder='Bình bông'
            onChange={e => setTerm(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && search()}
            value={term} />
          <div onClick={search}>
            <SearchIcon className={classes.searchIcon}/>
          </div>
        </div>
      )
}
